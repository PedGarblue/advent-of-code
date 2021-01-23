const { readFileSync } = require('fs');

const day9Sol = (input, preamble) => {
  let hasFoundNumber = false;
  let i = 0;
  let l = preamble;
  let numToCompare = parseInt(input[l], 10);  
  let numList = [];
  let sums = {};

  while(true) {
    if (numList.length >= preamble && !hasFoundNumber){ 
      const list = sums[numToCompare]
      let min = Math.min(...list);
      let max = Math.max(...list);
      console.log(sums[numToCompare], min, max);
      return { num: numToCompare, weak: min + max };
    }
    const num = parseInt(input[i], 10);
    if(numList.includes(numToCompare - num) && !hasFoundNumber){
      ++l
      numToCompare = parseInt(input[l])
      hasFoundNumber = true;
    }
    if(numList.length === preamble) {
      i += l - i - preamble;
      numList = [];
      hasFoundNumber = false; 
    } else {
      numList.push(num);
      i++
      if(numList.length > 0) {
        const sum = numList.reduce((accumulator, currentValue) => { 
          return accumulator + currentValue 
        }, 0);
        sums[sum] = [].concat(numList);
      }
    }
  }
}

const text = readFileSync('./inputs/day9.txt', 'utf8').split('\n').slice(0, -1);
console.log(day9Sol(text, 25));
