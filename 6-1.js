var fs = require('fs')

var input = fs.readFileSync('6.txt', 'utf8').trim().split('\n')

function zip(arr) {
  var output = []
  for (var i = 0; i < arr[0].length; i++) {
    output[i] = [];
    for (var j = 0; j < arr.length; j++) {
      output[i][j] = arr[j][i];
    }
  }

  return output
}

function findMostCommon(arr) {
  return arr.sort((a, b) => arr.filter(el => el === a).length - arr.filter(el => el === b).length).pop()
}

var r = zip(input.map(line => line.split('')))
  .map(findMostCommon)


console.log(r.join(''));
