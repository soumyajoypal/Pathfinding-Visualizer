import React, { useEffect, useState } from "react";
import "./Grid.css";
import Navbar from "../Navbar/Navbar.jsx";
import { clearVisited } from "../../Utils/clearFunctions.js";
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
// GLOBAL VARIABLES
let start = false;
let dragStart = { valid: false, el: null };
let wallDrag = false;
let src = endpointsGenerator(1);
let dest = endpointsGenerator(0);
let isWeightActive = false;
let algoSelect = null;
let weightWall = true;
let speed = 1;

// GRID COMPONENT
const Grid = () => {
  const checkWeightedAlgo = (value) => {
    weightWall = value;
  };
  const handleDragSrcDest = (e) => {
    const choice = dragStart.el === "src" ? src : dest;
    let colorChoice;
    const res = document.querySelector(
      `[data-row="${choice.i}"][data-column="${choice.j}"]`
    );
    if (res.classList.contains("green") || res.classList.contains("red")) {
      colorChoice = dragStart.el === "src" ? "green" : "red";
      if (algoSelect) {
        res.classList.remove(colorChoice);
        colorChoice = dragStart.el === "src" ? "greenNone" : "redNone";
      } else {
        res.classList.remove(colorChoice);
      }
    }
    if (
      res.classList.contains("greenNone") ||
      res.classList.contains("redNone")
    ) {
      colorChoice = dragStart.el === "src" ? "greenNone" : "redNone";
      if (!algoSelect) {
        res.classList.remove(colorChoice);
        colorChoice = dragStart.el === "src" ? "green" : "red";
      } else {
        res.classList.remove(colorChoice);
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
    if ((row === src.i && col == src.j) || (row == dest.i && col == dest.j)) {
      return;
    }
    if (!dragStart.valid) {
      //brute force lekha
      const wallOption = isWeightActive === false ? "obstacle" : "weight";
      if (e.currentTarget.classList.contains(wallOption)) {
        e.currentTarget.classList.remove(wallOption);
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
      }
      if (
        wallOption === "weight" &&
        e.currentTarget.classList.contains("obstacle")
      ) {
        e.currentTarget.classList.remove("obstacle");
      }
      e.currentTarget.classList.add(wallOption);
      return;
    }
    if (
      e.currentTarget.classList.contains("obstacle") ||
      e.currentTarget.classList.contains("weight")
    ) {
      return;
    }
    handleDragSrcDest(e);
    if (dragStart.el === "src") {
      src = { i: row, j: col };
    } else {
      dest = { i: row, j: col };
    }
    if (algoSelect) {
      console.log("sex");
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
      (algoSelect && start)
    ) {
      return;
    }
    const res = e.currentTarget.classList;
    if (res.contains("obstacle")) {
      res.remove("obstacle");
      return;
    }
    if (res.contains("weight")) {
      res.remove("weight");
      return;
    }
    const options = ["purple", "selected", "blue", "yellow"];
    for (const opt of options) {
      if (res.contains(opt)) {
        res.remove(opt);
        res.add("obstacle");
        return;
      }
    }
    if (isWeightActive) {
      res.add("weight");
      return;
    }
    res.add("obstacle");
  };
  const handleStart = (value) => {
    start = value;
  };
  const handleSpeed = (value) => {
    speed = value;
  };
  const handleSelectedAlgo = async (selectedOption, setStartCheck) => {
    if (start || !selectedOption) {
      algoSelect = null;
      return;
    }
    clearVisited();
    start = true;
    setStartCheck(true);
    const algoFunction = selectedOption?.value.ASYNC;
    algoSelect = selectedOption;
    setTimeout(async () => {
      await algoFunction(src, dest, speed);
      start = false;
      setStartCheck(false);
    }, 500);
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
