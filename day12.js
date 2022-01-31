const R = require("ramda");

const input = `hl-WP
vl-fo
vl-WW
WP-start
vl-QW
fo-wy
WW-dz
dz-hl
fo-end
VH-fo
ps-vl
FN-dz
WP-ps
ps-start
WW-hl
end-QW
start-vl
WP-fo
end-FN
hl-QW
WP-dz
QW-fo
QW-dz
ps-dz`;

const parsingData = (data) => {
  return data.split("\n").map((e) => e.split("-"));
};

const createNodes = (arr) => {
  const nodes = {};
  arr.forEach((element) => {
    element.forEach((node, j) => {
      if (!nodes[node]) {
        nodes[node] = [element[j + 1] || element[j - 1]];
      } else {
        nodes[node].push(element[j + 1] || element[j - 1]);
      }
    });
  });
  for (const node in nodes) {
    if (Object.hasOwnProperty.call(nodes, node)) {
      const element = nodes[node];
      nodes[node] = element.filter((e) => !(e === "start"));
      if (node === "end") {
        delete nodes[node];
      }
    }
  }
  return nodes;
};

//  {
//    start: [ 'A', 'b' ],
//    A: [ 'c', 'b', 'end' ],
//    b: [ 'A', 'd', 'end' ],
//    c: [ 'A' ],
//    d: [ 'b' ],
//    end: [ 'A', 'b' ]
//  }
const isDuplicate = (node, path) => {
  if (!isUpperCase(node) && path.indexOf(node) !== -1 && isAnyDuplicateSmall(node, path)) return true;
  return false;
};

const isAnyDuplicateSmall = (node, path) => {
    let output = false;
    path.forEach((letter) => {
        if (path.indexOf(letter) !== path.lastIndexOf(letter) && !isUpperCase(letter)) {
            output = true;
        }
    })
    return output;
}
const isUpperCase = (word) => word === word.toUpperCase();

const distinctPaths = (graph) => {
  let paths = 0;
  let path = [];
  const findPath = (node) => {
    path.push(node);
    graph[node].forEach((nextNode) => {
        if (nextNode === "end") {
        path.push(nextNode);
        paths++;
        path.pop();
      } else if (!isDuplicate(nextNode, path)) {
        findPath(nextNode);
      }
    });
    path.pop(node);
  };
  findPath("start");
  return paths;
};

console.log(R.pipe(parsingData, createNodes, distinctPaths)(input));
