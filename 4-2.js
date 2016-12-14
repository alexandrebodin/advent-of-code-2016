var fs = require('fs');

function rotateChar(count) {
  return char => char === '-' ? ' ' : String.fromCharCode(((char.charCodeAt(0) - 97) + count) % 26 + 97);
}

function getSectorId(roomName) {
  return parseInt(roomName.slice(-10, -7), 10);
}

function getCheckSum(roomName) {
  return  roomName.slice(-6, -1);
}

function decrypt(string) {
  var s = string.slice(0, - 10);
  var rotator = rotateChar(getSectorId(string));
  return s.split('').map(rotator).join('');
}

function decryptAndSearch(search) {
  return string => decrypt(string).indexOf(search) >= 0;
}

var input = fs.readFileSync('4.txt', 'utf8');
const sectorSum = input.trim().split('\n')
  .filter(decryptAndSearch('north'))
  .map(getSectorId)


console.log(sectorSum);
