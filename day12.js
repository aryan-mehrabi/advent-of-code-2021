const R = require("ramda");

const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

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
      if(node === "end") {delete nodes[node]}
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

const distinctPaths = (graph) => {
    const paths = [];
    let path = [];
    const path = (node) => {
        path.push(node);
        graph[node].forEach(node => {
            if (path[path.length - 1] !== "end") {
                paths.push(path);
                path = []
                return
            }
            else if ( !isDuplicate(path, node) ) {
                path(node)
            }
        })
    }
}
 console.log(createNodes(parsingData(input)));
