const _ = require("lodash")

const input = `target area: x=20..30, y=-10..-5`;
// const input = `target area: x=230..283, y=-107..-57`;

const parseData = input => {
  const coordinates = input.split(/[=,.]/).filter(Number).map(Number);
  return {
    x: coordinates.slice(0, 2),
    y: coordinates.slice(2),
  };
};

const sumToN = n => (n * (n + 1)) / 2;

const isCollideY = (initV, range, velocitiesPerStep, yes) => {
  let coordinate = 0;
  let step = 1;
  for (let i = initV; coordinate >= range[0]; i--) {
    coordinate = coordinate + i;
    if (coordinate >= range[0] && coordinate <= range[1]) {
      const stepVel = velocitiesPerStep[step];
      stepVel
        ? velocitiesPerStep[step].y.push(initV)
        : (velocitiesPerStep[step] = { x: [], y: [initV] });

      // stepVel && velocitiesPerStep[step].y.push(initV);
      // stepVel && velocitiesPerStep[step].y++;
      yes.push(initV);
    }
    step++;
  }
  return false;
};
const isCollideX = (initV, range, velocitiesPerStep, xes) => {
  let coordinate = 0;
  let step = 1;
  for (let i = initV; i >= 0; i--) {
    coordinate = coordinate + i;
    if (coordinate >= range[0] && coordinate <= range[1]) {
      const stepVel = velocitiesPerStep[step];
      stepVel && velocitiesPerStep[step].x.push(initV);
      if (i === 0) {
        Object.keys(velocitiesPerStep).forEach((st) => {
          if (+st > step) {
            velocitiesPerStep[st].x.push(initV);
          }
        });
      }
      // stepVel
      //   ? velocitiesPerStep[step].x.push(initV)
      //   : (velocitiesPerStep[step] = { x: [initV], y: [] });
      // : (velocitiesPerStep[step] = { x: 1, y: 0 });
      xes.push(initV);
    }
    step++;
  }
  return false;
};

const allInitialVelocities = area => {
  const velocitiesPerStep = {};
  const xes = [];
  const yes = [];
  for (let j = area.y[0]; j <= Math.abs(area.y[0]); j++) {
    isCollideY(j, area.y, velocitiesPerStep, yes);
  }

  for (let i = 1; i <= area.x[1]; i++) {
    isCollideX(i, area.x, velocitiesPerStep, xes);
  }

  return velocitiesPerStep;
};

const coordinates = velPerStep => {
  return Object.values(velPerStep).reduce((acc, current) => {
    const coords = [];
    current.x.forEach(i => {
      current.y.forEach(j => {
        coords.push([i, j]);
      });
    });
    return _.uniqWith([...acc, ...coords], _.isEqual);
  }, []);
};
console.log(allInitialVelocities(parseData(input)));

const maxHeight = area => {
  const yRange = area.y;
  let heightestY = 0;

  for (let initV = 1; initV < Math.abs(yRange[0]); initV++) {
    const maxY = sumToN(initV);
    if (isCollideY(initV, yRange)) {
      heightestY = maxY;
    }
  }
  return heightestY;
};
