const mazeAnimation = async (nodesArray) => {
  for (const node of nodesArray) {
    const cell = document.querySelector(
      `[data-row="${node.i}"][data-column="${node.j}"]`
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    cell.classList.add("obstacle");
  }
};
const chooseOrientation = (width, height) => {
  if (width < height) {
    return "H";
  }
  if (height < width) {
    return "V";
  }
  return Math.random() < 0.5 ? "H" : "V";
};

const recursiveDivision = () => {
  let nodesArray = [];
  divide(nodesArray, 1, 1, 58, 18, chooseOrientation(58, 18));
  mazeAnimation(nodesArray);
};

const divide = (nodesArray, x, y, width, height, orientation) => {
  if (width < 2 || height < 2) {
    return; // base case
  }

  const horizontal = orientation === "H";
  // Wall formation
  let wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
  let wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);

  // Passage formation
  const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
  const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));

  // Direction counter for wall
  let dx = horizontal ? 1 : 0;
  let dy = horizontal ? 0 : 1;
  const length = horizontal ? width : height;

  // Putting this info in nodesArray
  for (let k = 0; k < length; k++) {
    if (wx != px || wy != py) {
      nodesArray.push({ i: wy, j: wx });
    }
    wx += dx;
    wy += dy;
  }

  // Recursive step
  const nx = x;
  const ny = y;
  const w = horizontal ? width : wx - x + 1;
  const h = horizontal ? wy - y + 1 : height;

  divide(nodesArray, nx, ny, w, h, chooseOrientation(w, h));

  const nx2 = horizontal ? x : wx + 1;
  const ny2 = horizontal ? wy + 1 : y;
  const w2 = horizontal ? width : x + width - wx - 1;
  const h2 = horizontal ? y + height - wy - 1 : height;

  divide(nodesArray, nx2, ny2, w2, h2, chooseOrientation(w2, h2));
  return;
};

// Call the recursiveDivision function to generate the maze
// recursiveDivision();
