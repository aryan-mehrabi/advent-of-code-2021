const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const parsingData = (data) => {
  const [polymerTemplate, pairInsertions] = data.split("\n\n");
  const updatedInsertion = pairInsertions.split("\n").reduce((object, pairInsertion) => {
    const [pair, between] = pairInsertion.split(" -> ");
    return Object.assign({}, {...object}, {[pair]: between})
  }, {});
  return [polymerTemplate, updatedInsertion];
};

// [
//     'NNCB',
//     {
//       CH: 'B',
//       HH: 'N',
//       CB: 'H',
//       NH: 'C',
//       HB: 'C',
//       HC: 'B',
//       HN: 'C',
//       NN: 'C',
//       BH: 'H',
//       NC: 'B',
//       NB: 'B',
//       BN: 'B',
//       BB: 'N',
//       BC: 'B',
//       CC: 'N',
//       CN: 'C'
//     }
//   ]

const polymerization = ([polymerTemplate, pairInsertion], steps) => {
    const elementsOcurrance = {};
    let i = 0;

    const insertion = (polymerTemplate) => {
        let newPolymerTemplate = "";
        if (i === 0) {
            for (let index = 0; index < polymerTemplate.length; index++) {
                const element = polymerTemplate[index];
                elementsOcurrance[element] ? elementsOcurrance[element]++ : elementsOcurrance[element] = 1
            }
        }

        for (let index = 0; index < polymerTemplate.length - 1; index++) {
            const pair = polymerTemplate[index] + polymerTemplate[index + 1];
            const element = pairInsertion[pair]
            elementsOcurrance[element] ? elementsOcurrance[element]++ : elementsOcurrance[element] = 1
            newPolymerTemplate = newPolymerTemplate.concat(polymerTemplate[index], element)
            if (index === polymerTemplate.length - 2) newPolymerTemplate += polymerTemplate[index + 1]
        }
        return newPolymerTemplate;
    }

    while (i < steps) {
        polymerTemplate = insertion(polymerTemplate)
        i++
    }
    
    const arr = Object.values(elementsOcurrance).sort((a, b) => a - b)

    return -arr[0] + arr[arr.length - 1]
}

console.log(polymerization(parsingData(input), 10))
