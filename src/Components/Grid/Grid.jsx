import React, { useEffect, useState } from "react";
import "./Grid.css";
import Navbar from "../Navbar/Navbar.jsx";
import { clearAll, clearVisited } from "../../Utils/clearFunctions.js";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const endpointsGenerator = (value) => {
  let i = Math.floor(Math.random() * 20);
  let j = Math.floor(Math.random() * 30);
  if (!value) {
    j += 30;
  }
  return { i, j };
};

// Board Class
class GridClass {
  constructor() {
    this.wall = [];
    this.weight = [];
  }
}

// GLOBAL VARIABLES
let start = false;
let dragStart = { valid: false, el: null };
let wallDrag = false;
let src = endpointsGenerator(1);
let dest = endpointsGenerator(0);
let isWeightActive = false;
let algoSelect = null;
let weightWall = true;
let speed = 4;
let bomb = endpointsGenerator(1);
let flag = null;
export let gc = new GridClass();
export const updateGcObject = (i, j, type, add) => {
  const obj = { i, j };
  if (type === "obstacle") {
    if (add) {
      gc.wall.push(obj);
    } else {
      gc.wall = gc.wall.filter((item) => item.i !== i || item.j !== j);
    }
  } else if (type === "weight") {
    if (add) {
      gc.weight.push(obj);
    } else {
      gc.weight = gc.weight.filter((item) => item.i !== i || item.j !== j);
    }
  }
};

