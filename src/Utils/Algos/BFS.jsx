import PrintPath from "../Animations/printPath";
import getCurrObj from "../getCurrObj";
import { create2DArray } from "./DFS";
import { animate } from "../Animations/animations";
import { clearVisited } from "../clearFunctions";
import animateSync from "../animateSync";

export const BFS = async (src, dest, speed) => {
  let path = [];
  let nodesArray = [];
  BFSutil(src, dest, nodesArray, path);
  if (path.length === 0) {
    alert("Path Not Available");
    return;
  }
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
const BFSutil = (src, dest, nodesArray, path) => {
  const visited = create2DArray(20, 60);
  let queue = [];
  getCurrObj(src.i, src.j, nodesArray);
  queue.push({ i: src.i, j: src.j });
  let parent = {};
  while (queue.length) {
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
      // Explore neighbors
      // Top
      if (curr.i - 1 >= 0 && !visited[curr.i - 1][curr.j]) {
        queue.push({ i: curr.i - 1, j: curr.j });
        parent[`${curr.i - 1}-${curr.j}`] = { i: curr.i, j: curr.j };
      }
      // Left
      if (curr.j - 1 >= 0 && !visited[curr.i][curr.j - 1]) {
        queue.push({ i: curr.i, j: curr.j - 1 });
        parent[`${curr.i}-${curr.j - 1}`] = { i: curr.i, j: curr.j };
      }
      // Right
      if (curr.j + 1 < 60 && !visited[curr.i][curr.j + 1]) {
        queue.push({ i: curr.i, j: curr.j + 1 });
        parent[`${curr.i}-${curr.j + 1}`] = { i: curr.i, j: curr.j };
      }
      // Down
      if (curr.i + 1 < 20 && !visited[curr.i + 1][curr.j]) {
        queue.push({ i: curr.i + 1, j: curr.j });
        parent[`${curr.i + 1}-${curr.j}`] = { i: curr.i, j: curr.j };
      }
    }
  }
};
