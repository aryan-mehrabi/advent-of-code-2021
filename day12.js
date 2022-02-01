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

const createGraph = (arr) => {
  const graph = {};

  arr.forEach((nodes) => {
    nodes.forEach((node, j) => {
      if (node === "end" || (nodes[j + 1] || nodes[j - 1]) === "start") return;

      if (!graph[node]) {
        graph[node] = [nodes[j + 1] || nodes[j - 1]];
      } else {
        graph[node].push(nodes[j + 1] || nodes[j - 1]);
      }
    });
  });
  return graph;
};

const isDuplicate = (node, path) => {
  if (
    !isUpperCase(node) &&
    path.indexOf(node) !== -1 &&
    isAnyDuplicateSmall(path)
  )
    return true;
  return false;
};

const isAnyDuplicateSmall = (path) => {
  let output = false;
  path.forEach((letter) => {
    if (
      path.indexOf(letter) !== path.lastIndexOf(letter) &&
      !isUpperCase(letter)
    ) {
      output = true;
    }
  });
  return output;
};
const isUpperCase = (word) => word === word.toUpperCase();

const distinctPaths = (graph) => {
  let paths = 0;
  let path = [];

  const findPath = (node) => {
    path.push(node);
    graph[node].forEach((nextNode) => {
      if (nextNode === "end") paths++;
      else if (!isDuplicate(nextNode, path)) findPath(nextNode);
    });
    path.pop(node);
  };
  findPath("start");
  return paths;
};

console.log(R.pipe(parsingData, createGraph, distinctPaths)(input));
