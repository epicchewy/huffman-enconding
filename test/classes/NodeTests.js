'use strict';

const expect = require('expect.js');

const Node = require('../../huffman/classes/Node');

describe('Node', function() {
  describe('isLeaf', function() {
    it('should return true if it is a leaf', function() {
      const testNode = new Node('test', 10, null, null);
      expect(testNode.isLeaf()).to.be(true);
    });

    it('should return false if it is not a leaf', function() {
      const testLeftNode = new Node('test left', 10, null, null);
      const testRightNode = new Node('test right', 10, null, null);
      const testNode = new Node('test', 10, testLeftNode, testRightNode);
      expect(testNode.isLeaf()).to.be(false);
    });
  });
});
