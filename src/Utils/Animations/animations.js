export const animate = async (nodesArray, speed, primary = "selected") => {
  for (const item of nodesArray) {
    const res = document.querySelector(
      `[data-row="${item.i}"][data-column="${item.j}"]`
    );
    res.classList.add(primary);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};
