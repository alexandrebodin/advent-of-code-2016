const fs = require('fs');
const assert = require('assert');

function decompress(string) {
  let decompressed = [];
  for (let i = 0; i < string.length;) {
    if (string[i] === '(') { //parse marker
      let closing = string.indexOf(')', i);
      let marker = string.slice(i+1, closing).split('x');
      let [repeatLen, repeat] = [parseInt(marker[0], 10), parseInt(marker[1], 10)];

      for (let j = 0; j < repeat; j++) {
        decompressed.push(string.substr(closing + 1, repeatLen))
      }

      i = closing + repeatLen + 1;
    } else {
      decompressed.push(string[i])
      i++
    }
  }

  return decompressed.join('');
}

assert(decompress('ADVENT') === 'ADVENT');
assert(decompress('A(1x5)BC') === 'ABBBBBC');
assert(decompress('(3x3)XYZ') === 'XYZXYZXYZ');
assert(decompress('A(2x2)BCD(2x2)EFG') === 'ABCBCDEFEFG');
assert(decompress('(6x1)(1x3)A') === '(1x3)A');
assert(decompress('X(8x2)(3x3)ABCY') === 'X(3x3)ABC(3x3)ABCY');


var input = fs.readFileSync('9.txt', 'utf8').trim();

console.log(decompress(input).length);
