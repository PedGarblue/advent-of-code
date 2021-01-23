const fs = require('fs');

const loopInstructions = (input, findLoopExit = false, init = 0) => {
  const inverses = { 'jmp': 'nop', 'nop': 'jmp' };
  const instuctionsExecuted = {};
  let acc = 0;
  let i = init;

  while (true) {
    if (instuctionsExecuted[i] !== undefined ) return { failed: true, acc };
    if( i > input.length - 1) return { failed: false, acc };

    const instruction = input[i].split(' '); 
    const insName = instruction[0];
    const insValue = parseInt(instruction[1], 10);

    if (insName === 'acc') acc += insValue
    else if (findLoopExit) {
      const inversedInstruction = [inverses[insName], insValue ];
      const inputCopy = [].concat(input);
      inputCopy[i] = inversedInstruction.join(' ');
      const loop = loopInstructions(inputCopy, false, i);
      if (!loop.failed) return loop.acc + acc;
    }

    instuctionsExecuted[i] = instruction;
    i += insName === 'jmp' ? insValue : 1;
  }
};

const text = fs.readFileSync('./inputs/day8.txt', 'utf-8').toString().split('\n').slice(0,-1);

// part 1 solution
console.log(loopInstructions(text));
// part 2 solution
console.log(loopInstructions(text, true));
