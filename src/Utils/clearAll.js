export const clearAll = () => {
  const classes = [
    "purple",
    "obstacle",
    "selected",
    "blue",
    "yellow",
    "weight",
  ];
  const nodesArray = document.querySelectorAll(".node");
  nodesArray.forEach((item) => {
    classes.forEach((className) => {
      if (item.classList.contains(className)) {
        item.classList.remove(className);
      }
    });
  });
};
