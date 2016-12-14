var fs = require('fs');


function isRealRoom(string) {
  var s = string.slice(0, - 10);
  var checksum = string.slice(-6, -1)

  var letters = s.replace(/-/g, '').split('');

  var map = letters.reduce((acc, letter) => {
    if (acc[letter]) {
      acc[letter]++;
    } else {
      acc[letter] = 1;
    }

    return acc;
  }, {});

  var validCheckSum = Object.keys(map)
    .sort((keyA, keyB) => {
      var aCount = map[keyA],
          bCount = map[keyB];

      if (aCount === bCount) {
        return keyA.charCodeAt(0) - keyB.charCodeAt(0);
      }
      return bCount - aCount;
    })
    .slice(0, 5)
    .join('');

    return validCheckSum === checksum;
}

var input = fs.readFileSync('4.txt', 'utf8');
const sectorSum = input.trim().split('\n')
  .filter(isRealRoom)
  .reduce((acc, encRoom) => acc += parseInt(encRoom.slice(-10, -7), 10), 0);

console.log(sectorSum);
