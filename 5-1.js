var crypto = require('crypto')
var fs = require('fs')

function computeMD5(s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

var doorId = 'ojvtpuvg';
var pwd = '';
for (var i = 0;; i++) {
  if (pwd.length === 8) break;
  var hash = computeMD5(doorId + i);
  if (hash.substr(0, 5) === '00000') pwd += hash.substr(5, 1);
}

console.log(pwd);
