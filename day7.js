const data = `16,1,2,0,4,2,7,1,2,14`
const parsingData = (data) => {
  return data.split(",").map((e) => Number(e));
};

// [16 , 1 , 2 , 0 , 4 , 2 , 7 , 1]

const triangleNumebr = (num) => (num * (num + 1)) / 2;

const fuelRequire = (num, array) => {
  return array.reduce((acc, current) => acc + triangleNumebr(Math.abs(num - current)), 0);
};

const modifiedData = parsingData(data);

const mid = array => Math.round(array.reduce((acc, curr) => acc + curr) / array.length) ;

function main() {
    let array = [];
    let i = Math.min(...modifiedData);
    const max = Math.max(...modifiedData);
    while(i <= max) {
        array.push(fuelRequire(i, modifiedData));
        i++
    }
    console.log(Math.min(...array))
}

main();