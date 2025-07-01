import Tree from "./tree.js";


const tree = new Tree([8, 3, 10, 1, 6, 14, 4, 7, 13]);
// tree.insert(4);
// tree.deleteItem(30);


const node = tree.root;

// const prettyPrint = (node, prefix = '', isLeft = true) => {
//     if (node === null) {
//       return;
//     }
//     if (node.right !== null) {
//       prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//     }
//     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
//     if (node.left !== null) {
//       prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//     }
//   };


// prettyPrint(node);
// console.log(tree.find(50))


// Test 1: Print each node's data
// tree.preOrder((node) => {
//     console.log(node.data);
// });

console.log(tree.height(4));
