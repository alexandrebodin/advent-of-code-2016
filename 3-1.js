var fs = require('fs');

function isTrianglePossible(sides) {
  for (let i = 0; i < 3; i++) {
    var a = sides[i],
        b = sides[(i + 1) % 3],
        c = sides[(i + 2) % 3];

    if ((a + b) <= c) {
      return false;
    }
  }

  return true;
}

var input = fs.readFileSync('3.txt', 'utf8');
var possibleTriangles = input.trim()
  .split('\n')
  .map(line => [
    parseInt(line.substr(0, 5), 10),
    parseInt(line.substr(5, 10), 10),
    parseInt(line.substr(10, 15), 10)
  ])
  .filter(isTrianglePossible)
  .length;

console.log(possibleTriangles);
