import PrintPath from "../Animations/printPath";
import { animate } from "../Animations/animations";
import { clearVisited } from "../clearVisited";
import animateSync from "../animateSync";
const calHeuristic = (curr, dest, weight) => {
  return Math.abs(curr.i - dest.i) + Math.abs(curr.j - dest.j) + weight;
};

export const GreedyBFS = async (src, dest, speed) => {
  let path = [];
  let nodesArray = [];
  greedyBFSUtil(src, dest, nodesArray, path);
  if (path.length === 0) {
    alert("Path Not Available");
    return;
  }
  await animate(nodesArray, speed);
  await PrintPath(path);
};

export const GreedyBFSsync = (src, dest) => {
  clearVisited();
  let path = [];
  let nodesArray = [];
  greedyBFSUtil(src, dest, nodesArray, path);
  animateSync(nodesArray, path);
};

class Cell {
  constructor(i = -1, j = -1, obstacle, weight) {
    this.h = Infinity;
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

const greedyBFSUtil = (src, dest, nodesArray, path) => {
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

  let start = arr[src.i][src.j];
  start.h = calHeuristic(src, dest);
  start.parent_i = src.i;
  start.parent_j = src.j;
  queue.push(start);

  while (queue.length > 0) {
    queue.sort((a, b) => a.h - b.h);
    let curr = queue.shift();
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
        break;
      }
      if (start.i !== i || start.j !== j) {
        nodesArray.push({ i, j });
      }
      const neighbors = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
      ];

      for (const [ni, nj] of neighbors) {
        if (isValid(ni, nj, arr)) {
          const hNew = calHeuristic(
            { i: ni, j: nj },
            dest,
            getCost(ni, nj, arr)
          );

          if (arr[ni][nj].h === Infinity || arr[ni][nj].h > hNew) {
            arr[ni][nj].h = hNew;
            arr[ni][nj].parent_i = i;
            arr[ni][nj].parent_j = j;
            queue.push(arr[ni][nj]);
          }
        }
      }
    }
  }
};
