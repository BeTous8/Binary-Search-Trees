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