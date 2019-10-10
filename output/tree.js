'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *                                             中
 * 1. 二叉搜索树（BST——Binary Search Tree）:  /  \
 *                                           小  大
 * 用element表示树中节点的key，用next表示树中节点的右子节点（right），用prev表示树中节点的左子节点（left）
 */
var Node = require('../Node');

var BinarySearchTree = exports.BinarySearchTree = function () {
    function BinarySearchTree() {
        _classCallCheck(this, BinarySearchTree);

        this.root = null;
    }

    _createClass(BinarySearchTree, [{
        key: 'insert',
        value: function insert(key) {
            var newNode = new Node(key);

            if (this.root === null) this.root = newNode;else insertNode(this.root, newNode);
        }
    }, {
        key: 'insertArray',
        value: function insertArray(keys) {
            var _this = this;

            keys.forEach(function (v) {
                _this.insert(v);
            });
        }
    }, {
        key: 'search',
        value: function search(key) {
            return searchNode(this.root, key);
        }
    }, {
        key: 'min',
        value: function min() {
            return minNode(this.root);
        }
    }, {
        key: 'max',
        value: function max() {
            return maxNode(this.root);
        }
    }, {
        key: 'preOrderTraverse',
        value: function preOrderTraverse(callback) {
            preOrderTraverseNode(this.root, callback);
        }
    }, {
        key: 'inOrderTraverse',
        value: function inOrderTraverse(callback) {
            inOrderTraverseNode(this.root, callback);
        }
    }, {
        key: 'postOrderTraverse',
        value: function postOrderTraverse(callback) {
            postOrderTraverseNode(this.root, callback);
        }

        // 从树中移除一个节点

    }, {
        key: 'remove',
        value: function remove(key) {
            this.root = removeNode(this.root, key);
        }
    }]);

    return BinarySearchTree;
}();

var insertNode = function insertNode(node, newNode) {
    if (newNode.element < node.element) {
        if (node.prev === null) node.prev = newNode;else insertNode(node.prev, newNode);
    } else {
        if (node.next === null) node.next = newNode;else insertNode(node.next, newNode);
    }
};

var preOrderTraverseNode = function preOrderTraverseNode(node, callback) {
    if (node !== null) {
        callback(node.element);
        preOrderTraverseNode(node.prev, callback);
        preOrderTraverseNode(node.next, callback);
    }
};

var inOrderTraverseNode = function inOrderTraverseNode(node, callback) {
    if (node !== null) {
        inOrderTraverseNode(node.prev, callback);
        callback(node.element);
        inOrderTraverseNode(node.next, callback);
    }
};

var postOrderTraverseNode = function postOrderTraverseNode(node, callback) {
    if (node !== null) {
        postOrderTraverseNode(node.prev, callback);
        postOrderTraverseNode(node.next, callback);
        callback(node.element);
    }
};

var minNode = function minNode(node) {
    if (node === null) return null;

    while (node && node.prev !== null) {
        node = node.prev;
    }
    return node;
};

var maxNode = function maxNode(node) {
    if (node === null) return null;

    while (node && node.next !== null) {
        node = node.next;
    }
    return node;
};

var searchNode = function searchNode(node, key) {
    if (node === null) return null;

    if (key < node.element) return searchNode(node.prev, key);else if (key > node.element) return searchNode(node.next, key);else return node;
};

var removeNode = function removeNode(node, key) {
    if (node === null) return null;

    if (key < node.element) {
        node.prev = removeNode(node.prev, key);
        return node;
    } else if (key > node.element) {
        node.next = removeNode(node.next, key);
        return node;
    } else {
        // 第一种情况：一个叶子节点（没有子节点）
        if (node.prev === null && node.next === null) {
            node = null;
            return node;
        }
        // 第二种情况：只包含一个子节点
        if (node.prev === null) {
            node = node.next;
            return node;
        } else if (node.next === null) {
            node = node.prev;
            return node;
        }
        // 第三种情况：有两个子节点
        var aux = minNode(node.next);
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

var AVLTree = exports.AVLTree = function (_BinarySearchTree) {
    _inherits(AVLTree, _BinarySearchTree);

    function AVLTree() {
        _classCallCheck(this, AVLTree);

        return _possibleConstructorReturn(this, (AVLTree.__proto__ || Object.getPrototypeOf(AVLTree)).call(this));
    }

    // 计算节点的高度


    _createClass(AVLTree, [{
        key: 'getNodeHeight',
        value: function getNodeHeight(node) {
            if (node === null) return 0;
            return Math.max(this.getNodeHeight(node.prev), this.getNodeHeight(node.next)) + 1;
        }
    }, {
        key: 'rotationLL',


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
        value: function rotationLL(node) {
            var tmp = node.prev;
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

    }, {
        key: 'rotationRR',
        value: function rotationRR(node) {
            var tmp = node.next;
            node.next = tmp.prev;
            tmp.prev = node;
            return tmp;
        }

        /**
         * LR旋转: 先向左旋转，然后再向右旋转
         * @param node Node<T>
         */

    }, {
        key: 'rotationLR',
        value: function rotationLR(node) {
            node.prev = this.rotationRR(node.prev);
            return this.rotationLL(node);
        }

        /**
         * RL旋转: 先向右旋转，然后再向左旋转
         * @param node Node<T>
         */

    }, {
        key: 'rotationRL',
        value: function rotationRL(node) {
            node.next = this.rotationLL(node.next);
            return this.rotationRR(node);
        }
    }, {
        key: 'insert',
        value: function insert(key) {
            _get(AVLTree.prototype.__proto__ || Object.getPrototypeOf(AVLTree.prototype), 'insert', this).call(this, key);

            // 左子树高度大于右子树高度
            if (this.getNodeHeight(this.root.prev) - this.getNodeHeight(this.root.next) > 1) {
                if (key < this.root.prev.element) {
                    this.root = this.rotationLL(this.root);
                } else {
                    this.root = this.rotationLR(this.root);
                }
            }
            // 右子树高度大于左子树高度
            else if (this.getNodeHeight(this.root.next) - this.getNodeHeight(this.root.prev) > 1) {
                    if (key > this.root.next.element) {
                        this.root = this.rotationRR(this.root);
                    } else {
                        this.root = this.rotationRL(this.root);
                    }
                }
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            _get(AVLTree.prototype.__proto__ || Object.getPrototypeOf(AVLTree.prototype), 'remove', this).call(this, key);

            // 左子树高度大于右子树高度
            if (this.getNodeHeight(this.root.prev) - this.getNodeHeight(this.root.next) > 1) {
                if (key < this.root.prev.element) {
                    this.root = this.rotationLL(this.root);
                } else {
                    this.root = this.rotationLR(this.root);
                }
            }
            // 右子树高度大于左子树高度
            else if (this.getNodeHeight(this.root.next) - this.getNodeHeight(this.root.prev) > 1) {
                    if (key > this.root.next.element) {
                        this.root = this.rotationRR(this.root);
                    } else {
                        this.root = this.rotationRL(this.root);
                    }
                }
        }
    }]);

    return AVLTree;
}(BinarySearchTree);