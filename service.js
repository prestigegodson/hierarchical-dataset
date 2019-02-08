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
        this.right = 2;
    }

    traverse(){

        let name = this.payload.org_name;

        let node = new Node();
        node.left = this.left;
        node.right = this.right;
        node.value = name;

        this.copy.push(node);
        this.incrementLeftAndRight();

        if(this.payload.daughters){

            for(let daughter of this.payload.daughters){

                let name = daughter.org_name;
                let node = new Node();
                node.left = this.left;
                node.right = this.right;
                node.value = name;

                this.copy.push(node);
                this.incrementLeftAndRight();

                if(daughter.daughters){
                    this.traverseDaughter(daughter.daughters);
                }
            }
        }

        return this.copy;
    }

    traverseDaughter(daughters){

        for(let daughter of daughters){
            let name = daughter.org_name;
            let node = new Node();
            node.left = this.left;
            node.right = this.right;
            node.value = name;

            this.copy.push(node);
            this.incrementLeftAndRight();

            if(daughter.daughters){
                this.traverseDaughter(daughter.daughters);
            }
        }

        
    }

    incrementLeftAndRight(){

        this.left = this.left + 2;
        this.right = this.right + 2;
    }
}

