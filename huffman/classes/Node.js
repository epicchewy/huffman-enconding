'use strict';

const _ = require('lodash');
const assert = require('assert');

/**
 *  Node class represents a node in the huffman prefix-tree.
 *  Holds character, frequency of that character,
 *  and pointers to left/right nodes.
 */

class Node {
  constructor(char, frequency, left, right) {
    this.char = char;
    this.frequency = frequency;
    this.left = left;
    this.right = right;
  }

  isLeaf() {
    const left = this.left;
    const right = this.right;
    assert((_.isNull(left) && _.isNull(right))
      || (!_.isNull(left) && !_.isNull(right)), 'Node cannot have only one child');
    return _.isNull(left) && _.isNull(right);
  }
}

module.exports = Node;
