const fs = require('fs');

const mappings = [ 
  [-1,-1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1,-1], [1, 0], [1, 1],
];

const text = fs.readFileSync('./inputs/day11.txt', 'utf8')
  .toString()
  .split('\n')
  .slice(0, -1)
  .map(row => row.split(''));

const applyDirection = (position, direction) => {
  return position.map((val, i) => val + direction[i]);
};

const findSeat = (actualPos, direction, array) => {
  const maxLengths = [array.length - 1, array[0].length - 1];
  const nextPos = applyDirection(actualPos, direction);
  const notOverflowsArray = nextPos.every((val, i) => val >= 0 && val <= maxLengths[i]);
  if(notOverflowsArray) {
    const seat = array[nextPos[0]][nextPos[1]];
    if(['L', '#'].includes(seat)) return nextPos;
    return findSeat(nextPos, direction, array);
  }
  return false;
};

const getAdjacents = (position, array, adjacents) => {
  const positionInAdjacent = position.join(',');
  if(!adjacents.has(positionInAdjacent))
    adjacents.set(positionInAdjacent, []);
  const adjacentsList = adjacents.get(positionInAdjacent);

  mappings.forEach(mapping => { 
    const mappedPosition = findSeat(position, mapping, array);
    if(mappedPosition) adjacentsList.push(mappedPosition);
  });

  adjacents.set(positionInAdjacent, adjacentsList);
  return adjacentsList;
};

const arriveSeats = (input) => {
  const adjacentsMap = new Map();
  const passed = input.map((row, y, array) => {
    return row
      .map((seat, x) => {
        const adjacents = getAdjacents([y, x], array, adjacentsMap);
        const adjacentSeats = adjacents
          .map(adjSeat => input[adjSeat[0]][adjSeat[1]])
          .filter(adjSeat => ['L', '#'].includes(adjSeat));
        const freeSeats = adjacentSeats.filter(val => val === 'L').length;
        const occSeats = adjacentSeats.filter(val => val === '#').length;
        if(seat === 'L' && freeSeats === adjacentSeats.length) return '#'; 
        else if(seat === '#' && occSeats >= 5) return 'L'; 
        return seat;
      });
    });
    return passed;
  };

const findFinalArrive = (input => {
  let seatsToArrive = input;
  let occupiedSeats = 0;
  while(true){
    seatsToArrive = arriveSeats(seatsToArrive);
    let newOccupedSeats = seatsToArrive.reduce((prev, actual) => {
      return prev + actual.filter(seat => seat === '#').length;
    }, 0);
    if(occupiedSeats === newOccupedSeats) return newOccupedSeats;
    else occupiedSeats = newOccupedSeats;
  };
});
console.log(findFinalArrive(text));
