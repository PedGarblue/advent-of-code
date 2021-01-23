const { readFileSync } = require('fs');

const day6Solution = input => {
  let questionsGroupCount = 0;
  let groupAnswers = new Map();
  let groupLength = 0;
  input.forEach(personAnswers => {
    if(personAnswers !== ''){
      personAnswers.split('').forEach(answer => {
        if (!groupAnswers.has(answer)) groupAnswers.set(answer, 1);
        else groupAnswers.set(answer, groupAnswers.get(answer) + 1);
      });    
      groupLength += 1;
    } else {
      groupAnswers.forEach(value => {
        if (value === groupLength) questionsGroupCount += 1;
      });
      groupAnswers.clear();
      groupLength = 0;
    }
  });
  return questionsGroupCount;
};

const textInput = readFileSync('./inputs/day6.txt', 'utf-8').toString().split('\n');

console.log(day6Solution(textInput));
