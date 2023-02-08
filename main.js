const Tree = require('./balanced-binary-search-tree');


let array1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let array2 = [0, 1, 2, 3];
let array3 = [0, 1, 2];

let tree = new Tree(array1);
console.log(`From array1: ${array1} make: `)
tree.prettyPrint();

let tree2 = new Tree(array2);
console.log(`From array2: ${array2} make: `)
tree2.prettyPrint();

let tree3 = new Tree(array3);
console.log(`From array3: ${array3} make: `)
tree3.prettyPrint();