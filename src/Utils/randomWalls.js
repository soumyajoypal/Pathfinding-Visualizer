const clearWalls = (nodesArray) => {
  nodesArray.forEach((item) => {
    item.classList.remove("obstacle");
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
    res.classList.contains("weight")
  ) {
    return;
  }
  res.classList.add(type);
};
