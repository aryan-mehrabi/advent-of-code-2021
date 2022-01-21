const data = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const parsingData = (data) => {
  return data.split("\n").map((e) => e.split("").map((e) => Number(e)));
};

const lowestPoint = (data, i, j) => {
  const number = data[i][j];
  const adjacents = [
    (data[i - 1] || [])[j],
    (data[i + 1] || [])[j],
    data[i][j + 1],
    data[i][j - 1],
  ];
  if (number < Math.min(...adjacents.filter((e) => !(e === undefined)))) {
    return true;
  }
  return false;
};

function main(data) {
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (lowestPoint(data, i, j)) {
        arr.push(data[i][j] + 1);
      }
    }
  }
  return arr.reduce((acc, curr) => acc + curr);
}

console.log(main(parsingData(data)));
