const fs = require("fs")
const input = fs
.readFileSync("day14.txt", { encoding: "utf-8" }) // read day??.txt content
.replace(/\r/g, "");

const parsingData = (data) => {
  const [polymerTemplate, pairInsertions] = data.split("\n\n");
  const updatedInsertion = pairInsertions
    .split("\n")
    .reduce((object, pairInsertion) => {
      const [pair, between] = pairInsertion.split(" -> ");
      return Object.assign(
        {},
        { ...object },
        { [pair]: [pair[0] + between, between + pair[1]] }
      );
    }, {});
  return [polymerTemplate, updatedInsertion];
};

const polymerization = ([polymerTemplate, pairInsertion], steps) => {
  const pairOcurrance = {};
  let i = 0;
  let pairs = {};

  for (let index = 0; index < polymerTemplate.length - 1; index++) {
    pairs[polymerTemplate[index] + polymerTemplate[index + 1]] = (pairs[polymerTemplate[index] + polymerTemplate[index + 1]] || 0) + 1;
  }

  const lastCharacter = polymerTemplate[polymerTemplate.length - 1];

  const insertion = (pairs) => {
    const currentPairs = {};
    const keys = Object.keys(pairs);

    keys.forEach((key) => {
      currentPairs[pairInsertion[key][0]] =
        (currentPairs[pairInsertion[key][0]] || 0) + pairs[key];
      currentPairs[pairInsertion[key][1]] =
        (currentPairs[pairInsertion[key][1]] || 0) + pairs[key];
    });
    return currentPairs;
  };

  while (i < steps) {
    pairs = insertion(pairs);
    i++;
  }
  const eachElement = {};
  eachElement[lastCharacter] = 1
  for (const key in pairs) {
    if (Object.hasOwnProperty.call(pairs, key)) {
      const value = pairs[key];
      eachElement[key[0]] = (eachElement[key[0]] || 0) + value
    }
  }
  const arr = Object.values(eachElement);
  const min = Math.min(...arr)
  const max = Math.max(...arr)
  return max - min
};

 console.log(polymerization(parsingData(input), 40));
