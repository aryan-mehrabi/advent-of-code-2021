const dataNumbers = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1`;
const dataBoards = `22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`;


class Board {
  constructor(board) {
    this.board = board;
    this.marked = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
  }
  mark(number) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (number === this.board[i][j]) {
            this.marked[i][j] = 1;
        //   this.marked[i] = this.marked[i].map((value, index) => index === j ? 1 : value)
        }
      }
    }
  }
  win() {
    for (let i = 0; i < this.marked.length; i++) {
      let won = true;
      for (let j = 0; j < this.marked.length; j++) {
        if (!this.marked[i][j]) {
          won = false;
        }
      }
      if (won) {
        return true;
      }
    }
    for (let i = 0; i < this.marked.length; i++) {
      let won = true;
      for (let j = 0; j < this.marked.length; j++) {
        if (!this.marked[j][i]) {
          won = false;
        }
      }
      if (won) {
        return true;
      }
    }
    return false;
  }
  score(number) {
    let score = 0;
    for (let i = 0; i < this.marked.length; i++) {
      for (let j = 0; j < this.marked.length; j++) {
        if (!this.marked[i][j]) {
          score += this.board[i][j];
        }
      }
    }
    return score * number;
  }
}

function dataSpliter(data, spliter) {
  return data.split(spliter);
}

function dataBoardExtractor(data) {
  let boards = [];
  dataSpliter(data, "\n")
    .map((element) => element.trim())
    .filter((element) => Boolean(element))
    .reduce((previous, current, index) => {
      const board = previous.concat([
        dataSpliter(current, /\s+/g).map((element) => Number(element)),
      ]);

      if (!((index + 1) % 5)) {
        boards.push(new Board(board));
        return [];
      } else {
        return board;
      }
    }, []);
  return boards
}

const boards = dataBoardExtractor(dataBoards);
const numbers = dataSpliter(dataNumbers, ",").map((e) => Number(e));

function main() {
  for (let index = 0; index < numbers.length; index++) {
    const number = numbers[index];
    for (let index = 0; index < boards.length; index++) {
      const board = boards[index];
      board.mark(number);
      if (board.win()) {
        return board.score(number);
      }
    }
  }
}

console.log(main())