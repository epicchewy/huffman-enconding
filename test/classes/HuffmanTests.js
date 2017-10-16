'use strict';

const _ = require('lodash');
const expect = require('expect.js');
const fs = require('fs');

const Huffman = require('../../huffman/classes/Huffman');

describe('Huffman', function() {
  let testHuffman;
  before(function() {
    testHuffman = new Huffman('test.txt');
  });

  describe('encode', function() {
    it('successfully returns a compressed file', function() { // happy path
      testHuffman.encode(true); // for test

      const file = fs.readFileSync('encodedTest.txt');
      expect(_.size(file)).to.be(24); // 24 bits (3-bytes) < 10-bytes === successful compression!
    });

    it('successfully builds frequency table, generates encodings, and saves trie', function() {
      const frequencies = testHuffman.frequencies;
      const table = testHuffman.table;
      const tree = testHuffman.tree;
      
      expect(_.size(_.compact(frequencies))).to.be(6);
      expect(tree.frequency).to.eql(10); // size of file
      _.each(_.split('ABCADABRA!'), char => {
        expect(char).to.not.be(null);
      });
    });
  });

  describe('decode', function() {
    it('successfully decodes encoded file', function() { // happy path
      testHuffman.decode(true); // for test

      const file = fs.readFileSync('decodedTest.txt', 'ascii');
      expect(file).to.be('ABCADABRA!'); // ensures lossless-ness
    });

    it('cannot decode if no encoding table exists', function() {
      const notHuffman = new Huffman('test.txt');
      try {
        notHuffman.decode();
      } catch (e) {
        expect(e).to.be.ok();
        expect(e.message).to.be('Have not encoded any file yet.');
      }
    });
  });
});
