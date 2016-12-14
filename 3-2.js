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

var lines = fs.readFileSync('3.txt', 'utf8').trim().split('\n');

var triangles = [];
for (var index = 0; index < lines.length; index += 3) {
  for (var i = 0; i < 3; i++) {
    triangles.push([
      parseInt(lines[index].substr(0 + (5 * i), 5 + (5 * i)), 10),
      parseInt(lines[index + 1].substr(0 + (5 * i), 5 + (5 * i)), 10),
      parseInt(lines[index + 2].substr(0 + (5 * i), 5 + (5 * i)), 10)
    ])
  }
}

console.log(triangles.length);

possibleTriangles = triangles.filter(isTrianglePossible).length;

console.log(possibleTriangles);
