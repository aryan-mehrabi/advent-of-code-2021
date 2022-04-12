const input = `38006F45291200`;

const hexToBin = hex => {
  let bin = "";
  for (let index = 0; index < hex.length; index++) {
    const element = hex[index];
    bin += ("0000" + parseInt(element, 16).toString(2)).slice(-4);
  }
  return bin;
};

const binToDec = binary => {
  return parseInt(binary, 2)
}

console.log(hexToBin("820D"));
