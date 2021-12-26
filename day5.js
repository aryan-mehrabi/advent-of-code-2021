"use strict";

const data = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const parsingData = (data) => {
  return data.split(/\n/).map((data) => {
    return data
      .split(" -> ")
      .map((data) => data.split(",").map((data) => Number(data)));
  });
};

const arragingData = (data) => {
  return data.reduce((previous, current) => {
    const [pointA, pointB] = current;
    return previous.concat([
      [
        { x: pointA[0], y: pointA[1] },
        { x: pointB[0], y: pointB[1] },
      ],
    ]);
  }, []);
};

class pointCreate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.occurrences = 1;
  }
}

function main() {
  const modifiedData = arragingData(parsingData(data));
  let allPeakPoints = [];
  const savePoints = (line) => {
    const [pointA, pointB] = line;

    const addingPointToData = (x, y) => {
      for (let index = 0; index < allPeakPoints.length; index++) {
        const element = allPeakPoints[index];
        if (element.x === x && element.y === y) {
          element.occurrences++;
          return;
        }
      }
      allPeakPoints.push(new pointCreate(x, y));
    };

    const loopingRange = () => {
      const xDirection = Math.sign(pointB.x - pointA.x);
      const yDirection = Math.sign(pointB.y - pointA.y);
      let x = pointA.x;
      let y = pointA.y;
      while (
        x >= Math.min(pointB.x, pointA.x) &&
        x <= Math.max(pointA.x, pointB.x) &&
        y >= Math.min(pointB.y, pointA.y) &&
        y <= Math.max(pointB.y, pointA.y)
      ) {
        addingPointToData(x, y);
        x += xDirection;
        y += yDirection;
      }
    };
    loopingRange();
  };

  for (let index = 0; index < modifiedData.length; index++) {
    const line = modifiedData[index];

    savePoints(line);
  }
  return allPeakPoints.filter((point) => point.occurrences > 1).length;
}

// not really suffiecent. it literally took a min for node to log the output.
