import PrintPath from "../Animations/printPath";
import { animate } from "../Animations/animations";
import { clearVisited } from "../clearVisited";
import animateSync from "../animateSync";

export const Djiskstras = async (src, dest, speed) => {
  let path = [];
  let nodesArray = [];
  Djiskstrasutil(src, dest, nodesArray, path);
  if (path.length === 0) {
    alert("Path Not Available");
    return;
  }
  await animate(nodesArray, speed);
  await PrintPath(path);
};
export const Djikstrasync = (src, dest) => {
  clearVisited();
  let path = [];
  let nodesArray = [];
  Djiskstrasutil(src, dest, nodesArray, path);
  animateSync(nodesArray, path);
};
class Cell {
  constructor(i = -1, j = -1, obstacle = false, weight = false) {
    this.cost = Infinity;
    this.parent_i = -1;
    this.parent_j = -1;
    this.i = i;
    this.j = j;
    this.visited = false;
    this.obstacle = obstacle;
    this.weight = weight;
  }
}
const isValid = (r, c, grid) => {
  if (r < 0 || c < 0 || r >= 20 || c >= 60 || grid[r][c].obstacle === true) {
    return false;
  }
  return true;
};
const getCost = (r, c, grid) => {
  return grid[r][c].weight ? 15 : 0;
};
const Djiskstrasutil = (src, dest, nodesArray, path) => {
  let queue = [];
  let arr = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 60 }, (_, j) => {
      const res = document.querySelector(
        `[data-row="${i}"][data-column="${j}"]`
      );
      return new Cell(
        i,
        j,
        res.classList.contains("obstacle"),
        res.classList.contains("weight")
      );
    })
  );
  console.log(arr);
  const start = arr[src.i][src.j];
  start.cost = 0;
  start.parent_i = src.i;
  start.parent_j = src.j;
  queue.push(start);
  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);
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
      // check for all directions
      const directions = [
        [i - 1, j],
        [i + 1, j],
        [i, j + 1],
        [i, j - 1],
      ];
      for (const [ni, nj] of directions) {
        if (isValid(ni, nj, arr)) {
          if (
            arr[ni][nj].cost === Infinity ||
            arr[i][j].cost + getCost(i, j, arr) < arr[ni][nj].cost
          ) {
            arr[ni][nj].parent_i = i;
            arr[ni][nj].parent_j = j;
            arr[ni][nj].cost = arr[i][j].cost + getCost(i, j, arr);
            queue.push(arr[ni][nj]);
          }
        }
      }
    }
  }
};
