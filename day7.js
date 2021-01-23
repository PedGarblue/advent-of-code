const { readFileSync } = require('fs');

const sumCounts = (objf, color, acum = 0) => {
  if(objf[color].length > 0) return acum + 1 + objf[color].reduce((accumulator, currentValue) => {
    return accumulator + sumCounts(objf, currentValue.name, 0) * currentValue.count;
  }, 0)
  else return 1;
};

const day7Solution = (input, color) => {
  let obj = {};
  let objf = {};
  input.forEach(bagRule => {
    const bagRules = bagRule.slice(0, -1).split(' bags contain ');

    objf[bagRules[0]] = bagRules[1]
      .split(', ')
      .map(value => {
        return {
          count: parseInt(value.slice(0,1), 10),
          name: value
            .replace(/bags? ?|contains? ?|[0-9] ?|\./g,'')
            .trim(),
        }
      }).filter(value => value.name !== 'no other');
    obj[bagRules[0]] = bagRules[1]
      .split(', ')
      .map(value =>
        value
          .replace(/bags? ?|contains? ?|[0-9] ?|\./g,'')
          .trim()
      );
  });
  let i = 1
  let containers = {
    0: [color],
    1: [],
  }
  let result = []
  while (true) {
    for (rule in obj) {
      containers[i-1].forEach(c => {
        if (obj[rule].includes(c)) {
          containers[i].push(rule)
        }
      })
    }
    if (containers[i].length == 0) {
      break
    }
    result.push(containers[i])
    i += 1
    containers[i] = []
  }
  console.log(objf[color]);
  return { 'color count': new Set(result.flat().sort()).size, 'bags': sumCounts(objf, color, 0) - 1};
};

const textInput = readFileSync('./inputs/day7.txt', 'utf-8').toString().split('\n').slice(0,-1);

console.log(day7Solution(textInput, 'shiny gold'));
