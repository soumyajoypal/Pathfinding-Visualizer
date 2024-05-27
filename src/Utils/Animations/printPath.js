const printPath = async (path) => {
  path.shift();
  path.pop();
  await new Promise((resolve) => setTimeout(resolve, 100));
  for (const item of path) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    await asynchOperation(item);
  }
};

const asynchOperation = async (item) => {
  const res = document.querySelector(
    `[data-row="${item.i}"][data-column="${item.j}"]`
  );
  if (res) {
    res.classList.add("purple");
  }
};

export default printPath;
