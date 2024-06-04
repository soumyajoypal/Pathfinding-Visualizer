import PrintPath from "../Animations/printPath";
import { animate } from "../Animations/animations";
import { clearVisited } from "../clearFunctions";
import animateSync from "../animateSync";

class Cell {
  constructor(i, j, obstacle) {
    this.i = i;
    this.j = j;
    this.parent_i = -1;
    this.parent_j = -1;
    this.visited = false;
    this.obstacle = obstacle;
  }
}

export const BFS = async (src, dest, speed) => {
  let path = [];
  let nodesArray = [];
  BFSutil(src, dest, nodesArray, path);
  console.log(nodesArray);
  await animate(nodesArray, speed);
  await PrintPath(path);
};
export const BFSsync = (src, dest) => {
  clearVisited();
  let path = [];
  let nodesArray = [];
  BFSutil(src, dest, nodesArray, path);
  animateSync(nodesArray, path);
};
const isValid = (r, c, grid) => {
  if (
    r < 0 ||
    c < 0 ||
    r >= 20 ||
    c >= 60 ||
    grid[r][c].obstacle === true ||
    grid[r][c].visited === true
  ) {
    return false;
  }
  return true;
};
const BFSutil = (src, dest, nodesArray, path) => {
  let queue = [];
  let arr = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 60 }, (_, j) => {
      const res = document.querySelector(
        `[data-row="${i}"][data-column="${j}"]`
      );
      return new Cell(i, j, res.classList.contains("obstacle"));
    })
  );
  const start = arr[src.i][src.j];
  start.parent_i = src.i;
  start.parent_j = src.j;
  queue.push(start);
  while (queue.length > 0) {
    const curr = queue.shift();
    let { i, j } = curr;
    if (!arr[i][j].visited) {
      arr[i][j].visited = true;
      if (i === dest.i && j === dest.j) {
        while (!(i === src.i && j === src.j)) {
          path.push({ i, j });
          const temp_i = arr[i][j].parent_i;
          const temp_j = arr[i][j].parent_j;
          i = temp_i;
          j = temp_j;
        }
        path.push(src);
        path.reverse();
        return;
      }
      if (start.i !== i || start.j !== j) {
        nodesArray.push({ i, j });
      }
      const directions = [
        [i - 1, j],
        [i + 1, j],
        [i, j + 1],
        [i, j - 1],
      ];
      for (const [ni, nj] of directions) {
        if (isValid(ni, nj, arr)) {
          arr[ni][nj].parent_i = i;
          arr[ni][nj].parent_j = j;
          queue.push(arr[ni][nj]);
        }
      }
    }
  }
};
