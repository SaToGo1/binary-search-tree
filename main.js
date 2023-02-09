const Tree = require('./balanced-binary-search-tree');


let array1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let array2 = [0, 1, 2, 3];
let array3 = [0, 1, 2];
let array4 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree = new Tree(array1);
console.log(`From array1: ${array1} make: `)
tree.prettyPrint();

let tree2 = new Tree(array2);
console.log(`From array2: ${array2} make: `)
tree2.prettyPrint();

let tree3 = new Tree(array3);
console.log(`From array3: ${array3} make: `)
tree3.prettyPrint();

let tree4 = new Tree(array4);
console.log(`From array4: ${array4} make: `)
tree4.prettyPrint();

let node = tree4.search(6345);
console.log(node);