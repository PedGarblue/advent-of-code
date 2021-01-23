const fs = require('fs');

const day10Sol = input => {
  const differences = {
    1: 0,
    2: 0,
    3: 1,
  };
  const findDifference = (input, joltage) => {
    for(let i = 1; i <= 3; i++) {
      if (input.includes(joltage + i)) {
        return i;
      }
    }
    return false;
  };

  differences[findDifference(input, 0)] += 1;

  input.forEach(joltage => {
    const diff = findDifference(input, joltage);
    if (diff) differences[diff] += 1;
  });
  return differences;
};

const memo = new Map();

const findArranges = (input, val, ways) => {
  let differences = [];
  for(let i = 1; i <= 3; i++) {
    if (input.has(val + i)) {
      differences.push(val + i);
    }
  }
  if(differences.length > 0){
    if(differences.length > 1) differences.slice(1).forEach(diffVal => {
      let result; 
      if (memo.has(diffVal)) result = memo.get(diffVal);
      else {
        result = findArranges(input, diffVal, 0) + 1;
        memo.set(diffVal, result);
      }
      ways += result;
    })
    return findArranges(input, differences[0], ways);
  }
  return ways;
};


const text = fs.readFileSync('./inputs/day10.txt', 'utf8')
  .split('\n')
  .slice(0,-1)
  .map(joltage => parseInt(joltage, 10));

console.log(day10Sol(text));
textMap = new Map();
text.forEach(val => textMap.set(val))
console.log('arrans: ',findArranges(textMap, 0, 1));
