'use strict';

const assert = require('assert');
const _ = require('lodash');
const fs = require('fs');

const trie = require('../services/trie');

const ASCII_RANGE = 256;

class Huffman {
  constructor(file) {
    this.file = fs.readFileSync(file);
    this.tree = null;
    this.table = _.map(_.range(ASCII_RANGE), val => null);;
    this.encoded = '';
    this.frequencies = [];
  }

  generateEncodings(node, str) {
    if(!node.isLeaf()) {
      this.generateEncodings(node.left, str + '0');
      this.generateEncodings(node.right, str + '1');
    } else {
      this.table[node.char] = str;
    }
  }

  encode(test = false) {
    const charArray = _.split(this.file, '');
    const frequencies = _.map(_.range(ASCII_RANGE), val => 0); // default char freq to 0

    _.each(charArray, char => frequencies[char.charCodeAt(0)]++); // build frequency table
    if (test) this.frequencies = frequencies;

    this.tree = trie.build(frequencies); // build trie

    this.generateEncodings(this.tree, ''); // build encodings table

    /**
     * The two commented chunks below are different types of file encodings -- utf-8 & hex.
     * Both are derived from the initial binary string that is returned from the encodings table.
     */

    // const digits = _.map(charArray, char => {
    //   return parseInt(this.table[char], 2).toString(16);
    // });
    // const buf = new Buffer(digits, 'utf-8');
    // fs.writeFileSync('encoded.base', buf);

    // _.each(charArray, char => {
    //   const binaryString = this.table[char];
    //   const hex = parseInt(binaryString, 2).toString(16);
    //   fs.appendFileSync('encoded.hex', hex);
    // });

    _.each(charArray, char => this.encoded += this.table[char]);

    const fileName = (test) ? 'encodedTest.txt' : 'encoded.txt';
    fs.writeFileSync(fileName, this.encoded);
  }

  decode(test = false) {
    assert(this.file && this.tree && this.table && this.encoded, 'Have not encoded any file yet.');

    let decodedString = '';
    const charArray = _.split(this.encoded, '');
    let temp = this.tree;
    _.each(charArray, char => {
      temp = (char === '0') ? temp.left : temp.right;

      if (temp.isLeaf()) { // reset dfs
        decodedString += temp.char;
        temp = this.tree;
      }
    });

    const fileName = (test) ? 'decodedTest.txt' : 'decoded.txt';
    fs.writeFileSync(fileName, decodedString);
  }
}

module.exports = Huffman;
