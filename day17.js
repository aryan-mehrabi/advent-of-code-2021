// const input = `target area: x=20..30, y=-10..-5`;
const input = `target area: x=230..283, y=-107..-57`;

const parseData = input => {
  const coordinates = input.split(/[=,.]/).filter(Number).map(Number);
  return {
    x: coordinates.slice(0, 2),
    y: coordinates.slice(2),
  };
};

const sumToN = n => (n * (n + 1)) / 2;

const maxHeight = area => {
  const yRange = area.y;
  let heightestY = 0;

  const isCollide = (initV) => {
    let yCoordinate = 0;
    for (let i = initV ; yCoordinate > yRange[0] ; i++) {
      yCoordinate = yCoordinate - i;
      if (yCoordinate > yRange[0] && yCoordinate < yRange[1]) {
        return true;
      }
    }
    return false;
  };

  for (let initV = 1; initV < Math.abs(yRange[0]); initV++) {
    const maxY = sumToN(initV);
    if (initV === 1) console.log("hi")
    if (isCollide(initV)) {
      heightestY = maxY;
    }
  }
  return heightestY;
};

console.log(maxHeight(parseData(input)));
