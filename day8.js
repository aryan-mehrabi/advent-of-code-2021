const data = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const parsingData = (data) => {
  return data
    .split("\n")
    .map((e) =>
      e.split("|").map((e) => e.split(" ").filter((e) => Boolean(e)))
    );
};

function main(data) {
  const DIGITS = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg",
  ];

  const destructure = (array, length) => {
    const output = array.filter((e) => e.length === length);
    return output.length === 1 ? output[0] : output;
  };

  const deleteDuplicate = (...arr) => {
    const [bigger, smaller] = arr.sort((a, b) => b.length - a.length);
    return bigger
      .split("")
      .filter((e) => {
        if (smaller.includes(e)) {
          return false;
        }
        return true;
      })
      .join("");
  };

  const common = (arr, num, boolean) => {
    return arr.filter((e) => {
      const output =
        num.split("").filter((numChar) => {
          return e.includes(numChar);
        }).length === num.length;
      return boolean ? output : !output;
    })[0];
  };

  const findMissingSignals = (raw) => {
    const data = raw[0];
    const number1 = destructure(data, 2);
    const number4 = destructure(data, 4);
    const number7 = destructure(data, 3);
    const lengthSix = destructure(data, 6);
    const number8 = "abcdefg";
    const signals = Array(7).fill(0);

    const find = (segment, a, b) => {
      signals[segment] = deleteDuplicate(a, b);
    };

    find(0, number1, number7);
    find(2, common(lengthSix, number1, false), number8);
    find(5, number1, signals[2]);
    find(3,common(lengthSix, deleteDuplicate(number4, number1), false),number8);
    find(1, deleteDuplicate(number4, number1), signals[3]);
    find(4, common(lengthSix, number4, true), number8);
    find(6, signals.slice(0, 6).join(""), number8);
    return signals;
  };

  const calculateFourDigit = (data, signals, number8) => {
    const fourDigits = data[1];
    return Number(
      fourDigits
        .map((digit) =>
          DIGITS.indexOf(
            digit
              .split("")
              .map((character) => number8[signals.indexOf(character)])
              .sort()
              .join("")
          )
        )
        .join("")
    );
  };
  const allDigitsEntries = (data) => {
    return data.reduce(
      (acc, currentValue) =>
        acc +
        calculateFourDigit(
          currentValue,
          findMissingSignals(currentValue),
          "abcdefg"
        ),
      0
    );
  };
  return allDigitsEntries(data);
}
