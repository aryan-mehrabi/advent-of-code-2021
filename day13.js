const _ = require("lodash")

const { update } = require("lodash");

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const parsingData = (data) => {
  const [paper, foldInstr] = data.split("\n\n");
  const paperUpdated = paper
    .split("\n")
    .map((coordinate) => coordinate.split(",").map(Number));
  const foldUpdated = foldInstr.match(/[xy]=\d+/g).map((fold) => {
    const [direction, number] = fold.split("=");
    return [direction === "x" ? +number : 0, direction === "y" ? +number : 0]
  });
  return [paperUpdated, foldUpdated];
};

const oneStepFold = (paper, foldCoordinate) => {
    const [foldX , foldY] = foldCoordinate;
    const newPaper = paper.map(coordinate => {
        const [coordinateX, coordinateY] = coordinate;
        if (foldX && coordinateX > foldX) {
            return [(foldX * 2) - coordinateX, coordinateY]
        }
        else if (foldY && coordinateY > foldY ) {
            return [coordinateX, (foldY * 2) - coordinateY ]
        }
        else {
            return coordinate;
        }
    })
    return _.uniqWith(newPaper, _.isEqual).length
    //updateCoordinates()
    //removeDuplicates()
    //countAllCoordinate()
};

console.log(oneStepFold(parsingData(input)[0], parsingData(input)[1][0]))