// GRID COMPONENT
const Grid = () => {
  const checkWeightedAlgo = (value) => {
    weightWall = value;
  };
  const handleDragSrcDest = (e) => {
    const choice =
      dragStart.el === "src" ? src : dragStart.el === "dest" ? dest : bomb;
    const res = document.querySelector(
      `[data-row="${choice.i}"][data-column="${choice.j}"]`
    );
    let colorChoice;

    if (
      res.classList.contains("green") ||
      res.classList.contains("red") ||
      res.classList.contains("bomb")
    ) {
      colorChoice =
        dragStart.el === "src"
          ? "green"
          : dragStart.el === "dest"
          ? "red"
          : "bomb";
      res.classList.remove(colorChoice);
      if (algoSelect) {
        colorChoice =
          dragStart.el === "src"
            ? "greenNone"
            : dragStart.el === "dest"
            ? "redNone"
            : "bombNone";
      }
    } else if (
      res.classList.contains("greenNone") ||
      res.classList.contains("redNone") ||
      res.classList.contains("bombNone")
    ) {
      colorChoice =
        dragStart.el === "src"
          ? "greenNone"
          : dragStart.el === "dest"
          ? "redNone"
          : "bombNone";
      res.classList.remove(colorChoice);
      if (!algoSelect) {
        colorChoice =
          dragStart.el === "src"
            ? "green"
            : dragStart.el === "dest"
            ? "red"
            : "bomb";
      }
    }

    e.currentTarget.classList.add(colorChoice);
  };

  const handleMouseOver = (e) => {
    e.preventDefault();
    if (!dragStart.valid && !wallDrag) {
      return;
    }
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.column);
    if (
      (row === src.i && col == src.j) ||
      (row == dest.i && col == dest.j) ||
      (row == bomb.i && col == bomb.j)
    ) {
      return;
    }
    if (!dragStart.valid) {
      const wallOption = isWeightActive === false ? "obstacle" : "weight";
      if (e.currentTarget.classList.contains(wallOption)) {
        e.currentTarget.classList.remove(wallOption);
        updateGcObject(row, col, wallOption, false);
        return;
      }
      if (e.currentTarget.classList.contains("blue")) {
        e.currentTarget.classList.remove("blue");
      }
      if (e.currentTarget.classList.contains("yellow")) {
        e.currentTarget.classList.remove("yellow");
      }
      if (e.currentTarget.classList.contains("selected")) {
        e.currentTarget.classList.remove("selected");
      }
      if (e.currentTarget.classList.contains("purple")) {
        e.currentTarget.classList.remove("purple");
      }
      if (
        wallOption === "obstacle" &&
        e.currentTarget.classList.contains("weight")
      ) {
        e.currentTarget.classList.remove("weight");
        updateGcObject(row, col, "weight", false);
      }
      if (
        wallOption === "weight" &&
        e.currentTarget.classList.contains("obstacle")
      ) {
        e.currentTarget.classList.remove("obstacle");
        updateGcObject(row, col, "obstacle", false);
      }
      e.currentTarget.classList.add(wallOption);
      updateGcObject(row, col, wallOption, true);
      return;
    }
    if (e.currentTarget.classList.contains("weight")) {
      return;
    }
    if (
      !algoSelect &&
      (e.currentTarget.classList.contains("obstacle") ||
        e.currentTarget.classList.contains("weight"))
    ) {
      return;
    }
    if (flag) {
      const el = dragStart.el === "src" ? src : dest;
      const res = document.querySelector(
        `[data-row="${el.i}"][data-column="${el.j}"]`
      );
      res.classList.add(flag);
      updateGcObject(el.i, el.j, flag, true);
      flag = null;
    }
    if (e.currentTarget.classList.contains("obstacle")) {
      const option = "obstacle";
      flag = option;
      e.currentTarget.classList.remove(option);
      updateGcObject(row, col, option, false);
    }
    handleDragSrcDest(e);
    if (dragStart.el === "src") {
      src = { i: row, j: col };
    } else if (dragStart.el === "dest") {
      dest = { i: row, j: col };
    } else {
      bomb = { i: row, j: col };
    }
    if (algoSelect) {
      const syncAlgo = algoSelect?.value.SYNC;
      syncAlgo(src, dest);
    }
  };

  const handleMouseDown = (i, j, e) => {
    if (start) {
      return;
    }
    e.preventDefault();
    if (i === src.i && j === src.j) {
      dragStart = { valid: true, el: "src" };
      return;
    }
    if (i === dest.i && j === dest.j) {
      dragStart = { valid: true, el: "dest" };
      return;
    }
    if (i === bomb.i && j === bomb.j) {
      dragStart = { valid: true, el: "bomb" };
      return;
    }
    wallDrag = true;
  };

  const handleGlobalMouseUp = () => {
    dragStart = { valid: false, el: null };
    wallDrag = false;
  };

  const handleObstacle = (i, j, e) => {
    if (
      (i === src.i && j === src.j) ||
      (i === dest.i && j === dest.j) ||
      (i === bomb.i && j === bomb.j) ||
      (algoSelect && start)
    ) {
      return;
    }
    const res = e.currentTarget.classList;
    if (res.contains("obstacle")) {
      res.remove("obstacle");
      updateGcObject(i, j, "obstacle", false);
      return;
    }
    if (res.contains("weight")) {
      res.remove("weight");
      updateGcObject(i, j, "weight", false);
      return;
    }
    const options = ["purple", "selected", "blue", "yellow"];
    for (const opt of options) {
      if (res.contains(opt)) {
        res.remove(opt);
        res.add("obstacle");
        updateGcObject(i, j, "obstacle", true);
        return;
      }
    }
    if (isWeightActive) {
      res.add("weight");
      updateGcObject(i, j, "weight", true);
      return;
    }
    res.add("obstacle");
    updateGcObject(i, j, "obstacle", true);
  };

  const handleStart = (value) => {
    start = value;
  };

  const handleSpeed = (value) => {
    speed = value;
  };

  const handleSelectedAlgo = async (
    selectedOption,
    setStartCheck,
    bombCheck = false
  ) => {
    if (start || !selectedOption) {
      algoSelect = null;
      return;
    }
    clearVisited();
    start = true;
    setStartCheck(true);
    let algoFunction;
    if (!bombCheck) {
      algoFunction = selectedOption?.value.ASYNC;
    } else {
      algoFunction = selectedOption?.value.BOMB;
    }
    algoSelect = selectedOption;
    setTimeout(async () => {
      if (!bombCheck) {
        await algoFunction(src, dest, speed);
      } else {
        await algoFunction(src, bomb, dest, speed);
      }
      start = false;
      setStartCheck(false);
    }, 500);
  };
  const handleBomb = (value, setBomb) => {
    setBomb(!value);

    if (!value) {
      clearAll();
      bomb = { i: 9, j: 29 };
      const res = document.querySelector(
        `[data-row="${bomb.i}"][data-column="${bomb.j}"]`
      );
      res.classList.add("bomb");
    } else {
      const res = document.querySelector(
        `[data-row="${bomb.i}"][data-column="${bomb.j}"]`
      );
      res.classList.remove("bomb");
    }
  };
  useEffect(() => {
    const handleWeightWall = (e) => {
      if (e.key === "w" && weightWall) {
        isWeightActive = true;
      }
    };
    document.addEventListener("keydown", handleWeightWall);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("keyup", () => {
      isWeightActive = false;
    });
  }, []);

  return (
    <>
      <Navbar
        start={start}
        algoSelect={algoSelect}
        handleSelectedAlgo={handleSelectedAlgo}
        handleStart={handleStart}
        checkWeightedAlgo={checkWeightedAlgo}
        handleSpeed={handleSpeed}
        handleBomb={handleBomb}
      ></Navbar>
      <MemoizedGridContainer
        handleMouseDown={handleMouseDown}
        handleMouseOver={handleMouseOver}
        handleObstacle={handleObstacle}
      ></MemoizedGridContainer>
    </>
  );
};

const GridContainer = ({
  handleObstacle,
  handleMouseDown,
  handleMouseOver,
}) => {
  return (
    <div className="grid-container">
      {Array.from({ length: 20 }, (_, i) => {
        return Array.from({ length: 60 }, (_, j) => {
          const key = `${i}-${j}`;
          return (
            <div key={key} className="node-container">
              <span
                className={`node ${
                  src?.i === i && src?.j == j ? "green" : ""
                } ${dest?.i === i && dest?.j == j ? "red" : ""}`}
                onClick={(e) => {
                  handleObstacle(i, j, e);
                }}
                data-row={i}
                data-column={j}
                onMouseDown={(e) => {
                  handleMouseDown(i, j, e);
                }}
                onMouseEnter={handleMouseOver}
              >
                <FontAwesomeIcon
                  icon={faWeightHanging}
                  className="node-icon"
                ></FontAwesomeIcon>
              </span>
            </div>
          );
        });
      })}
    </div>
  );
};

const MemoizedGridContainer = React.memo(GridContainer);
export default Grid;
