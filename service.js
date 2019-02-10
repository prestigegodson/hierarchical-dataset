const db = require('./db');

async function insert(records){

    try{

        let deleteQuery = 'delete from organization';
        let deleteValue = [];
        await db.query(deleteQuery, deleteValue);

        await db.transactionStart();
        for(let record of records){
            let query = 'insert into organization (lft, rght, name) values($1, $2, $3)';
            let values = [record.left, record.right, record.value];
            await db.query(query, values);
        }
        await db.transactionCommit();
    }catch(err){
        db.transactionRollBack();
        console.error(`Transaction Rolled Backed : ${err}`);
        throw new Error(`Transaction Rolled Backed : ${err.detail}`);
    }
}

async function getAll(){

    try{
        let query = 'select * from organization';
        let values = [];
        let result = await db.query(query, values);

        return result;
    }catch(err){
        console.error(err);
    }
}

class Node { 

    constructor(){
        this.left = 0;
        this.right = 0;
        this.value = "";  
    }
}

class NodeSet {

    constructor(){
        this.copy = [];
        this.left = 0;
        this.right = 0;
    }

    tranverse(payload){

        this.left++;
        
        let node = new Node();
        node.left = this.left;
        node.value = payload.org_name;
        
        if(payload.daughters){

            let daughters = payload.daughters;
            for(let daughter of daughters){
                this.tranverse(daughter);
            }

            //finished traversing the childdren of this node, so set the (right) value
            this.right = this.left + 1;
            this.left++;
        }else{
            //This is the leaf node, so the (right) should be (left + 1)
            this.left++;
            this.right = node.left + 1
        }

        node.right = this.right;
        this.copy.push(node);
    }

}

async function findParent(organization){

    const query = 'select * from organization where $1 > lft and $2 < rght order by lft desc limit 1';
    const values = [organization.lft, organization.rght];

    const result = await db.query(query, values);
    return result.rows.length == 1 ? result.rows[0] : null;
}

module.exports.insert = async function(payload){

    let nodeSet = new NodeSet();
    nodeSet.tranverse(payload);

    let records =  nodeSet.copy.reverse();

    await insert(records);
    const result = await getAll();
    return result.rows;
    
}

module.exports.findByName = async (name) => {

    let findByNameQuery = 'select * from organization where lower(name) = lower($1) limit 1';
    let findByNameQueryValues = [name];

    let organization = await db.query(findByNameQuery, findByNameQueryValues);
    return organization.rows;
}

module.exports.findRelations = async (organization, page, pageSize) => {

    const parent = await findParent(organization);
    const parentLeft = parent ? parent.lft : 0;
    const parentRight = parent ? parent.rght : 0;

    const findByParent= `select current_org.name, 
    (
    CASE 
    WHEN (current_org.lft > $1 and current_org.rght < $2) THEN 'children' 
    WHEN ($1 > current_org.lft and $2 < current_org.rght) THEN 'parent' 
    ELSE 'sisters' END
    ) as relationship,
    (select count(*) from organization where $1 > lft and $2 < rght) as org_depth,
    (select count(*) from organization where current_org.lft > lft and current_org.rght < rght) as depth 
    from organization current_org inner join organization parent_org on current_org.id = parent_org.id 
    where (current_org.lft > $1 and current_org.rght < $2) or ($1 > current_org.lft and $2 < current_org.rght) 
    or ((current_org.lft > $3 and current_org.rght < $4) and (current_org.id != $5) and 
    (select count(*) from organization where $1 > lft and $2 < rght) = (select count(*) from organization where current_org.lft > lft and current_org.rght < rght) )
    order by current_org.name asc limit $6 offset $7`;
    const findByParentValues = [organization.lft, organization.rght, parentLeft, parentRight, organization.id, pageSize, (page-1) * pageSize];

    const result = await db.query(findByParent, findByParentValues);

    return result.rows;
}

