const data = `3,4,3,1,2`;

const parsingData = (data) => {
  return data
  .split(",")
  .map((e) => Number(e));
};

function main(initState, days) {
    let array = Array(9).fill(0);
    let i = 0;

    for (let index = 0; index < initState.length; index++) {
        const element = initState[index];
        array[element]++;
    }

    const eachDay = (arr) => {
        return arr.map((value, index, array) => {
            if (index === 6) {
                return array[0] + array[index + 1]
            } else if (index === 8) {
                return array[0];
            } else {
                return array[index + 1];
            }
        })
    }

  while (i < days) {
    array = eachDay(array);
    i++;
  }

  return array.reduce((acc, current) => {return acc + current}, 0);
}

console.log(main(parsingData(data), 256))