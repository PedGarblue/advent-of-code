const fs = require('fs');

const input = fs
  .readFileSync('./inputs/day13.txt', 'utf-8')
  .toString()
  .split('\n')
  .slice(0, -1);

const calcRoute = (objetive, start) => {
  return { start, i: Math.ceil(objetive / start) * start };
};

// returns x where (a * x) % b == 1
// https://rosettacode.org/wiki/Modular_inverse
const getInverse = (a, mod) => {
  const b = a % mod;
  for (let i = 1; i < mod; i++) {
    if ((b * i) % mod === 1) {
      return i;
    }
  }
  return 1;
};

const findEarliestBus = (timestamp, busIdList) => {
  return busIdList
    .map(el => calcRoute(timestamp, el))
    .reduce((acc, curr) => {
      return curr.i < acc.i || acc.i === 0 ? curr : acc;
    }, { i: 0 });
};

const part1 = input => {
  const timestamp = input[0];
  const avaliableBuses = input[1]
    .split(',')
    .filter(bus => bus !== 'x')
    .map(bus => parseInt(bus, 10));

  const earliest = findEarliestBus(timestamp, avaliableBuses)

  console.log(timestamp, earliest);
  return (earliest.i - timestamp) * earliest.start;
};
// safe with negative numbers unlike JS % operator
const absoluteModulo = (a, b) => ((a % b) + b) % b;
const chineseRemainderTheorem = (lines) => {
  // x =- a (mod n)
  // x - some unknown, constant value of t
  // a - bus number MINUS offset % bus number
  // n - cycle length (= bus number)

  // to solve each row, we also need
  // N - all n's added up
  // nU = N / n
  // i - inverse modulo

  const N = lines.reduce((acc, cur) => {
    if (cur === "x") {
      return acc;
    }
    return acc === null ? cur : acc * cur;
  }, null);

  const sum = lines.reduce((acc, cur, idx) => {
    if (cur === "x") {
      return acc;
    }
    const a = absoluteModulo(cur - idx, cur);
    const nU = N / cur;
    const inverse = getInverse(nU, cur);
    console.log(`x = ${a} (mod ${cur})`);
    return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
  }, 0n);

  return sum % BigInt(N);
};

const findMatchingT = (buses) => {
  let busesInt = buses.map((bus) => (bus === "x" ? "x" : parseInt(bus, 10)));
  return chineseRemainderTheorem(busesInt);
};

console.log(part1(input));
console.log(findMatchingT(input[1].split(',')));
