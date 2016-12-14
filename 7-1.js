var fs = require('fs');
var assert = require('assert')

var input = fs.readFileSync('7.txt', 'utf8');

const isAnnotation = (ipPortion) => {
  return  ipPortion.indexOf('[') === -1 && ipPortion.indexOf(']') === -1 &&
          ipPortion[0] != ipPortion[1] &&
          ipPortion.substr(0,2) == ipPortion.substr(2,2).split('').reverse().join('');
}

const isInHyperNet = (ip, index) => {
  return ip.substr(0, index).lastIndexOf('[') > ip.substr(0, index).lastIndexOf(']');
}

const supportsTLS = (ip) => {
  var supportTLS = false;
  for (var i = 0; i < ip.length; i++) {
    if (isAnnotation(ip.substr(i, 4))) {
      if (isInHyperNet(ip, i)) return false;
      supportTLS = true;
    }
  }
  return supportTLS;
};

var ipWithTLS = input.trim().split('\n')
  .filter(supportsTLS);

assert(supportsTLS('abba[mnop]qrst') === true)
assert(supportsTLS('abcd[bddb]xyyx') === false)
assert(supportsTLS('aaaa[qwer]tyui') === false)
assert(supportsTLS('ioxxoj[asdfgh]zxcvbn') === true)

console.log(ipWithTLS.length);
