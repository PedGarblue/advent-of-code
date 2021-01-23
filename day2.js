const fs = require('fs');

const checkPasswords = passwords => {
  let validPasswords = 0;
  passwords.forEach(value => {
    if (value === '') return;
    const splitted = value.split(' ');
    const policy = splitted[0].split('-');
    const min = parseInt(policy[0], 10);
    const max = parseInt(policy[1], 10);
    const letter = splitted[1].match(/\w+/g);
    const password = splitted[2];
    const matchs = password.match(new RegExp(letter, 'g')) || [];

    if (matchs.length >= min && matchs.length <= max) validPasswords = validPasswords += 1;
  });
  return validPasswords;
};

const checkPasswords2 = passwords => {
  let validPasswords = 0;
  passwords.forEach(value => {
    if (value === '') return;
    const splitted = value.split(' ');
    const policy = splitted[0].split('-');
    const pos1 = parseInt(policy[0], 10);
    const pos2 = parseInt(policy[1], 10);
    const letter = splitted[1].match(/\w+/g)[0];
    const password = splitted[2];
    const arr = [];
    if(password[pos1 - 1] === letter) arr.push(password[pos1 - 1]);
    if(password[pos2 - 1] === letter) arr.push(password[pos2 - 1]);
    if(arr.length === 1) validPasswords += 1;
  });
  return validPasswords;
};

const fileContents = fs.readFileSync('./inputs/day2.txt').toString().split('\n');
console.log(checkPasswords(fileContents));
console.log(checkPasswords2(fileContents));
