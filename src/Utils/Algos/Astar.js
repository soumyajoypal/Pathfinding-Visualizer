import PrintPath from "../Animations/printPath";
import { create2DArray } from "./DFS";
import { animate } from "../Animations/animations";
import { clearVisited } from "../clearVisited";
import animateSync from "../animateSync";

const calHeuristic = (curr, dest) => {
  return Math.abs(curr.i - dest.i) + Math.abs(curr.j - dest.j);
};

export const Astar = async (src, dest, speed) => {
  let path = [];
  let nodesArray = [];
  Astarutil(src, dest, nodesArray, path);
  if (path.length === 0) {
    alert("Path Not Available");
    return;
  }
  await animate(nodesArray, speed);
  await PrintPath(path);
};

export const Astarsync = (src, dest) => {
  clearVisited();
  let path = [];
  let nodesArray = [];
  Astarutil(src, dest, nodesArray, path);
  animateSync(nodesArray, path);
};

class Cell {
  constructor(i = -1, j = -1) {
    this.f = Infinity;
    this.g = Infinity;
    this.h = Infinity;
    this.parent_i = -1;
    this.parent_j = -1;
    this.i = i;
    this.j = j;
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

const Astarutil = (src, dest, nodesArray, path) => {
  const visited = create2DArray(20, 60);
  let queue = [];
  const grid = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 60 }, (_, j) => {
      const res = document.querySelector(
        `[data-row="${i}"][data-column="${j}"]`
      );
      return {
        obstacle: res.classList.contains("obstacle"),
        weight: res.classList.contains("weight"),
      };
    })
  );

  let arr = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 60 }, (_, j) => new Cell(i, j))
  );

  let start = arr[src.i][src.j];
  start.f = 0;
  start.g = 0;
  start.h = 0;
  start.parent_i = src.i;
  start.parent_j = src.j;
  queue.push(start);
  while (queue.length > 0) {
    queue.sort((a, b) => a.f - b.f);
    let curr = queue.shift();
    let i = curr.i;
    let j = curr.j;

    if (!visited[i][j]) {
      visited[i][j] = true;
      nodesArray.push({ i: curr.i, j: curr.j });

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
        console.log(path);
        break;
      }

      const neighbors = [
        [i - 1, j], // up
        [i + 1, j], // down
        [i, j - 1], // left
        [i, j + 1], // right
      ];

      for (const [ni, nj] of neighbors) {
        if (isValid(ni, nj, grid)) {
          const gNew = curr.g + getCost(ni, nj, grid);
          const hNew = calHeuristic({ i: ni, j: nj }, dest);
          const fNew = gNew + hNew;

          if (
            !visited[ni][nj] &&
            (arr[ni][nj].f === Infinity || arr[ni][nj].f > fNew)
          ) {
            arr[ni][nj].g = gNew;
            arr[ni][nj].h = hNew;
            arr[ni][nj].f = fNew;
            arr[ni][nj].parent_i = i;
            arr[ni][nj].parent_j = j;
            queue.push(arr[ni][nj]);
          }
        }
      }
    }
  }
  nodesArray.shift();
  nodesArray.pop();
};
