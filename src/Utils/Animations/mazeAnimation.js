import { updateGcObject } from "../../Components/Grid/Grid";
export const mazeAnimation = async (nodesArray) => {
  for (const node of nodesArray) {
    const cell = document.querySelector(
      `[data-row="${node.i}"][data-column="${node.j}"]`
    );
    await new Promise((resolve) => setTimeout(resolve, 2));
    if (
      !cell.classList.contains("green") &&
      !cell.classList.contains("red") &&
      !cell.classList.contains("greenNone") &&
      !cell.classList.contains("redNone")
    ) {
      cell.classList.add("obstacle");
      updateGcObject(node.i, node.j, "obstacle", true);
    }
  }
};
