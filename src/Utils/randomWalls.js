import { updateGcObject } from "../Components/Grid/Grid";

const clearWalls = (nodesArray) => {
  nodesArray.forEach((item) => {
    const type = item.classList.contains("obstacle") ? "obstacle" : "weight";
    const i = parseInt(item.dataset.row);
    const j = parseInt(item.dataset.column);
    updateGcObject(i, j, type, false);
    item.classList.remove(type);
  });
};
export const randomWallsGenerator = (type) => {
  const nodesArray = document.querySelectorAll(".obstacle, .weight");
  if (nodesArray.length !== 0) {
    clearWalls(nodesArray);
  }
  const totalNumber = Math.floor(Math.random() * 251) + 50;
  for (let i = 0; i < totalNumber; i++) {
    randomCell(type);
  }
};
const randomCell = (type) => {
  const i = Math.floor(Math.random() * 20);
  const j = Math.floor(Math.random() * 60);
  const res = document.querySelector(`[data-row="${i}"][data-column="${j}"]`);
  if (
    res.classList.contains("red") ||
    res.classList.contains("green") ||
    res.classList.contains("obstacle") ||
    res.classList.contains("weight") ||
    res.classList.contains("redNone") ||
    res.classList.contains("greenNone")
  ) {
    return;
  }
  res.classList.add(type);
  updateGcObject(i, j, type, true);
};
