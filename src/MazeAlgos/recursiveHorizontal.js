import { mazeAnimation } from "../Utils/Animations/mazeAnimation";

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
  if (orientation === "H") {
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
    if (currentRow - startRow - 2 > endCol - startCol) {
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
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        currentRow - 2,
        startCol,
        endCol,
        surroundWall,
        "H"
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
    if (currentCol - startCol - 2 < endRow - startRow) {
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        endRow,
        startCol,
        currentCol - 2,
        surroundWall,
        "H"
      );
    } else {
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
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        endRow,
        currentCol + 2,
        endCol,
        surroundWall,
        "H"
      );
    } else {
      recursiveDivisionUtil(
        nodesArray,
        startRow,
        endRow,
        currentCol + 2,
        endCol,
        surroundWall,
        orientation
      );
    }
  }
};

export const recursiveDivisionHorizontal = async () => {
  let nodesArray = [];
  recursiveDivisionUtil(nodesArray, 2, 17, 2, 57, false, "H");
  await mazeAnimation(nodesArray);
};
