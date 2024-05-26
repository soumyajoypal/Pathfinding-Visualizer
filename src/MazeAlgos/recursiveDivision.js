//imp code(can help a lot)
const recursiveDivisionUtil = (
  nodesArray,
  startRow,
  endRow,
  startCol,
  endCol,
  surroundWall,
  orientation
) => {
  if (endRow < startRow || endCol < startCol) {
    return;
  }
  //   the surrounding walls
  if (!surroundWall) {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 60; j++) {
        if (i == 0 || i == 19 || j == 0 || j == 59) {
          nodesArray.push({ i, j });
        }
      }
    }
    surroundWall = true;
  }
  //   now main logic of recursive division(partition)
  if (orientation === "H") {
    //choosing the wall row and column along with passage
    let prows = [];
    for (let i = startRow; i <= endRow; i += 2) {
      prows.push(i);
    }
    let pcols = [];
    for (let i = startCol - 1; i <= endCol + 1; i += 2) {
      pcols.push(i);
    }
    let currentRow = prows[Math.floor(Math.random() * prows.length)];
    let randomCol = pcols[Math.floor(Math.random() * pcols.length)];
    for (let j = startCol - 1; j <= endCol + 1; j++) {
      if (j !== randomCol) {
        nodesArray.push({ i: currentRow, j });
      }
    }
    //recursive calls
    if (currentRow - startRow - 2 > endCol - startCol) {
      //top section horizontal cut(wall)
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        currentRow - 2,
        startCol,
        endCol,
        surroundWall,
        orientation
      );
    } else {
      //top section vertical cut(wall)
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        currentRow - 2,
        startCol,
        endCol,
        surroundWall,
        "V"
      );
    }
    if (endRow - (currentRow + 2) > endCol - startCol) {
      //bottom section horizontal cut
      recursiveDivisionUtil(
        nodesArray,
        currentRow + 2,
        endRow,
        startCol,
        endCol,
        surroundWall,
        orientation
      );
    } else {
      // bottom section vertical cut
      recursiveDivisionUtil(
        nodesArray,
        currentRow + 2,
        endRow,
        startCol,
        endCol,
        surroundWall,
        "V"
      );
    }
  } else {
    //choosing the wall row and column along with passage
    let pcols = [];
    for (let i = startCol; i <= endCol; i += 2) {
      pcols.push(i);
    }
    let prows = [];
    for (let i = startRow - 1; i <= endRow + 1; i += 2) {
      prows.push(i);
    }
    let randomRow = prows[Math.floor(Math.random() * prows.length)];
    let currentCol = pcols[Math.floor(Math.random() * pcols.length)];
    for (let i = startRow - 1; i <= endRow + 1; i++) {
      if (i !== randomRow) {
        nodesArray.push({ i, j: currentCol });
      }
    }
    //recursive calls
    if (currentCol - startCol - 2 < endRow - startRow) {
      //left section vertical cut(wall)
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        endRow,
        startCol,
        currentCol - 2,
        surroundWall,
        orientation
      );
    } else {
      //left section horizontal cut(wall)
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        endRow,
        startCol,
        currentCol - 2,
        surroundWall,
        "H"
      );
    }
    if (endCol - (currentCol + 2) < endRow - startRow) {
      //right section vertical cut
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        endRow,
        currentCol + 2,
        endCol,
        surroundWall,
        orientation
      );
    } else {
      // right section horizontal cut
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        endRow,
        currentCol + 2,
        endCol,
        surroundWall,
        "H"
      );
    }
  }
};
const mazeAnimation = async (nodesArray) => {
  for (const node of nodesArray) {
    const cell = document.querySelector(
      `[data-row="${node.i}"][data-column="${node.j}"]`
    );
    await new Promise((resolve) => setTimeout(resolve, 2));
    if (!cell.classList.contains("green") && !cell.classList.contains("red")) {
      cell.classList.add("obstacle");
    }
  }
};
export const recursiveDivision = async () => {
  let nodesArray = [];
  recursiveDivisionUtil(nodesArray, 2, 17, 2, 57, false, "H");
  await mazeAnimation(nodesArray);
};
