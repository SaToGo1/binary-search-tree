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
            let nextBiggestNode = this._NextBiggestForDelete(nodeToDelete);
            
            //child bigger than father, chils is in the right of father.
            if(nodeToDelete.data > previousNode.data){
                nextBiggestNode.left = nodeToDelete.left;
                // if to not have loop "trees"
                if(nextBiggestNode != nodeToDelete.right)
                    nextBiggestNode.right = nodeToDelete.right;
                else
                    nextBiggestNode.right = null;
                previousNode.right = nextBiggestNode;
            }else{
            //child smaller than father, child is in the left of father.
                nextBiggestNode.left = nodeToDelete.left;
                // if to not have loop "trees"
                if(nextBiggestNode != nodeToDelete.right)
                    nextBiggestNode.right = nodeToDelete.right;
                else
                    nextBiggestNode.right = null;
                previousNode.left = nextBiggestNode;
            }
        }
    }

    _NextBiggestForDelete(node){
        // from a node X the next biggest node in the tree is going 1 to the right
        // and fom there going to the smallest of that subtree.
        let subtree = node.right;
        return this._smallestNodeForDelete(subtree, node);
    }

    _smallestNodeForDelete(node, previousNode, depth=0){
        if(node.left === null){
            // if to not have loop "trees"
            if(depth > 0)
                previousNode.left = null;
            return node;
        }
        else{
            return this._smallestNodeForDelete(node.left, node, depth+1);
        }
    }

    levelOrder(cb=null, root=this.root){
        const recursive = true;
        const loop = false;

        //saves the data of the nodes in order.
        let array = [];

        //only 1 can be active at a time.
        if(recursive == true && loop ==true){
            loop = false;
        }

        if(recursive){
            // use shift and push for FIFO.
            let queue = [root];
            array = this._levelOrderRecursive(cb, queue, array);
        }

        if(loop){
            let queue = [root];
            while(queue.length > 0){
                let node = queue.shift();
                if(node.left) queue.push(node.left);
                if(node.right) queue.push(node.right);
                array.push(node.data);
                if(cb) cb(node);
            }
        }

        return array;
    }

    _levelOrderRecursive(cb, queue, array){
        let node = queue.shift();
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
        array.push(node.data);
        if(cb) cb(node);

        if(queue.length > 0) return this._levelOrderRecursive(cb, queue, array);
        return array;
    }

    depthPreOrder(cb=null, root=this.root, array=[]){
        //Base Case 
        if(root === null){
            return;
        }

        //visit order preorder = <root><left><right>
        let leftSubTree = root.left;
        let rightSubTree = root.right;

        array.push(root.data);
        if(cb) cb(root);
        this.depthPreOrder(cb, leftSubTree, array);
        this.depthPreOrder(cb, rightSubTree, array);

        return array;
    }

    depthInOrder(cb=null, root=this.root, array=[]){
        //Base Case 
        if(root === null){
            return;
        }

        //visit order inorder = <left><root><right>
        let leftSubTree = root.left;
        let rightSubTree = root.right;

        this.depthInOrder(cb, leftSubTree, array);
        array.push(root.data);
        if(cb) cb(root);
        this.depthInOrder(cb, rightSubTree, array);

        return array;
    }

    depthPostOrder(cb=null, root=this.root, array=[]){
        //Base Case 
        if(root === null){
            return;
        }

        //visit order postorder = <left><right><root>
        let leftSubTree = root.left;
        let rightSubTree = root.right;

        this.depthPostOrder(cb, leftSubTree, array);
        this.depthPostOrder(cb, rightSubTree, array);
        array.push(root.data);
        if(cb) cb(root);
        
        return array;
    }

    // Returns the number of edges in longest path from a given node to a leaf node.
    // we go to the leaf and start adding 1 to height every time
    // we increase a level.
    height(root=this.root){
        // Post Order transversal
        if(root === null){
            return 0;
        }
        if(root.left === null && root.right === null){
            return 0;
        }

        //visit order postorder = <left><right><root>
        let leftSubTree = root.left;
        let rightSubTree = root.right;

        let height = 0;
        let heightLeft = 0;
        let heightRight = 0;

        heightLeft = this.height(leftSubTree);
        heightRight = this.height(rightSubTree);

        // height is equal to height of bigger subtree + 1.
        height = heightLeft > heightRight? heightLeft : heightRight;
        height++;
        
        return height; 
    }

    // Returns the number of edges in path from a given node to the tree’s root node.
    //
    // From root we traverse in breadth-first order the tree and every time we go down 
    // 1 level we augment 1 the depth until we find the target node and return the depth
    // of the target node.
    depth(targetNode, node=this.root){
        // Level-Order Transversal.
        let depth = 0;
        let nodeAndDepth = [node, depth];
        let queue = [nodeAndDepth];
        depth = this._depth(targetNode, queue);

        return depth;
    }

    _depth(targetNode, queue){
        let targetReached = false;
        let [node, depth] = queue.shift();

        if(targetNode === node){
            targetReached = true;
        }

        if(node.left){
            let nodeAndDepth = [node.left, depth + 1];
            queue.push(nodeAndDepth);
        } 
        
        if(node.right){
            let nodeAndDepth = [node.right, depth + 1];
            queue.push(nodeAndDepth);
        } 

        if( queue.length > 0 && !(targetReached) ) return this._depth(targetNode, queue);
        return depth;
    }
}

module.exports = BalancedBinaryTree