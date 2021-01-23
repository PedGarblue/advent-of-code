const fs = require('fs');

const day4Solution = input => {
  const fields = {
    'byr': value => value.length === 4 && parseInt(value, 10) >= 1920 && parseInt(value, 10) <= 2002,
    'iyr': value => value.length === 4 && parseInt(value, 10) >= 2010 && parseInt(value, 10) <= 2020,
    'eyr': value => value.length === 4 && parseInt(value, 10) >= 2020 && parseInt(value, 10) <= 2030,
    'hgt': value => /^[0-9]{2}in$/m.test(value) 
      ? parseInt(value.substr(0,2), 10) >= 59 && parseInt(value.substr(0,2), 10) <= 76
      : /^[0-9]{3}cm$/m.test(value)
        ? parseInt(value.substr(0,3), 10) >= 150 && parseInt(value.substr(0,3), 10) <= 193
        :false,
    'hcl': value => /^#[0-9a-f]{6}$/m.test(value),
    'ecl': value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    'pid': value => /^[0-9]{9}$/m.test(value),
    'cid': () => true,
  };

  let validPassports = 0;
  let fieldIncluded = [];

  input.forEach(line => {
    if (line === ''){
      if (fieldIncluded.length === 8 || (!fieldIncluded.includes('cid') && fieldIncluded.length === 7)){
          validPassports += 1;
      }
      fieldIncluded = [];
    } else {
      const fieldsLine = line.split(' ');
      fieldsLine.forEach(key => {
        const keyp = key.split(':');
        if (fields[ keyp[0] ](keyp[1])) fieldIncluded.push(keyp[0]);
      });
    }   
  });
  return validPassports;
};

const textInput = fs.readFileSync('./inputs/day4.txt', 'utf-8').toString().split('\n');
console.log(day4Solution(textInput));
