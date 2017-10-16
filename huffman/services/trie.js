'use strict';

const assert = require('assert');
const heap = require('min-heap');

const Node = require('../classes/Node');

const minHeap = new heap((a, b) => {
  return a.frequency - b.frequency;
});

/**
 * Function build() -- builds the prefix tree
 * Uses a min-heap to build a trie from bottom up
 * adding internal nodes based off its childrens' frequencies
 */

function build(frequencies) {
  for (let i = 0; i < 256; i++) {
    const character = String.fromCharCode(i);
    if (frequencies[i] > 0) {
      // loads heap with nodes for non-zero frequencies
      minHeap.insert(new Node(character, frequencies[i], null, null));
    }
  }

  // edge case where only file consists of one character only
  if (minHeap.size === 1) {
    if (frequencies['\0'] === 0) { // checks against default
      minHeap.insert(new Node('\0', 0, null, null));
    } else {
      minHeap.insert(new Node('\1', 0, null, null));
    }
  }

  while(minHeap.size !== 1) {
    const left = minHeap.removeHead();
    const right = minHeap.removeHead();
    const parent = new Node('\0', left.frequency + right.frequency, left, right);
    minHeap.insert(parent);
  }

  return minHeap.removeHead();
}

module.exports = {
  build,
};
