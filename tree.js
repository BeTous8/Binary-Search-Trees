import Node from "./node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const sortedArr = Array.from(new Set(array)).sort((a,b) => a-b);
        return this.buildTreeRecursion(sortedArr);
    }

    buildTreeRecursion(array) {
        // base case 1
        if (array.length === 0) return null;

        // base case 2
        if (array.length === 1) {
            return new Node(array[0]);
        }

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        const leftHalf =  array.slice(0, mid);
        const rightHalf = array.slice(mid +1);

        root.left = this.buildTreeRecursion(leftHalf);
        root.right = this.buildTreeRecursion(rightHalf);

        return root;

    }

    insert(value) {

        // if tree is empty
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        let currentNode = this.root;

        while(true) {
            if (value === currentNode.data) {
                return;
            }

            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    currentNode.left = new Node(value);
                    return;
                }
                currentNode = currentNode.left
            } else {
                if (currentNode.right === null) {
                    currentNode.right = new Node(value);
                    return;
                }
                currentNode = currentNode.right
            }
        }
    }
    //     let currentNode = this.root;

    //     const compare = (value, node) => {
    //         if (node.left === null && node.right === null) {
    //             value > node.data ? node.right = new Node(value) : node.left = new Node(value);
    //             return node;
    //         }
    //     }


    //     while (currentNode.left !== null || currentNode.right !== null) {
    //         if (value > currentNode.data) {
    //             currentNode = compare(value, currentNode.right);
    //         } else {
    //             currentNode = compare(value, currentNode.left)
    //         }

    //     }
       
            
    // }

    deleteItem(value) {
        // if tree is empty
        if (this.root === null) return null;

        let currentNode = this.root;
        let previousNode = null;

        // move through the tree to find the targeted node
        while (currentNode !== null && currentNode.data !== value) {
            previousNode = currentNode;

            if (currentNode.data === value) {
                return;
            }

            if (value < currentNode.data) {
                currentNode = currentNode.left;
            }
            
            if (value > currentNode.data) {
                currentNode = currentNode.right;
            }

            
        }

        if (currentNode.data === value) {
            // case one: no subtree
            if (currentNode.left === null && currentNode.right === null) {
                if (previousNode === null) {
                    this.root = null;
                } else if (value < previousNode.data) {
                    previousNode.left = null;
                } else {
                    previousNode.right = null;
                }
            }

            // case two: one subtree
            else if (currentNode.left === null || currentNode.right === null) {
                // find which child exist
                const child = currentNode.left !== null ? currentNode.left : currentNode.right;

                if (previousNode === null) {
                    this.root = child;
                }
                else if (value < previousNode.data) {
                    previousNode.left = child;
                } else {
                    previousNode.right = child;
                }
            }

            // case three: two subtree
            else {
                // successor method:
                let successorParent = currentNode;
                let successor = currentNode.right;

                // find smallest value of right subtree
                while (successor.left !== null) {
                    successorParent = successor;
                    successor = successor.left;
                }

                // copy the last or smallest node to the current node (the one we want to delete)
                currentNode.data = successor.data;

                // delete the successor
                //case one: if currentNode has no left subtree
                if (successorParent === currentNode) {
                    successorParent.right = successor.right;
                } else {
                    successorParent.left = successor.right
                }
            }
        }

    }

    find(value) {

        let currentNode = this.root;
        // if value < currentNode go to left branch else go to opposite side currentNode = currentNode left/right
        while(currentNode !== null) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }

        return null;
    }

    levelOrder(callback) {
        // validate callback
        if(!callback) {
            throw new Error("callback function is required");
        }

        // handle empty tree
        if (this.root === null) return;

        // use array as queue by using shift and push
        const queue = [this.root];
        // let currentNode = this.root;

        while (queue.length > 0) {
            const currentNode = queue.shift();
            //call the callback function
            callback(currentNode);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right)
            }
            
        }

    }

    inOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }
        

        function inOrderRecursive(currentNode, callback) {
            if (currentNode === null) return;

            inOrderRecursive(currentNode.left, callback);
            callback(currentNode);
            inOrderRecursive(currentNode.right, callback)
        }

        inOrderRecursive(this.root, callback);
        
    }


    preOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }
        

        function preOrderRecursive(currentNode, callback) {
            if (currentNode === null) return;

            callback(currentNode);
            preOrderRecursive(currentNode.left, callback);
            preOrderRecursive(currentNode.right, callback)
        }

        preOrderRecursive(this.root, callback);
        
    }

    postOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }
        

        function postOrderRecursive(currentNode, callback) {
            if (currentNode === null) return;

            postOrderRecursive(currentNode.left, callback);
            postOrderRecursive(currentNode.right, callback);
            callback(currentNode);
        }

        postOrderRecursive(this.root, callback);
        
    }

    height(value) {

        const targetNode = this.find(value);  // ✅ Reuse existing search logic
    
        if (targetNode === null) {
            return null;  // Value not found
        }
        

        return this.calculateHeight(targetNode);

        
    }

    depth(value) {
        let depthValue = 0;
        if (this.root === null) return null;

        let currentNode = this.root;
        while(currentNode !== null) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
                depthValue += 1;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
                depthValue += 1;
            } else {
                return depthValue;
            }
        }
        return null;
    }

    isBalanced() {
        const self = this;
        
        const checkBalance = (node) => {
            if (node === null) return true;

            const leftHeight = this.calculateHeight(node.left);
            const rightHeight = this.calculateHeight(node.right);

            if (Math.abs(leftHeight - rightHeight) > 1) return false;

            return checkBalance(node.left) && checkBalance(node.right)

        }

        return checkBalance(this.root);
        
    }

    calculateHeight(node) {
        if (node === null) return -1;

        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    rebalance() {
        // create new empty array
        const newArr = [];

        const inOrderRebuiltRecursive = (node) => {
            if (node === null) return;

            inOrderRebuiltRecursive(node.left);
            newArr.push(node.data);
            inOrderRebuiltRecursive(node.right);
        }
        if (!this.isBalanced()) {
            // inOrder traversal
            inOrderRebuiltRecursive(this.root);
            // call buildtree to rebuild the tree
            this.root = this.buildTreeRecursion(newArr)
        }

        return newArr;
    }

    createRandomArray(length) {
        const randomArray = [];
        for (let i=0; i < length; i++) {
            const randomNumber = Math.floor(Math.random() * 100);
            randomArray.push(randomNumber);
        }

        return randomArray;
    }
}




    // buildTree(array) {
        

    //     const sortedArr = Array.from(new Set(array)).sort((a,b) => a-b);
        
    //     //transfer all the element to nodes
    //     const arrayNode = sortedArr.map(element => new Node(element));
        
    //     if (arrayNode.length === 1) return;

    //     const leftSide = this.buildTree(0, arrayNode.slice(arrayNode.length/2));
    //     const rightSide = this.buildTree(arrayNode.slice(arrayNode.length/2 +1));
    //     const middleNode = arrayNode[Math.floor(arrayNode.length / 2)];

    //     // return arrayNode[Math.floor(arrayNode.length / 2)];