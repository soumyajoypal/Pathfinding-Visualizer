import getCurrObj from "../getCurrObj";
import { animate } from "../Animations/animations";
import printPath from "../Animations/printPath";
import { clearVisited } from "../clearFunctions";
import animateSync from "../animateSync";

export const create2DArray = (rows, columns) => {
  return Array.from({ length: rows }, () => Array(columns).fill(false));
};

const DFS = async (src, dest, speed) => {
  const visited = create2DArray(20, 60);
  const path = [];
  let nodesArray = [];
  const source = getCurrObj(src.i, src.j, nodesArray);
  const destination = getCurrObj(dest.i, dest.j, nodesArray);

  DFSutil(source, destination, visited, path, nodesArray);
  if (path.length === 0) {
    alert("No path available");
    return;
  }
  await animate(nodesArray, speed);
  await printPath(path);
};
export const DFSsync = (src, dest) => {
  clearVisited();
  const visited = create2DArray(20, 60);
  const path = [];
  let nodesArray = [];
  const source = getCurrObj(src.i, src.j, nodesArray);
  const destination = getCurrObj(dest.i, dest.j, nodesArray);
  DFSutil(source, destination, visited, path, nodesArray);
  animateSync(nodesArray, path);
};
const DFSutil = (curr, dest, visited, path, nodesArray) => {
  if (!curr || visited[curr.i][curr.j] || !curr.valid) {
    return false;
  }

  visited[curr.i][curr.j] = true;

  if (curr.i === dest.i && curr.j === dest.j) {
    path.push(curr);
    return true;
  }

  path.push(curr);

  if (
    DFSutil(
      getCurrObj(curr.i, curr.j + 1, nodesArray),
      dest,
      visited,
      path,
      nodesArray
    )
  )
    return true;
  if (
    DFSutil(
      getCurrObj(curr.i + 1, curr.j, nodesArray),
      dest,
      visited,
      path,
      nodesArray
    )
  )
    return true;
  if (
    DFSutil(
      getCurrObj(curr.i - 1, curr.j, nodesArray),
      dest,
      visited,
      path,
      nodesArray
    )
  )
    return true;
  if (
    DFSutil(
      getCurrObj(curr.i, curr.j - 1, nodesArray),
      dest,
      visited,
      path,
      nodesArray
    )
  )
    return true;

  path.pop();
  return false;
};

export default DFS;
