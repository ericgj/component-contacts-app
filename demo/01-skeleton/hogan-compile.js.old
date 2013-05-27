#!/usr/bin/env node

var str = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(chunk){ str += chunk });
process.stdin.on('end', done);
process.stdin.resume();

function done(){
  process.stdout.write("var hogan = require('hogan')\n");
  process.stdout.write('module.exports = hogan.compile("' + esc(str) + '");' );
}

function esc(s){
  return s.replace(/"/g, '\\"')
          .split("\n").join("");
}
