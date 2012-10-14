/**
 * @fileoverview Tests for the binary search tree.
 */

describe('Binary Search Tree', function() {
  var tree;

  // The following tree is used for most of the tests below.
  //   10
  //  /  \
  // 5   55
  //     /
  //    29
  //   /  \
  //  16  40
  //   \
  //   25

  beforeEach(function() {
    tree = new aij.BinarySearchTree();
  });

  describe('Empty Tree', function() {

    it('should have zero size and null root', function() {
      expect(tree.size()).toBe(0);
      expect(tree.root_).toBeNull();
    });

    it('should return undefined when getting a node', function() {
      expect(tree.get(5)).toBeUndefined();
    });

    it('should return undefined when getting the minimum node', function() {
      expect(tree.min()).toBeUndefined();
    });

    it('should return undefined when getting the maximum node', function() {
      expect(tree.min()).toBeUndefined();
    });

    it('should return undefined when getting the floor of a node', function() {
      expect(tree.floor(5)).toBeUndefined();
    });

  });


  describe('Adding Nodes', function() {

    it('should add a single node', function() {
      tree.add(5, 'a');

      expect(tree.size()).toBe(1);
      expect(tree.root_.key).toBe(5);
      expect(tree.root_.value).toBe('a');
    });

    it('should update the value when the added node exists.', function() {
      tree.add(5, 'a');
      tree.add(5, 'b');

      expect(tree.size()).toBe(1);
      expect(tree.root_.key).toBe(5);
      expect(tree.root_.value).toBe('b');
    });

    it('should add multiple nodes', function() {
      tree.add(5);
      tree.add(10);
      tree.add(1);

      expect(tree.size()).toBe(3);
      expect(tree.root_.key).toBe(5);
      expect(tree.root_.left.key).toBe(1);
      expect(tree.root_.right.key).toBe(10);
    });

  });


  describe('Getting Nodes', function() {

    it('should get an existing node', function() {
      tree.add(5);
      tree.add(10);

      expect(tree.get(5).key).toBe(5);
      expect(tree.get(10).key).toBe(10);
      expect(tree.get(15)).toBeUndefined();
    });

  });


  describe('Removing Nodes', function() {

    beforeEach(function() {
      tree.add(10);
      tree.add(55);
      tree.add(29);
      tree.add(40);
      tree.add(10);
      tree.add(5);
      tree.add(16);
      tree.add(25);
    });

    it('should remove a min node with no child nodes', function() {
      tree.remove(5);
      expect(tree.root_.left).toBeNull();
      expect(tree.size()).toBe(6);
    });

    it('should remove a node with one child node', function() {
      tree.remove(16);
      expect(tree.get(29).left.key).toBe(25);
      expect(tree.size()).toBe(6);
    });

    it('should remove the root node using Hibbard deletion', function() {
      // Delete the key at the root.
      tree.remove(10);
      expect(tree.root_.key).toBe(16);
      expect(tree.size()).toBe(6);

      // Delete the key at the new root.
      tree.remove(16);
      expect(tree.root_.key).toBe(25);
      expect(tree.size()).toBe(5);
    });

  });


  describe('Ordered Operations', function() {

    beforeEach(function() {
      tree.add(10);
      tree.add(55);
      tree.add(29);
      tree.add(40);
      tree.add(10);
      tree.add(5);
      tree.add(16);
      tree.add(25);
    });

    it('should get node with the minimum key', function() {
      expect(tree.min().key).toBe(5);
    });

    it('should get node with the maximum key', function() {
      expect(tree.max().key).toBe(55);
    });

    it('should get the floor node (the node with the largest key less ' +
        'than the requested key', function() {
      expect(tree.floor(57).key).toBe(55);
      expect(tree.floor(42).key).toBe(40);
      expect(tree.floor(7).key).toBe(5);
      expect(tree.floor(3)).toBeUndefined();
    });

    it('should get the ceiling node (the node with the smallest key greater ' +
        'than the requested key', function() {
      expect(tree.ceil(13).key).toBe(16);
      expect(tree.ceil(27).key).toBe(29);
      expect(tree.ceil(7).key).toBe(10);
      expect(tree.ceil(60)).toBeUndefined();
    });

    it('should rank a key (the rank is the number of nodes in the tree ' +
        'with a key smaller than the ranked key.', function() {
      expect(tree.rank(5)).toBe(0);
      expect(tree.rank(55)).toBe(6);
      expect(tree.rank(16)).toBe(2);
    });

    it('should get the keys of all the nodes in the tree', function() {
      expect(tree.getKeys()).toEqual([5, 10, 16, 25, 29, 40, 55]);
    });

  });

});
