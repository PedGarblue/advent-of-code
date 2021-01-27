const fs = require('fs');

const inputRaw = fs.readFileSync('./inputs/day12.txt')
  .toString()
  .split('\n')
  .slice(0, -1);

const jumps = {
  '90': 1,
  '180': 2,
  '270': 3,
};

const getDirection = (actual, moves, direction) => {
  const sides = {
    W: {
      left: 'S',
      right: 'N',
    },
    N: {
      left: 'W',
      right: 'E',
    },
    E: {
      left: 'N',
      right: 'S',
    },
    S: {
      left: 'E',
      right: 'W',
    },
  };
  if(moves > 0) return getDirection(sides[actual][direction], moves - 1, direction);
  else return actual;
};

const rotateWaypoint = (waypoint, moves, direction) => {
  if(moves > 0) {
    const x = waypoint.x;
    const y = waypoint.y;
    waypoint.x = (direction === 'left' ? -y : y);
    waypoint.y = (direction === 'left' ? x : -x);
    return rotateWaypoint(waypoint, moves - 1, direction);
  }
  else return;
};

const getManhattanDistance = actions => {
  const moves = {
    N: (dirs, units) => dirs.y = dirs.y + units,
    S: (dirs, units) => dirs.y = dirs.y - units,
    E: (dirs, units) => dirs.x = dirs.x + units,
    W: (dirs, units) => dirs.x = dirs.x - units,
    L: (dirs, units) => {
      dirs.facingTo = getDirection(dirs.facingTo, jumps[units], 'left');
    },
    R: (dirs, units) => {
      dirs.facingTo = getDirection(dirs.facingTo, jumps[units], 'right');
    },
  };
  moves.F = (dirs, units) => moves[dirs.facingTo](dirs, units);

  const dirs = {
    facingTo: 'E',
    // negative x means west, positive x means east
    x: 0,
    // negative y means south, positive y means north 
    y: 0,
  };

  actions.forEach(action => {
    moves[action.command](dirs, action.units);
  });

  return Math.abs(dirs.x) + Math.abs(dirs.y);
};

const getManhattanDistanceFromRelativeWaypoint = (actions, initialWaypoint) => {
  const dirs = {
    x: 0,
    y: 0,
  };
  const moves = {
    N: (units, waypoint) => waypoint.y = waypoint.y + units,
    S: (units, waypoint) => waypoint.y = waypoint.y - units,
    E: (units, waypoint) => waypoint.x = waypoint.x + units,
    W: (units, waypoint) => waypoint.x = waypoint.x - units,
    L: (units, waypoint) => {
      rotateWaypoint(waypoint, jumps[units], 'left');
    },
    R: (units, waypoint) => {
      rotateWaypoint(waypoint, jumps[units], 'right');
    },
  };
  moves.F = (units, waypoint, dirs) => {
    dirs.x = dirs.x + waypoint.x * units; 
    dirs.y = dirs.y + waypoint.y * units; 
  };

  actions.forEach(action => {
    moves[action.command](action.units, initialWaypoint, dirs);
  });

  return Math.abs(dirs.x) + Math.abs(dirs.y);
};

const part1 = input => {
  return getManhattanDistance(input.map(val => ({ command: val[0], units: parseInt(val.slice(1), 10) })));
};

const part2 = input => {
  let initialWaypoint = {
    x: 10,
    y: 1,
  };
  return getManhattanDistanceFromRelativeWaypoint(input.map(val => ({ command: val[0], units: parseInt(val.slice(1), 10) })), initialWaypoint);
}

console.log(part1(inputRaw));
console.log(part2(inputRaw));
