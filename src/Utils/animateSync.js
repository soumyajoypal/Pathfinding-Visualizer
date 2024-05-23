const animateSync = async (nodesArray, path) => {
  for (const item of nodesArray) {
    const res = document.querySelector(
      `[data-row="${item.i}"][data-column="${item.j}"]`
    );
    res.classList.add("blue");
  }
  path.shift();
  path.pop();
  for (const item of path) {
    const res = document.querySelector(
      `[data-row="${item.i}"][data-column="${item.j}"]`
    );
    res.classList.add("yellow");
  }
};
export default animateSync;
