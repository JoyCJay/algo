/**
 *                                             中
 * 1. 二叉搜索树（BST——Binary Search Tree）:  /  \
 *                                           小  大
 * 用element表示树中节点的key，用next表示树中节点的右子节点（right），用prev表示树中节点的左子节点（left）
 */
var Node = require('../Node');

export class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        let newNode = new Node(key);
    
        if (this.root === null) this.root = newNode;
        else insertNode(this.root, newNode);
    }
    insertArray(keys){
        keys.forEach( (v)=>{
            this.insert(v);
        })
    }

    search (key) { return searchNode(this.root, key);}
    min () { return minNode(this.root);}
    max () { return maxNode(this.root);}

    preOrderTraverse (callback) {
        preOrderTraverseNode(this.root, callback);
    }
    
    inOrderTraverse (callback) {
        inOrderTraverseNode(this.root, callback);
    }
    
    postOrderTraverse (callback) {
        postOrderTraverseNode(this.root, callback);
    }

    // 从树中移除一个节点
    remove (key) {
        this.root = removeNode(this.root, key);
    }
}

let insertNode = function (node, newNode) {
    if (newNode.element < node.element) {
        if (node.prev === null) node.prev = newNode;
        else insertNode(node.prev, newNode);
    }
    else {
        if (node.next === null) node.next = newNode;
        else insertNode(node.next, newNode);
    }
};

let preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
        callback(node.element);
        preOrderTraverseNode(node.prev, callback);
        preOrderTraverseNode(node.next, callback);
    }
};

let inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
        inOrderTraverseNode(node.prev, callback);
        callback(node.element);
        inOrderTraverseNode(node.next, callback);
    }
};

let postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
        postOrderTraverseNode(node.prev, callback);
        postOrderTraverseNode(node.next, callback);
        callback(node.element);
    }
};

let minNode = function (node) {
    if (node === null) return null;

    while (node && node.prev !== null) {
        node = node.prev;
    }
    return node;
};

let maxNode = function (node) {
    if (node === null) return null;

    while (node && node.next !== null) {
        node = node.next;
    }
    return node;
};

let searchNode = function (node, key) {
    if (node === null) return null;

    if (key < node.element) return searchNode(node.prev, key);
    else if (key > node.element) return searchNode(node.next, key);
    else return node;
};

let removeNode = function (node, key) {
    if (node === null) return null;

    if (key < node.element) {
        node.prev = removeNode(node.prev, key);
        return node;
    }
    else if (key > node.element) {
        node.next = removeNode(node.next, key);
        return node;
    }
    else {
        // 第一种情况：一个叶子节点（没有子节点）
        if (node.prev === null && node.next === null) {
            node = null;
            return node;
        }
        // 第二种情况：只包含一个子节点
        if (node.prev === null) {
            node = node.next;
            return node;
        }
        else if (node.next === null) {
            node = node.prev;
            return node;
        }
        // 第三种情况：有两个子节点
        let aux = minNode(node.next);
        node.element = aux.element;
        node.next = removeNode(node.next, aux.element);
        return node;
    }
};


/**
 * 2. 自平衡二叉搜索树（AVL——Adelson-Velskii-Landi）。任意节点左右子树的高度之差最多为1.
 * 添加或移除节点时，AVL树会尝试自平衡。
 * 对于AVL树来说，每一个节点都保存一个平衡因子。节点的平衡因子 = 左子树的高度 - 右子树的高度
 */

export class AVLTree extends BinarySearchTree {
    constructor () {
        super();
    }

    // 计算节点的高度
    getNodeHeight (node) {
        if (node === null) return 0;
        return Math.max(this.getNodeHeight(node.prev), this.getNodeHeight(node.next)) + 1;
    };

    // 获取节点的平衡因子

    /**
     * LL旋转: 向右旋转
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotationLL(b) ->   c   b
     *    / \                         /   / \
     *   c   d                       f   d   e
     *  /
     * f
     *
     * @param node Node<T>
     */
    rotationLL(node) {
        let tmp = node.prev;
        node.prev = tmp.next;
        tmp.next = node;
        return tmp;
    }

    /**
     * RR旋转: 向左旋转
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotationRR(a) ->    a   e
     *      / \                        / \   \
     *     d   e                      c   d   f
     *          \
     *           f
     *
     * @param node Node<T>
     */
    rotationRR(node) {
        let tmp = node.next;
        node.next = tmp.prev;
        tmp.prev = node;
        return tmp;
    }

    /**
     * LR旋转: 先向左旋转，然后再向右旋转
     * @param node Node<T>
     */
    rotationLR(node) {
        node.prev = this.rotationRR(node.prev);
        return this.rotationLL(node);
    }

    /**
     * RL旋转: 先向右旋转，然后再向左旋转
     * @param node Node<T>
     */
    rotationRL(node) {
        node.next = this.rotationLL(node.next);
        return this.rotationRR(node);
    }

    insert (key) {
        super.insert(key);

        // 左子树高度大于右子树高度
        if (this.getNodeHeight(this.root.prev) - this.getNodeHeight(this.root.next) > 1) {
            if (key < this.root.prev.element) {
                this.root = this.rotationLL(this.root);
            }
            else {
                this.root = this.rotationLR(this.root);
            }
        }
        // 右子树高度大于左子树高度
        else if (this.getNodeHeight(this.root.next) - this.getNodeHeight(this.root.prev) > 1) {
            if (key > this.root.next.element) {
                this.root = this.rotationRR(this.root);
            }
            else {
                this.root = this.rotationRL(this.root);
            }
        }
    }

    remove (key) {
        super.remove(key);

        // 左子树高度大于右子树高度
        if (this.getNodeHeight(this.root.prev) - this.getNodeHeight(this.root.next) > 1) {
            if (key < this.root.prev.element) {
                this.root = this.rotationLL(this.root);
            }
            else {
                this.root = this.rotationLR(this.root);
            }
        }
        // 右子树高度大于左子树高度
        else if (this.getNodeHeight(this.root.next) - this.getNodeHeight(this.root.prev) > 1) {
            if (key > this.root.next.element) {
                this.root = this.rotationRR(this.root);
            }
            else {
                this.root = this.rotationRL(this.root);
            }
        }
    }
}
