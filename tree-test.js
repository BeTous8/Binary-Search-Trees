import Tree from "./tree.js";
import randomArray from "./random-array-generator.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };


// 1. Create a binary search tree
const tree = new Tree(randomArray.createUniqueRandomArray(10));

console.log("Initial tree:");
prettyPrint(tree.root);





// 2. Confirm that the tree is balanced
console.log("Before rebalance:", tree.isBalanced());

// 3. Print out all elements in level, pre, post, and in order.
console.log('level Order:')
tree.levelOrder((node) => {
    console.log(node.data)});
console.log(' ')
console.log('Pre Order:')
tree.preOrder((node) => {
    console.log(node.data)});
console.log(' ')
console.log('Post Order:')
tree.postOrder((node) => {
    console.log(node.data)});
console.log(' ')
console.log('In Order:')
tree.inOrder((node) => {
    console.log(node.data)});

// 4. Unbalance the tree by adding several numbers > 100.
tree.insert(101); tree.insert(119); tree.insert(168);  // Make it very unbalanced

// 5. Confirm that the tree is unbalanced
console.log("Is the tree balanced? ", tree.isBalanced());

console.log("After unbalancing:");
prettyPrint(tree.root);



// 6. Balance the tree
tree.rebalance();

// 7. Confirm that the tree is balanced
console.log("Is the tree balanced? ", tree.isBalanced());

console.log("After rebalancing:");
prettyPrint(tree.root);



// 8.Print out all elements in level, pre, post, and in order
console.log('level Order:')
tree.levelOrder((node) => {
    console.log(node.data)});
console.log(' ')
console.log('Pre Order:')
tree.preOrder((node) => {
    console.log(node.data)});
console.log(' ')
console.log('Post Order:')
tree.postOrder((node) => {
    console.log(node.data)});
console.log(' ')
console.log('In Order:')
tree.inOrder((node) => {
    console.log(node.data)});


