const clearUtil = (classes) => {
  const nodesArray = document.querySelectorAll(".node");
  nodesArray.forEach((item) => {
    classes.forEach((className) => {
      if (item.classList.contains(className)) {
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
