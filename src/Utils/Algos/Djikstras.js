import PrintPath from "../Animations/printPath";
import getCurrObj from "../getCurrObjWeighted";
import { create2DArray } from "./DFS";
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
  console.log(path);
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
const Djiskstrasutil = (src, dest, nodesArray, path) => {
  const visited = create2DArray(20, 60);
  let queue = [];
  queue.push({ i: src.i, j: src.j });
  let parent = {};
  let COST = {};
  COST[`${src.i}-${src.j}`] = 0;
  while (queue.length) {
    queue.sort((a, b) => COST[`${a.i}-${a.j}`] - COST[`${b.i}-${b.j}`]);

    let curr = queue.shift();
    let currObj = getCurrObj(curr.i, curr.j, nodesArray);
    if (!visited[curr.i][curr.j] && currObj.valid) {
      visited[curr.i][curr.j] = true;
      if (curr.i === dest.i && curr.j === dest.j) {
        let temp = curr;
        while (temp.i !== src.i || temp.j !== src.j) {
          path.unshift(temp);
          temp = parent[`${temp.i}-${temp.j}`];
        }
        path.unshift(src);
        break;
      }
      if (curr.i - 1 >= 0) {
        if (
          !parent[`${curr.i - 1}-${curr.j}`] ||
          COST[`${curr.i - 1}-${curr.j}`] >
            currObj.cost + COST[`${curr.i}-${curr.j}`]
        ) {
          parent[`${curr.i - 1}-${curr.j}`] = { i: curr.i, j: curr.j };
          COST[`${curr.i - 1}-${curr.j}`] =
            currObj.cost + COST[`${curr.i}-${curr.j}`];
        }
        if (!visited[curr.i - 1][curr.j]) {
          queue.push({ i: curr.i - 1, j: curr.j });
        }
      }
      // Left
      if (curr.j - 1 >= 0) {
        if (
          !parent[`${curr.i}-${curr.j - 1}`] ||
          COST[`${curr.i}-${curr.j - 1}`] >
            currObj.cost + COST[`${curr.i}-${curr.j}`]
        ) {
          parent[`${curr.i}-${curr.j - 1}`] = { i: curr.i, j: curr.j };
          COST[`${curr.i}-${curr.j - 1}`] =
            currObj.cost + COST[`${curr.i}-${curr.j}`];
        }
        if (!visited[curr.i][curr.j - 1]) {
          queue.push({ i: curr.i, j: curr.j - 1 });
        }
      }
      // Right
      if (curr.j + 1 < 60) {
        if (
          !parent[`${curr.i}-${curr.j + 1}`] ||
          COST[`${curr.i}-${curr.j + 1}`] >
            currObj.cost + COST[`${curr.i}-${curr.j}`]
        ) {
          parent[`${curr.i}-${curr.j + 1}`] = { i: curr.i, j: curr.j };
          COST[`${curr.i}-${curr.j + 1}`] =
            currObj.cost + COST[`${curr.i}-${curr.j}`];
        }
        if (!visited[curr.i][curr.j + 1]) {
          queue.push({ i: curr.i, j: curr.j + 1 });
        }
      }
      // Down
      if (curr.i + 1 < 20) {
        if (
          !parent[`${curr.i + 1}-${curr.j}`] ||
          COST[`${curr.i + 1}-${curr.j}`] >
            currObj.cost + COST[`${curr.i}-${curr.j}`]
        ) {
          parent[`${curr.i + 1}-${curr.j}`] = { i: curr.i, j: curr.j };
          COST[`${curr.i + 1}-${curr.j}`] =
            currObj.cost + COST[`${curr.i}-${curr.j}`];
        }
        if (!visited[curr.i + 1][curr.j]) {
          queue.push({ i: curr.i + 1, j: curr.j });
        }
      }
    }
  }
  console.log(COST);
};
