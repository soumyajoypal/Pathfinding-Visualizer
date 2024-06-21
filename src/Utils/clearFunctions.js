import { updateGcObject } from "../Components/Grid/Grid";

const clearUtil = (classes) => {
  const nodesArray = document.querySelectorAll(".node");
  nodesArray.forEach((item) => {
    classes.forEach((className) => {
      if (item.classList.contains(className)) {
        if (className === "obstacle" || className === "weight") {
          const i = parseInt(item.dataset.row);
          const j = parseInt(item.dataset.column);
          updateGcObject(i, j, className, false);
        }
        item.classList.remove(className);
      }
    });
  });
};
export const clearVisited = () => {
  const classes = ["purple", "selected", "blue", "yellow"];
  clearUtil(classes);
};
export const clearAll = () => {
  const classes = [
    "purple",
    "obstacle",
    "selected",
    "blue",
    "yellow",
    "weight",
  ];
  clearUtil(classes);
};
export const clearWeights = () => {
  const classes = ["weight"];
  clearUtil(classes);
};

const find = (i, j, nodesArray) => {
  return nodesArray.some(
    (item) => item.i === parseInt(i) && item.j === parseInt(j)
  );
};

export const clearAsync = (nodesArray, one, two) => {
  const domArray = document.querySelectorAll(".node");
  domArray.forEach((item) => {
    if (item.classList.contains("green") || item.classList.contains("red")) {
      return;
    }
    const i = item.dataset.row;
    const j = item.dataset.column;
    const isInNodesArray = find(i, j, nodesArray);
    if (!isInNodesArray) {
      if (item.classList.contains(one) || item.classList.contains(two)) {
        const option = item.classList.contains(one) ? one : two;
        item.classList.remove(option);
      }
    } else {
      if (!item.classList.contains(one) && !item.classList.contains(two)) {
        item.classList.add(one);
      } else if (item.classList.contains(two)) {
        item.classList.remove(two);
        item.classList.add(one);
      }
    }
  });
};
