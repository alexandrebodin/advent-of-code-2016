var crypto = require('crypto')
var fs = require('fs')

function computeMD5(s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

var doorId = 'ojvtpuvg';
var pwd = [];
var length = 0;
for (var i = 0;; i++) {
  if (length === 8) break;
  var hash = computeMD5(doorId + i);
  if (hash.substr(0, 5) === '00000') {
    var position = parseInt(hash.substr(5, 1), 10);
    if (pwd[position] === undefined && position < 8 && position >= 0) {
      pwd[position] = hash.substr(6, 1);
      length++;
    }
  }
}

console.log(pwd.join(''));
