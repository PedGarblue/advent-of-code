const fs = require('fs');

const findTrees = (treeMap, right, down) => {
  let treesFounds = 0;

  let x = 0;
  for(let y = 0; y < treeMap.length; y += down) {
    if (x >= treeMap[y].length) x = x - treeMap[y].length;
    if(treeMap[y][x] === '#') treesFounds += 1;
    x += right;
  }
  
  return treesFounds;
};
const testInput = fs.readFileSync('./inputs/day3.txt').toString().split('\n');

// todo: make testInput recieve an a array of move rules
const a = findTrees(testInput, 1, 1);
const b = findTrees(testInput, 3, 1);
const c = findTrees(testInput, 5, 1);
const d = findTrees(testInput, 7, 1);
const e = findTrees(testInput, 1, 2);

console.log(a, b, c, d, e);
console.log(a * b * c * d  * e);
