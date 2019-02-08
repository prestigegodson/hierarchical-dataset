module.exports = function(payload){

    let nodeSet = new NodeSet(payload);
    return nodeSet.traverse();

}

class Node { 

    constructor(){
        this.left = 0;
        this.right = 0;
        this.value = "";  
    }
}

class NodeSet {

    constructor(payload){

        this.payload = payload;
        this.copy = [];
        this.left = 1;
        this.right = 0;
    }

    traverse(){

        let name = this.payload.org_name;

        let node = new Node();
        node.left = this.left;
        node.value = name;
        this.incrementLeft();

        if(this.payload.daughters){

            for(let daughter of this.payload.daughters){

                let name = daughter.org_name;
                let node = new Node();
                node.left = this.left;
                node.value = name;
                this.incrementLeft();

                if(daughter.daughters){
                    this.traverseDaughter(daughter.daughters);
                }else{
                    this.right = node.left + 1;
                    this.left = this.right + 1;
                }

                node.right = this.right;
                this.copy.push(node);
                this.incrementLeft();
            }

            this.right++;

        }else{

            this.right = this.left + 1;
        }

        node.right = this.right;
        this.copy.push(node);

        
        

        return this.copy.reverse();
    }

    traverseDaughter(daughters){

        for(let daughter of daughters){
            let name = daughter.org_name;
            let node = new Node();
            node.left = this.left;
            node.value = name;

            this.incrementLeft();

            if(daughter.daughters){
                this.traverseDaughter(daughter.daughters);
            }else{
                //if leaf node, increment right and next left must be greater than current right
                this.right = node.left + 1;
                this.left = this.right + 1;
            }

            node.right = this.right ;
            this.copy.push(node);
        }

        this.right++;
    }

    incrementLeft(){

        this.left = this.left + 1;
    }
}

