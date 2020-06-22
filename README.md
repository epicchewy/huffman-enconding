# Huffman Encoding

This project provides a huffman encoding implementation for data compression of ASCII Art.

## Implementation Overview

When given a file of ASCII art of unknown size to compress, a performant solution is to encode/decode the file with a lossless compression technique like Huffman Encoding, a technique that takes advantage of a weight of each unique character to build a variable-length encoding table that can efficiently encode the input. Since data compression is used very often when transporting data between systems, I decided to build a module wrapping the Huffman encoding process, exposing an interface to make it easy to use, understand, and maintain.

Admittedly, implementing the solution in JavaScript might not have been the best decision because JavaScript, though great with unicode-encoded strings, does not handle binary data very well. This language nuance is fine on the browser, where most data takes string form, and Node.JS servers have a solution with their native Buffers class. Sadly, the Buffer class' binary string form is in the process of being deprecated, which forces my solution to write the binary string as a JS String to a textfile.

Rest assured, the compression algorithm is still valid. For example, when compressing data.txt, a file with 5000+ bytes, the output file contains a binary string of ~10000 bits. When we convert that to bytes, we see that the file actually dramatically reduced in size from ~5000 -> ~1300 bytes.

## Usage

#### Install dependencies:

`npm install`

#### To create encoded and decoded files:

`node compression.js <test file>`

**Unit tests** -- `npm test`

**Functionality** -- `diff data.txt decoded.txt` should output nothing

**Clean-up** -- `./clean.sh`
