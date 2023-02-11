const Tree = require('./balanced-binary-search-tree');


//Differents TESTS
const BASE = false;
const SEARCH = false;
const INSERT = false;
const DELETE = false;
const LEVEL_ORDER = false;
const DEPTH_ORDER = false;
const HEIGHT = false;
const DEPTH = false;
const IS_BALANCED = true;

let array1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let array2 = [0, 1, 2, 3];
let array3 = [0, 1, 2];
let array4 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

if(BASE){
    let tree = new Tree(array1);
    console.log(`From array1: ${array1} make: `)
    tree.prettyPrint();

    let tree2 = new Tree(array2);
    console.log(`From array2: ${array2} make: `)
    tree2.prettyPrint();

    let tree3 = new Tree(array3);
    console.log(`From array3: ${array3} make: `)
    tree3.prettyPrint();
}

//Default
let tree4 = new Tree(array4);
console.log(`From array4: ${array4} make: `)
tree4.prettyPrint();

// SEARCH
if(SEARCH){
    let node = tree4.search(6345);
    console.log(node);
}

// INSERT
if(INSERT){
    console.log(tree4.insert(324));
    console.log(tree4.insert(323));
    tree4.prettyPrint();

    console.log(tree4.insert(322));
    console.log(tree4.insert(321));
    tree4.prettyPrint();

    let tree5 = new Tree([50]);
    tree5.insert(30);
    tree5.insert(20);
    tree5.insert(40);
    tree5.insert(70);
    tree5.insert(60);
    tree5.insert(80);
    tree5.prettyPrint();
}


// DELETE
if(DELETE){
    console.log(' ');
    console.log('DELETE');
    console.log(' ');

    let tree6 = new Tree([50, 30, 20, 40, 70, 60, 80]);
    console.log('EXAMPLE 1')
    tree6.prettyPrint();
    console.log('delete 20');
    tree6.delete(20);
    tree6.prettyPrint();

    let tree7 = new Tree([50, 30, 20, 40, 70, 60, 80]);
    tree7.insert(49);
    tree7.insert(48);
    tree7.insert(47);
    console.log('EXAMPLE 2')
    tree7.prettyPrint();
    console.log('delete 49');
    tree7.delete(49);
    tree7.prettyPrint();

    console.log('EXAMPLE 3')
    let tree8 = new Tree([50, 30, 20, 40, 70, 60, 80]);
    tree8.insert(15);
    tree8.insert(25);
    tree8.insert(35);
    tree8.insert(45);
    tree8.prettyPrint();
    console.log('delete 30');
    tree8.delete(30);
    tree8.prettyPrint();
    console.log('delete 70');
    tree8.delete(70);
    tree8.prettyPrint();
}



let tree9 = new Tree([50, 30, 20, 40, 70, 60, 80]);
let tree10 = new Tree([50, 30, 20, 40, 70, 60, 80]);
tree10.insert(15);
tree10.insert(25);
tree10.insert(35);
tree10.insert(45);

let ar1 = [];
let ar2 = [];
let ar3 = [];
if(LEVEL_ORDER){
    console.log();
    console.log('EXAMPLE LEVEL ORDER TRANSVERSAL');
    tree9.prettyPrint();
    tree9.levelOrder(callData);

    tree10.prettyPrint();
    tree10.levelOrder(callData);

    tree10.delete(30);
    tree10.delete(70);
    tree10.prettyPrint();
    ar1 = tree10.levelOrder(callData);
    console.log(`ar = ${ar1}`);
}

if(DEPTH_ORDER){
    console.log();
    console.log('EXAMPLE Depth Pre Order TRANSVERSAL');
    console.log('PREORDER');
    tree10.prettyPrint();
    ar1 = tree10.depthPreOrder();
    console.log(`${ar1}`);

    console.log('INORDER');
    ar2 = tree10.depthInOrder();
    console.log(`${ar2}`);

    console.log('POSTORDER');
    ar3 = tree10.depthPostOrder();
    console.log(`${ar3}`);
}

let tree11 = new Tree([50, 30, 20, 40, 70, 60, 80]);
tree11.insert(5);
tree11.insert(4);
tree11.insert(3);
tree11.insert(2);
tree11.insert(1);
if(HEIGHT){
    console.log('EXAMPLE HEIGHT');
    tree10.prettyPrint()
    console.log(`tree height: ${tree10.height()}`);

    tree11.prettyPrint()
    console.log(`tree height: ${tree11.height()}`);

    let node1 = tree11.search(3);
    console.log(`height for node 3: ${tree11.height(node1)}`)
}

if(DEPTH){
    console.log('EXAMPLE DEPTH');

    tree11.prettyPrint()

    let node1 = tree11.search(3);
    let node2 = tree11.search(60);
    console.log(`Depth for node 3: ${tree11.depth(node1)}`);
    console.log(`Depth for node 60: ${tree11.depth(node2)}`);
}

if(IS_BALANCED){
    console.log('IsBalanced Example');
    tree9.prettyPrint();
    console.log(`isBalanced? ${tree9.isBalanced()}`)

    tree10.prettyPrint();
    console.log(`isBalanced? ${tree10.isBalanced()}`)

    tree11.prettyPrint();
    console.log(`isBalanced? ${tree11.isBalanced()}`)
}



function callData(node){
    console.log(node.data);
}