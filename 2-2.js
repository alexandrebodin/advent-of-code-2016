var fs = require('fs');

const input = fs.readFileSync('2.txt', 'utf8');

var initalPos = 5;

var pad = [
  , , 1, , ,
 , 2, 3, 4, ,
5, 6, 7, 8, 9,
 , 'A', 'B', 'C', ,
  , , 'D', ,
];


const move = (state, dir) => {
  const padIndex = pad.indexOf(state);
  switch (dir) {
    case 'U': return padIndex > 5 ? pad[padIndex - 5] || state : state;
    case 'R': return padIndex % 5 != 4 ? pad[padIndex + 1] || state : state;
    case 'D': return padIndex < 20 ? pad[padIndex + 5] || state : state;
    case 'L': return padIndex % 5 != 0 ? pad[padIndex - 1] || state : state;
  }
}

const pass = input.trim()
  .split('\n')
  .map((line, i) => {
    return line.split('')
      .reduce(move, initalPos)
  });

console.log(pass.join(''));
