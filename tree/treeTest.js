import { BinarySearchTree, AVLTree } from "./tree";
 
/**
 * BSTree test
 */
let tree = new BinarySearchTree();
tree.insertArray([11,7,15,5,9,13,20,3,6,8,10,12,14,18,25]);
tree.insert(11);
tree.preOrderTraverse((value) => {
        console.log(value)
    }
);

console.log(tree.min()); // Node { element: 3, next: null, prev: null }
console.log(tree.max()); // Node { element: 25, next: null, prev: null }
console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.'); // Key 1 not found.
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.'); // Key 8 found.

/**
 * BSTree test
 */

let tree2 = new AVLTree();
tree2.insert(11);
tree2.insert(7);
tree2.insert(15);
tree2.insert(13);
tree2.insert(20);

tree2.remove(7);
tree2.preOrderTraverse((value) => console.log(value));