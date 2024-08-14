const printPath = async (path, primary = "purple") => {
  path.shift();
  path.pop();
  await new Promise((resolve) => setTimeout(resolve, 100));
  for (const item of path) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    await asynchOperation(item, primary);
  }
  await new Promise((resolve) => setTimeout(resolve, 50));
};

const asynchOperation = async (item, primary) => {
  const res = document.querySelector(
    `[data-row="${item.i}"][data-column="${item.j}"]`
  );
  if (
    res.classList.contains("red") ||
    res.classList.contains("redNone") ||
    res.classList.contains("green") ||
    res.classList.contains("greenNone")
  ) {
    return;
  }
  if (res.classList.contains("path2")) {
    res.classList.remove("path2");
  }
  if (res) {
    res.classList.add(primary);
  }
};

export default printPath;
