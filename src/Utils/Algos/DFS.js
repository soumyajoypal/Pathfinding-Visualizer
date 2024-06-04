import { animate } from "../Animations/animations";
import printPath from "../Animations/printPath";
import { clearVisited } from "../clearFunctions";
import animateSync from "../animateSync";
class Cell {
  constructor(i, j, obstacle) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.obstacle = obstacle;
  }
}
const DFS = async (src, dest, speed) => {
  const path = [];
  let nodesArray = [];
  DFSutil(src, dest, path, nodesArray);
  if (path.length === 0) {
    alert("No path available");
    return;
  }
  await animate(nodesArray, speed);
  await printPath(path);
};
export const DFSsync = (src, dest) => {
  clearVisited();
  const path = [];
  let nodesArray = [];
  DFSutil(src, dest, path, nodesArray);
  animateSync(nodesArray, path);
};
const valid = (i, j, arr) => {
  if (
    i < 0 ||
    j < 0 ||
    i >= 20 ||
    j >= 60 ||
    arr[i][j].obstacle === true ||
    arr[i][j].visited === true
  ) {
    return false;
  }
  return true;
};
const DFSutil = (src, dest, path, nodesArray) => {
  let arr = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 60 }, (_, j) => {
      const res = document.querySelector(
        `[data-row="${i}"][data-column="${j}"]`
      );
      return new Cell(i, j, res.classList.contains("obstacle"));
    })
  );
  const source = arr[src.i][src.j];
  recursiveFunction(source, dest, arr, nodesArray, path);
};
const recursiveFunction = (curr, dest, arr, nodesArray, path) => {
  curr.visited = true;
  let { i, j } = curr;
  path.push({ i, j });
  if (i === dest.i && j === dest.j) {
    nodesArray.pop();
    return true;
  }
  const directions = [
    [i, j + 1],
    [i + 1, j],
    [i - 1, j],
    [i, j - 1],
  ];
  for (const [ni, nj] of directions) {
    if (valid(ni, nj, arr)) {
      nodesArray.push({ i: ni, j: nj });
      if (
        recursiveFunction(arr[ni][nj], dest, arr, nodesArray, path) === true
      ) {
        return true;
      }
    }
  }
  path.pop();
  return false;
};
export default DFS;
