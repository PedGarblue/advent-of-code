const fs = require('fs');

const day1Solves = (input) => {
  const mem = new Map();
  let res = 0;
  input.forEach(value => {
    if(mem.has(2020 - value)) res = value * (2020 - value);
    else mem.set(value)
  });
  return res;
};

const day1bSolves = (input) => {
  const mem = {};
  const possibles = new Map();
  let res = 0;
  input.forEach((value) => {
    if(possibles.has(2020 - value)) res = value * possibles.get(2020 - value)[0] * possibles.get(2020 - value)[1]
    else {
      mem.forEach(memval => {
        if(value + memval < 2020) possibles.set(value + memval, [value, memval]);
      })
      mem[value] = value
    }
  });
  return res;
};

const text = fs.readFileSync('./inputs/day1.txt').toString().split('\n').map(item => parseInt(item, 10));


console.log(day1Solves(text));
console.log(day1bSolves(text));
