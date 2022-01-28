const data = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const parsingData = (data) => {
  return data.split("\n").map((e) => e.split("").map((e) => Number(e)));
};

const adjacents = (heightMap, i, j) => {
  const adjacents = [
    (heightMap[i - 1] || [])[j],
    heightMap[i][j + 1],
    (heightMap[i + 1] || [])[j],
    heightMap[i][j - 1],
  ];
  return adjacents;
};

const isLowPoint = (coordinate, adjacents) => {
  const adjacentsFilterd = adjacents.filter((e) => !(e === undefined));
  if (coordinate < Math.min(...adjacentsFilterd)) {
    return true;
  }
  return false;
};

const addToBasinCoordinate = (basinsCoordinate, i, j) => {
  basinsCoordinate.push({ i, j });
};

const isInbasinsCoordinate = (basinsCoordinate, i, j) => {
  basinsCoordinate.forEach((point) => {
    if ((point.i === i, point.j === j)) {
      return true;
    }
  });
  return false;
};
  const basin = (map, i, j) => {
    if (map[i][j] === 1) return 0;
    
    map[i][j] = 1;
    let size = 1;
    if (i - 1 > -1) {
      size += basin(map, i - 1, j);
    } 
    if (i + 1 < map.length) {
      size += basin(map, i + 1, j);
    } 
    if (j - 1 > -1) {
      size += basin(map, i, j - 1);
    } 
    if (j + 1 < map[i].length) {
      size += basin(map, i, j + 1);
    }
    return size;
  };
  

function main(heightMap) {
  const map = Array(heightMap.length)
    .fill(Array(heightMap[0].length).fill(0))
    .map((x, i) => x.map((x, j) => (heightMap[i][j] === 9 ? 1 : 0)));
  const basins = [];

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      let basinQuantity = basin(map, i, j)
      if (basinQuantity !== 0) {        
        basins.push(basinQuantity);
      }
    }
  }
  basins.sort((a, b) => b - a)
  return basins[0] * basins[1] * basins[2]
}

console.log(main(parsingData(data)));
