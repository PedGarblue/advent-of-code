const { readFileSync } = require('fs');

const inputText = readFileSync('./inputs/day5.txt', 'utf-8').toString().split('\n');
const seats = [];

const day5Solution = input => {
  let max_value = 0;
  input.forEach(valueLine => {
    let seatrow = [0, 127];
    let seatcol = [0, 7]
    valueLine.split('').forEach(value => {
        if('F' === value) seatrow[1] = Math.floor((seatrow[0] + seatrow[1]) / 2)
        else if('B' === value) seatrow[0] = Math.round((seatrow[1] + seatrow[0]) / 2)
        else if('L' === value) seatcol[1] = Math.floor((seatcol[0] + seatcol[1]) / 2)
        else if('R' === value) seatcol[0] = Math.round((seatcol[1] + seatcol[0]) / 2)
    })
    const seat_id = seatrow[0] * 8 + seatcol[0];
    seats.push(seat_id);
    max_value = seat_id > max_value ? seat_id : max_value;
  })
  let id = 0;
  seats.sort();
  seats.forEach((value, i) => {
    if(value - seats[i - 1] === 2) id = value - 1
  });
  console.log(seats);
  return { max_value , id, l: input.length};
};

console.log(day5Solution(inputText));
