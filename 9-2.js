const fs = require('fs');
const assert = require('assert');

function computeDecompressedLength(string) {
  let len = 0;
  for (let i = 0; i < string.length;) {
    if (string[i] === '(') { //parse marker
      let closing = string.indexOf(')', i);
      let marker = string.slice(i+1, closing).split('x');
      let [repeatLen, repeat] = [parseInt(marker[0], 10), parseInt(marker[1], 10)];

      let subLen = computeDecompressedLength(string.substr(closing + 1, repeatLen));
      len += subLen * repeat;
      i = closing + repeatLen + 1;
    } else {
      len++
      i++
    }
  }

  return len;
}

assert(computeDecompressedLength('ADVENT') === 'ADVENT'.length);
assert(computeDecompressedLength('X(8x2)(3x3)ABCY') === 'XABCABCABCABCABCABCY'.length);
assert(computeDecompressedLength('(27x12)(20x12)(13x14)(7x10)(1x12)A') === 241920);
assert(computeDecompressedLength('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN') === 445);


var input = fs.readFileSync('9.txt', 'utf8').trim();

console.log(computeDecompressedLength(input));
