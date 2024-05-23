export const clearVisited = () => {
  const classes = ["purple", "selected", "blue", "yellow"];
  const nodesArray = document.querySelectorAll(".node");
  nodesArray.forEach((item) => {
    classes.forEach((className) => {
      if (item.classList.contains(className)) {
        item.classList.remove(className);
      }
    });
  });
};
