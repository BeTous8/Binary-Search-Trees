import Tree from "./tree.js";


const tree = new Tree([50, 30, 70, 20, 40, 60, 80]);
// tree.insert(4);
// tree.deleteItem(30);


const node = tree.root;

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


prettyPrint(node);
console.log(tree.find(50))
