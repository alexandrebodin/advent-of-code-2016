var fs = require('fs');

const facing = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  OUEST: 3
};

const dir = {
  LEFT: -1,
  RIGHT: 1
}

const initialCoordinates = { x: 0 , y: 0, facing: facing.NORTH };

const hashCoords = ({x, y}) => x + ',' + y;

const compute = (initialCoordinates, moves) => {
  let visitedCoordiantes = { [hashCoords(initialCoordinates)]: true };

  let coord = initialCoordinates;
  for (let move of moves) {
    coord.facing = (coord.facing - move.direction + 4) % 4;

    for (let i = 1; i <= move.dist; i++) {
      switch (coord.facing) {
        case facing.NORTH: coord.y--; break
        case facing.EAST: coord.x++; break
        case facing.SOUTH: coord.y++; break
        case facing.OUEST: coord.x--; break
      }

      if (visitedCoordiantes[hashCoords(coord)]) return coord;
      visitedCoordiantes[hashCoords(coord)] = true;
    }
  }
}

const input = fs.readFileSync(__dirname + '/1.txt', 'utf8');
const moves = input.split(', ')
  .map(move => ({
    direction: move[0] == 'R' ? dir.RIGHT : dir.LEFT,
    dist: parseInt(move.slice(1), 10)
  }))

let finalCoordinates = compute(initialCoordinates, moves);
const blockCount = Math.abs(finalCoordinates.x) + Math.abs(finalCoordinates.y);

console.log(blockCount)
