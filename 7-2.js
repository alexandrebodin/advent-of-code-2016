var fs = require('fs');
var assert = require('assert')

var input = fs.readFileSync('7.txt', 'utf8');

const isABA = (ipPortion) => {
  return  ipPortion.indexOf('[') === -1 && ipPortion.indexOf(']') === -1 &&
          ipPortion[0] !== ipPortion[1] &&
          ipPortion[0] === ipPortion[2];
}

const reverseABA = aba => {
  [a,b,a] = aba.split('');
  return [b,a,b].join('');
}

const isInHyperNet = (ip, index) => {
  return ip.substr(0, index).lastIndexOf('[') > ip.substr(0, index).lastIndexOf(']');
}

const supportsSSL = (ip) => {
  var ipABAs = [];
  var ipBABs = [];

  for (var i = 0; i < ip.length; i++) {
    var ipPortion = ip.substr(i, 3);

    if (isABA(ipPortion)) {
      if (isInHyperNet(ip, i)) ipBABs.push(ipPortion);
      else ipABAs.push(ipPortion);
    }
  }

  return ipABAs.findIndex(val => ipBABs.indexOf(reverseABA(val)) >= 0) >= 0;
};

console.log(
  input.trim().split('\n')
  .filter(supportsSSL)
  .length
);

assert(supportsSSL('aba[bab]xyz') === true)
assert(supportsSSL('xyx[xyx]xyx') === false)
assert(supportsSSL('aaa[kek]eke') === true)
assert(supportsSSL('zazbz[bzb]cdb') === true)
assert(supportsSSL('zazbzazdfzgret[bazegzdbdbrehtzbaca]ca[azegzrhetjy]zezregdbd') === true)
