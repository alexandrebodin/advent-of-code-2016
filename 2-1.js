var fs = require('fs');

const input = fs.readFileSync('2.txt', 'utf8');

let initialPos = 5;

const move = (pos, dir) => {
  switch (dir) {
    case 'U': return pos > 3 ? pos - 3 : pos;
    case 'R': return pos % 3 != 0 ? pos + 1 : pos;
    case 'D': return pos < 7 ? pos + 3 : pos;
    case 'L': return pos % 3 != 1 ? pos - 1 : pos;
  }
}

const pass = input.trim()
  .split('\n')
  .map((line, i) => {
    return line.split('')
      .reduce(move, initialPos)
  });

console.log(pass.join(''));
