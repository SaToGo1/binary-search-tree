const Node = require('./Node');
const Sort = require('./sort');


class BalancedBinaryTree{

    constructor(array){
        // array sort.
        // array delete duplicates.
        this._array2 = array;
        this._array2 = Sort(this._array2);
        this.root = this.buildTree(this._array2);
    }

    buildTree(array){
        if(array.length == 0) return null;

        let mid = Math.floor(array.length / 2);
        let newNode = new Node(array[mid]);

        newNode.left = this.buildTree(array.slice(0, mid));
        newNode.right = this.buildTree(array.slice(mid + 1));

        return newNode;
    }

    prettyPrint = (node=this.root, prefix = '', isLeft = true) => {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    search(data, node=this.root){
        
        if(node === null){
          return node;
        }

        if(data === node.data){
            return node;
        }

        if(data < node.data){            
            return this.search(data, node.left);
        }

        return this.search(data, node.right);
    }

    insert(data, node=this.root){
        
        if(data === node.data){
            return 'repeated';
        }

        if(data < node.data){
            if(node.left === null){
                let newNode = new Node(data);
                node.left = newNode;
                return 'inserted';
            }
            return this.insert(data, node.left);
        }

        if(data > node.data){
            if(node.right === null){
                let newNode = new Node(data);
                node.right = newNode;
                return 'inserted';
            }
            return this.insert(data, node.right);
        }
    }

    delete(data, node=this.root, previousNode=null){

        if(node === null){
            return 'Not in Tree';
        }

        if(data === node.data){
            //delete
            this._deleteCases(node, previousNode);
            return 'deleted';
        }

        if(data < node.data){
            return this.delete(data, node.left, node);
        }

        if(data > node.data){
            return this.delete(data, node.right, node);
        }
    }

    _deleteCases(nodeToDelete, previousNode){

        //CASE 1. node to delete is a leaf, just delete the node.
        if( ( nodeToDelete.right === null ) && ( nodeToDelete.left === null )){
            //child bigger than father, chils is in the right of father.
            if(nodeToDelete.data > previousNode.data){
                previousNode.right = null;
            }else{
            //child smaller than father, child is in the left of father.
                previousNode.left = null;
            }
        }

        //CASE 2. node to delete has only 1 child
        if( ( ( nodeToDelete.right === null ) && ( nodeToDelete.left != null ) ) ||  ( ( nodeToDelete.right != null ) && ( nodeToDelete.left === null ) ) ){
            //child bigger than father, child is in the right of father.
            //
            if(nodeToDelete.data > previousNode.data ){
                //node to delete has its child in right
                if(nodeToDelete.left === null){
                    previousNode.right = nodeToDelete.right;
                }else{
                //node to delete has its child in left
                    previousNode.right = nodeToDelete.left;
                }
            }else{
            //child smaller than father, child is in the left of father.
                //node to delete has its child in right
                if(nodeToDelete.left === null){
                    previousNode.left = nodeToDelete.right;
                }else{
                //node to delete has its child in left
                    previousNode.left = nodeToDelete.left;
                }
            }
        }

        //CASE 3. node to delete has right and left childs.
        // We search for the node more to the left(smallest) and replace node to delete with
        // the smallest node
        if( ( nodeToDelete.right != null ) && ( nodeToDelete.left != null )){
            let nextBiggestNode = this._NextBiggest(nodeToDelete);
            console.log(`next biggest: ${nextBiggestNode.data}`);
            console.log(`previous node data: ${previousNode.data}`);
            
            //child bigger than father, chils is in the right of father.
            if(nodeToDelete.data > previousNode.data){
                nextBiggestNode.left = nodeToDelete.left;
                nextBiggestNode.right = nodeToDelete.right;
                previousNode.right = nextBiggestNode;
            }else{
            //child smaller than father, child is in the left of father.
                nextBiggestNode.left = nodeToDelete.left;
                // if() // INFINITE LOOP ON TREE :(
                nextBiggestNode.right = nodeToDelete.right;
                previousNode.left = nextBiggestNode;
            }
        }
    }

    _NextBiggest(node){
        // from a node X the next biggest node in the tree is going 1 to the right
        // and fom there going to the smallest of that subtree.
        let subtree = node.right;
        return this._smallestNode(subtree);
    }

    _smallestNode(node){
        if(node.left === null){
            return node;
        }
        else{
            return this._smallestNode(node.left);
        }
    }
}

module.exports = BalancedBinaryTree