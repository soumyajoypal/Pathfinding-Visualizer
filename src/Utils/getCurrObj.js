const getCurrObj = (i, j, nodesArray) => {
  if (i < 0 || j < 0 || i === 20 || j === 60) {
    return;
  }
  const res = document.querySelector(`[data-row="${i}"][data-column="${j}"]`);
  if (
    !res.classList.contains("red") &&
    !res.classList.contains("redNone") &&
    !res.classList.contains("green") &&
    !res.classList.contains("greenNone") &&
    !res.classList.contains("obstacle")
  ) {
    nodesArray.push({ i, j });
  }
  const valid =
    !res.classList.contains("obstacle") && !res.classList.contains("weight");
  const row = parseInt(res.dataset.row, 10);
  const column = parseInt(res.dataset.column, 10);

  return { i: row, j: column, valid };
};
export default getCurrObj;
