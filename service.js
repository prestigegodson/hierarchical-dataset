module.exports = function(payload){

    let nodeSet = new NodeSet();
    nodeSet.tranverse(payload);

    return nodeSet.copy.reverse();

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

            //finished traversing the childdren of this node, so set the right value
            this.right = this.left + 1;
            this.left++;
        }else{
            //This is the leaf node, so the right should be left + 1
            this.left++;
            this.right = node.left + 1
        }

        node.right = this.right;
        this.copy.push(node);
    }

}

