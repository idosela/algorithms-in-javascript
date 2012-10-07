/**
 * @fileoverview Binary Search Tree implementation based on lectures from
 * coursera.org by: Robert Sedgewick, Princeton University.
 *
 * Copyright (c) 2012 Ido Sela
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/**
 * Create an empty tree, with the root set to null.
 * @constructor
 */
aij.BinarySearchTree = function() {
  this.root_ = null;
};


/**
 * Add a new node to the tree.
 * @param {*} key The key of the added node.
 * @param {*} value The value of the added node.
 */
aij.BinarySearchTree.prototype.add = function(key, value) {
  var tree = this;

  var addNode = function(current) {
    if (!current) {
      return {key: key, value: value, left: null, right: null, count: 1};
    }

    if (key < current.key) {
      current.left = addNode(current.left);
    } else if (key > current.key) {
      current.right = addNode(current.right);
    } else {
      current.value = value;
    }

    current.count = 1 + tree.size_(current.left) + tree.size_(current.right);
    return current;
  };

  this.root_ = addNode(this.root_);
};


/**
 * Get the node for a requested key.
 * @param {*} key The key of the requested node.
 * @return {*|undefined} The node with the requested key, or undefined if the
 *     key doesn't exist in the tree.
 */
aij.BinarySearchTree.prototype.get = function(key) {
  var current = this.root_;

  while (current) {
    if (key < current.key) {
      current = current.left;
    } else if (key > current.key) {
      current = current.right;
    } else {
      return current;
    }
  }

  return;
};


/**
 * Remove the node with the specified key using Hibbard deletion method.
 * @param {*} key The key of the removed node.
 */
aij.BinarySearchTree.prototype.remove = function(key) {
  var tree = this;

  // Remove the smallest node from a subtree.
  var removeMin = function(current) {
    if (!current.left) {
      return current.right;
    }

    current.left = removeMin(current.left);
    current.count = 1 + tree.size_(current.left) + tree.size_(current.right);
    return current;
  };

  // Remove the node.
  var removeNode = function(current) {
    if (!current) {
      return;
    }

    if (key < current.key) {
      current.left = removeNode(current.left);
    } else if (key > current.key) {
      current.right = removeNode(current.right);
    } else {
      // If there is no right child, return the left child.
      if (!current.right) {
        return current.left;
      }

      var removed = current;
      current = tree.min(removed.right);
      current.right = removeMin(removed.right);
      current.left = removed.left;
    }

    // Update subtree counts.
    current.count = 1 + tree.size_(current.left) + tree.size_(current.right);
    return current;
  };

  this.root_ = removeNode(this.root_);
};


/**
 * Get the node with the smallest key in the tree.
 * @param {Object} node The starting node (default to root).
 * @return {Object|undefined} The node with the smallest key, or undefined for
 *     and empty tree.
 */
aij.BinarySearchTree.prototype.min = function(node) {
  var current = node || this.root_;

  if (!current) {
    return;
  }

  while (current.left) {
    current = current.left;
  }
  return current;
};


/**
 * Get the node with the largest key in the tree.
 * @param {Object} node The starting node (default to root).
 * @return {Object|undefined} The node with the largest key, or undefined for
 *     and empty tree.
 */
aij.BinarySearchTree.prototype.max = function(node) {
  var current = node || this.root_;

  if (!current) {
    return;
  }

  while (current.right) {
    current = current.right;
  }
  return current;
};


/**
 * Returns the node with the largest key less than the requested key.
 * @param {[type]} key [description]
 * @return {[type]} [description]
 */
aij.BinarySearchTree.prototype.floor = function(key) {
  var getFloor = function(current) {
    if (!current) {
      return;
    }

    if (key === current.key) {
      return current;
    }

    if (key < current.key) {
      return getFloor(current.left);
    }

    return getFloor(current.right) || current;
  };

  return getFloor(this.root_);
};


/**
 * Returns the node with the smallest key greater than the requested key.
 * @param {[type]} key [description]
 * @return {[type]} [description]
 */
aij.BinarySearchTree.prototype.ceil = function(key) {
  var getCeil = function(current) {
    if (!current) {
      return;
    }

    if (key === current.key) {
      return current;
    }

    if (key > current.key) {
      return getCeil(current.right);
    }

    return getCeil(current.left) || current;
  };

  return getCeil(this.root_);
};


/**
 * Return the number of nodes in the tree, that have a key smaller than the
 * specified key.
 * @param {*} key The key to rank.
 * @return {number} The number of nodes with smaller key.
 */
aij.BinarySearchTree.prototype.rank = function(key) {
  var tree = this;

  var getRank = function(current) {
    if (!current) {
      return 0;
    }

    if (key < current.key) {
      return getRank(current.left);
    }

    if (key > current.key) {
      return 1 + tree.size_(current.left) + getRank(current.right);
    }

    return tree.size_(current.left);
  };

  return getRank(this.root_);
};


/**
 * Returns the number of nodes in a subtree.
 * @private
 * @param {Object} node The root node of the subtree.
 * @return {number} The number of nodes in the subtree.
 */
aij.BinarySearchTree.prototype.size_ = function(node) {
  return (node && node.count) || 0;
};

/**
 * Returns the number of nodes in the tree.
 * @return {number} The number of nodes in the tree.
 */
aij.BinarySearchTree.prototype.size = function() {
  return this.size_(this.root_);
};


/**
 * Perform in-order traversal on the tree and call a callback function
 * for each tree node.
 * @param {function(node)} callback The function to run on each tree node.
 */
aij.BinarySearchTree.prototype.traverse = function(callback) {
  var tree = this;

  function inOrder(current){
    if (!current) {
      return;
    }

    // Traverse the left subtree.
    inOrder(current.left);

    // Call the callback function.
    callback.call(tree, current);

    // Traverse the right subtree.
    inOrder(current.right);
  }

  inOrder(this.root_);
};


/**
 * Return an array with the keys of all the nodes in the array.
 * @return {Array} Array containing the keys of all the nodes in the tree.
 */
aij.BinarySearchTree.prototype.getKeys = function() {
  var result = [];

  this.traverse(function(node) {
    result.push(node.key);
  });
  return result;
};
