import PrintPath from "../Animations/printPath";
import { animate } from "../Animations/animations";
import { gc } from "../../Components/Grid/Grid";
import { clearAsync } from "../clearFunctions";

export const Djiskstras = async (src, dest, speed) => {
  let path = [];
  let nodesArray = [];
  Djikstrasutil(src, dest, nodesArray, path);
  if (path.length === 0) {
    alert("Path to Destination Node not available");
    return;
  }
  await animate(nodesArray, speed);
  await PrintPath(path);
};
export const Djikstrasync = (src, dest) => {
  let path = [];
  let nodesArray = [];
  Djikstrasutil(src, dest, nodesArray, path);
  clearAsync(nodesArray, "blue", "selected");
  clearAsync(path, "yellow", "purple");
};
export const Djikstrasbomb = async (src, bomb, dest, speed) => {
  let path1 = [];
  let path2 = [];
  let nodesArray1 = [];
  let nodesArray2 = [];
  Djikstrasutil(src, bomb, nodesArray1, path1);
  Djikstrasutil(bomb, dest, nodesArray2, path2);
  if (path1.length === 0) {
    alert("Path to Bomb Node Not Available");
    return;
  }
  if (path2.length === 0) {
    alert("Path to Destination Node Not Available");
    return;
  }
  await animate(nodesArray1, speed, "selected2");
  await new Promise((resolve) => setTimeout(resolve, 80));
  await animate(nodesArray2, speed);
  await PrintPath(path1, "path2");
  await PrintPath(path2);
};
export const DjikstrasBombsync = (src, bomb, dest) => {
  let path1 = [];
  let path2 = [];
  let nodesArray1 = [];
  let nodesArray2 = [];
  Djikstrasutil(src, bomb, nodesArray1, path1);
  Djikstrasutil(bomb, dest, nodesArray2, path2);
  clearAsync(nodesArray1, "violet", "selected2");
  clearAsync(nodesArray2, "blue", "selected");
  clearAsync(path1, "yellow2", "path2");
  clearAsync(path2, "yellow", "purple");
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
  return grid[r][c].weight ? 15 : 1;
};
const Djikstrasutil = (src, dest, nodesArray, path) => {
  let queue = [];
  let arr = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 60 }, (_, j) => {
      const wall = gc.wall.find((item) => item.i === i && item.j === j);
      const weight = gc.weight.find((item) => item.i === i && item.j === j);
      const isNotObstacle = wall !== undefined;
      const isNotWeight = weight !== undefined;
      return new Cell(i, j, isNotObstacle, isNotWeight);
    })
  );

  const start = arr[src.i][src.j];
  start.cost = 1;
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
