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

const nextFacing = (coordinates, move) => (coordinates.facing - move.direction + 4) % 4;

const turn = (coordinates, move)  => {
  coordinates.facing = nextFacing(coordinates, move);
  switch (coordinates.facing) {
    case facing.NORTH: coordinates.y -= move.dist; break
    case facing.EAST: coordinates.x += move.dist; break
    case facing.SOUTH: coordinates.y += move.dist; break
    case facing.OUEST: coordinates.x -= move.dist; break
  }
  return coordinates;
}

const input = fs.readFileSync('1.txt', 'utf8');

const finalCoordinates = input.split(', ')
  .map(move => ({
    direction: move[0] == 'R' ? dir.RIGHT : dir.LEFT,
    dist: parseInt(move.slice(1), 10)
  }))
  .reduce(turn, initialCoordinates);

const blockCount = Math.abs(finalCoordinates.x) + Math.abs(finalCoordinates.y);

console.log(blockCount)
