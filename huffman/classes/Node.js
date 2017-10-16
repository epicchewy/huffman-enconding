'use strict';

const _ = require('lodash');
const assert = require('assert');

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