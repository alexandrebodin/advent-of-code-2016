const fs = require('fs');

const WIDTH = 50;
const HEIGHT = 6;

let screen = [];

for (let i = 0; i < HEIGHT; i++) {
  screen[i] = Array(WIDTH).fill('.');
}

const operations = {
  RECT: 0,
  ROTATE_RIGHT: 1,
  ROTATE_DOWN: 2
};

const parse = (line) => {
  const splitLine = line.split(' ');
  const op = splitLine[0];

  if (op === 'rect') {
    const [width, height] = splitLine[1].split('x');
    return {
      op: operations.RECT,
      width: parseInt(width, 10),
      height: parseInt(height, 10)
    };
  } else {
    if (splitLine[1] === 'row') {
      return {
        op: operations.ROTATE_RIGHT,
        row: parseInt(splitLine[2].split('=')[1], 10),
        offset: parseInt(splitLine[4], 10)
      };
    } else {
      return {
        op: operations.ROTATE_DOWN,
        col: parseInt(splitLine[2].split('=')[1], 10),
        offset: parseInt(splitLine[4], 10)
      };
    }
  }
}

const operateOnScreen = (screen, operation) => {
  switch(operation.op) {
    case operations.RECT: {
      for (let i = 0; i < operation.height; i++) {
        for (let j = 0; j < operation.width; j++) {
          screen[i][j] = '#';
        }
      }
      break;
    }
    case operations.ROTATE_RIGHT: {
      var tmpRow = [];
      for (let i = 0; i < WIDTH; i++) {
        let prevIndex = (i - operation.offset + WIDTH) % WIDTH;
        let nextVal = screen[operation.row][prevIndex];
        tmpRow[i] = nextVal;
      }
      screen[operation.row] = tmpRow;
      break;
    }
    case operations.ROTATE_DOWN: {
      var tmpCol = [];
      for (let i = 0; i < HEIGHT; i++) {
        let prevIndex = (i - operation.offset + HEIGHT) % HEIGHT;
        let nextVal = screen[prevIndex][operation.col];
        tmpCol[i] = nextVal;
      }

      tmpCol.forEach((val, i) => {
        screen[i][operation.col] = val;
      })
      break;
    }
  }

  return screen;
}

const displayScreen = s => console.log(s.map(line => line.join(' ')).join('\n'));

const input = fs.readFileSync('8.txt', 'utf8');

// const input = `rect 10x2
// rotate row y=0 by 3
// rotate column x=0 by 1
// `;


const finalScreen = input
  .trim()
  .split('\n')
  .map(parse)
  .reduce(operateOnScreen, screen)

displayScreen(finalScreen);
