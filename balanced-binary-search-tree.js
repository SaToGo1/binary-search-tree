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
}

module.exports = BalancedBinaryTree