'use strict';

const _ = require('lodash');

const { huffman } = require('./huffman');
const compressionTest = new huffman(process.argv[2]);

try {
  compressionTest.encode();
  compressionTest.decode();
} catch (e) {
  console.log('Error during compression:', e);
};

console.log('Compression finished. Check files -- encoded.txt & decoded.txt.\nPlease read README for details');
