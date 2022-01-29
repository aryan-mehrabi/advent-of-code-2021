const input = `[({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`;

const parsingData = (data) => {
  return data.split("\n").map((e) => e.trim());
};

const OPENING_BRACKETS = ["(", "[", "{", "<"].map(e => e.charCodeAt(0));
const CLOSING_BRACKETS = [")", "]", "}", ">"].map((e) => e.charCodeAt(0));

const isClosingBracket = (characterCode) => {
    if (CLOSING_BRACKETS.indexOf(characterCode)  === -1) return false
    return true
};

const incorrectCharecter = (line) => {
  const openBrackets = [];
  for (let index = 0; index < line.length; index++) {
    const character = line[index].charCodeAt(0);
    if (isClosingBracket(character)) {
      if (CLOSING_BRACKETS.indexOf(character) !== OPENING_BRACKETS.indexOf(openBrackets[openBrackets.length - 1])) return character;
      openBrackets.pop();
    } else {
      openBrackets.push(character);
    }
  }
  // part 2
  return closingBracketsScore(openBrackets);
};

const closingBracketsScore = (openBrackets) => {
  return openBrackets.reduceRight((closingBrac, openingBrac) => {
    const indexOpening = OPENING_BRACKETS.indexOf(openingBrac);
    return closingBrac.concat([indexOpening + 1]);
  }, [])
}

const totalSyntaxError = (input) => {
  const errorPoints = [3, 57, 1197, 25137];
  let errors = [];
  let missingBracketsScore = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const missingCharecter = incorrectCharecter(line);
    
    if (typeof missingCharecter === "number") {
      errors.push(errorPoints[CLOSING_BRACKETS.indexOf(missingCharecter)]);
    } 
    else {
      missingBracketsScore.push(missingCharecter.reduce((acc, current) => (acc * 5) + current))
    }
  }
  return missingBracketsScore.sort((a,b) => a - b)[Math.floor(missingBracketsScore.length / 2)];
};
console.log(totalSyntaxError(parsingData(input)));

