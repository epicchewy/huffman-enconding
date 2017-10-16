# Plaid Coding Challenge Solution

Task Summary -- Optimize a data format to efficiently transport data between systems.

## Implementation Overview

This challenge asks for a solution to encode / decode ASCII art while preserving file data (and reducing file size upon encoding). Therefore, I believe a good way to encode/decode the file is to use a lossless compression technique like Huffman Encoding, a technique that takes advantage of a weight of each unique character to build a variable-length encoding table that can efficiently encode the input. Since data compression is used very often when transporting data between systems, I decided to build a module wrapping the Huffman encoding process, exposing an interface to make it easy to use and understand.

Admittedly, implementing the solution in JavaScript might have been the best decision because JavaScript, though great with unicode-encoded strings, does not handle binary data very well. This language nuance is fine on the browser, where most data takes string form, and Node.JS servers have a solution with their native Buffers class. Sadly, the Buffer class' binary string form is in the process of being deprecated, which forces my solution to write the binary string as a JS String to a textfile.

Rest assured, the compression algorithm is still valid. For example, when compressing data.txt, a file with 5000+ bytes, the output file contains a binary string of ~10000 bits. When we convert that to bytes, we see that the file actually dramatically reduced in size from ~5000 -> ~1300 bytes.

## Usage

Install dependencies:
`npm install`

To create encoded and decoded files:
`node compression.js <test file>`

Testing:
Unit tests -- `npm test`
Functionality -- `diff data.txt decoded.txt` should output nothing
