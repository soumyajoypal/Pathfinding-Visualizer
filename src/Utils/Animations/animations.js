export const animate = async (nodesArray, speed, primary = "selected") => {
  for (const item of nodesArray) {
    const res = document.querySelector(
      `[data-row="${item.i}"][data-column="${item.j}"]`
    );
    if (
      res.classList.contains("green") ||
      res.classList.contains("greenNone") ||
      res.classList.contains("red") ||
      res.classList.contains("redNone")
    ) {
      continue;
    }
    const classes = ["selected2", "selected"];
    classes.forEach((item) => {
      if (res.classList.contains(item)) {
        res.classList.remove(item);
      }
    });
    res.classList.add(primary);
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};
