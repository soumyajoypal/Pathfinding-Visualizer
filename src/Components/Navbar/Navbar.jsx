import React, { useState } from "react";
import "./Navbar.css";
import { BFS } from "../../Utils/Algos/BFS.jsx";
import { randomWallsGenerator } from "../../Utils/randomWalls";
import DFS from "../../Utils/Algos/DFS.jsx";
import { Djiskstras } from "../../Utils/Algos/Djikstras.js";
import { clearAll } from "../../Utils/clearFunctions.js";
import { DFSsync } from "../../Utils/Algos/DFS.jsx";
import { BFSsync } from "../../Utils/Algos/BFS.jsx";
import { Djikstrasync } from "../../Utils/Algos/Djikstras.js";
import { clearVisited } from "../../Utils/clearFunctions.js";
import { clearWeights } from "../../Utils/clearFunctions.js";
import { recursiveDivision } from "../../MazeAlgos/recursiveDivision.js";
import { recursiveDivisionHorizontal } from "../../MazeAlgos/recursiveHorizontal.js";
import { recursiveDivisionVertical } from "../../MazeAlgos/recursiveVertical.js";
import { Astarsync } from "../../Utils/Algos/Astar.js";
import { Astar } from "../../Utils/Algos/Astar.js";
import { GreedyBFS } from "../../Utils/Algos/GreedyBfs.js";
import { GreedyBFSsync } from "../../Utils/Algos/GreedyBfs.js";
import Select from "react-select";
import Info from "../Info/Info.jsx";
const ALGO_OPTIONS = [
  { value: { ASYNC: BFS, SYNC: BFSsync }, label: "Breadth-First Search" },
  { value: { ASYNC: DFS, SYNC: DFSsync }, label: "Depth-First Search" },
  {
    value: { ASYNC: Djiskstras, SYNC: Djikstrasync },
    label: "Djikstra's Algorithm",
  },
  {
    value: { ASYNC: Astar, SYNC: Astarsync },
    label: "A* Algorithm",
  },
  {
    value: { ASYNC: GreedyBFS, SYNC: GreedyBFSsync },
    label: "Greedy BFS",
  },
];
const WALL_OPTIONS = [
  { value: "obstacle", label: "Generate Random Wall-Nodes" },
  { value: "weight", label: "Generate Random Weight-Nodes" },
  { value: "maze", label: "Generate Maze" },
  { value: "maze-H", label: "Generate Maze(Horizontal-Skew)" },
  { value: "maze-V", label: "Generate Maze(Vertical-Skew)" },
];
const SPEED_OPTIONS = [
  { value: 0, label: "Fast" },
  { value: 25, label: "Medium" },
  { value: 225, label: "Slow" },
];
const Navbar = ({
  handleStart,
  handleSelectedAlgo,
  checkWeightedAlgo,
  handleSpeed,
}) => {
  const [startCheck, setStartCheck] = useState(false);
  const [isWeighted, setIsWeighted] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [wallType, setWallType] = useState(null);
  const [speed, setSpeed] = useState(SPEED_OPTIONS[0]);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgb(253, 241, 78,0.5)"
        : state.isSelected
        ? "rgb(253, 241, 78)"
        : null,
      color:
        state.isFocused || state.isSelected ? "crimson" : "rgb(253, 241, 78)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "crimson",
      "&:hover": {
        color: "black",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };
  const handleMaze = async (value) => {
    clearAll();
    handleStart(true);
    setStartCheck(true);
    if (value === "maze") await recursiveDivision();
    if (value === "maze-H") await recursiveDivisionHorizontal();
    if (value === "maze-V") await recursiveDivisionVertical();
    handleStart(false);
    setStartCheck(false);
  };
  return (
    <div className="navbar-section">
      <div className="navbar-header">
        <Select
          options={ALGO_OPTIONS}
          placeholder="Select An Algorithm..."
          value={selectedOption}
          onChange={(option) => {
            if (!startCheck) {
              handleSelectedAlgo(null);
              clearVisited();
              if (
                option.label === "Djikstra's Algorithm" ||
                option.label === "A* Algorithm" ||
                option.label === "Greedy BFS"
              ) {
                checkWeightedAlgo(true);
                setIsWeighted(true);
              } else {
                checkWeightedAlgo(false);
                setIsWeighted(false);
                clearWeights();
              }
              setSelectedOption(option);
            }
          }}
          isSearchable={false}
          classNamePrefix="navbar-select"
          className="select-container"
          styles={customStyles}
        ></Select>
        <Select
          options={WALL_OPTIONS}
          placeholder="Mazes and Walls"
          value={null}
          onChange={async (option) => {
            if (!startCheck) {
              handleSelectedAlgo(null);
              if (!isWeighted && option.value === "weight" && selectedOption) {
              } else if (
                option.value === "maze" ||
                option.value === "maze-H" ||
                option.value === "maze-V"
              ) {
                await handleMaze(option.value);
              } else {
                clearAll();
                randomWallsGenerator(option.value);
                setWallType(option);
              }
            }
          }}
          isSearchable={false}
          classNamePrefix="navbar-select"
          className="select-container"
          styles={customStyles}
        ></Select>
        <button
          onClick={() => {
            handleSelectedAlgo(selectedOption, setStartCheck);
          }}
          className={`nav-btn ${startCheck ? "inactive" : null}`}
        >
          {!selectedOption
            ? "Select Algorithm!!"
            : `Visualize ${selectedOption.label}`}
        </button>
        <button
          onClick={() => {
            if (startCheck) {
              return;
            }
            clearAll();
            handleStart(false);
            setStartCheck(false);
            handleSelectedAlgo(null);
          }}
          className={`nav-btn ${startCheck ? "inactive" : null}`}
        >
          Clear All
        </button>
        <button
          onClick={() => {
            if (startCheck) {
              return;
            }
            clearVisited();
            handleStart(false);
            setStartCheck(false);
            handleSelectedAlgo(null);
          }}
          className={`nav-btn ${startCheck ? "inactive" : null}`}
        >
          Clear Visited
        </button>
        <div className="speed-select">
          <span>Speed:</span>
          <Select
            options={SPEED_OPTIONS}
            placeholder="Speed"
            value={speed}
            onChange={(option) => {
              if (!startCheck) {
                handleSpeed(option.value);
                setSpeed(option);
              }
            }}
            isSearchable={false}
            classNamePrefix="navbar-select"
            className="select-container"
            styles={customStyles}
          ></Select>
        </div>
      </div>
      <Info isWeighted={isWeighted}></Info>
      {selectedOption ? (
        <h3>
          {isWeighted
            ? `${selectedOption.label} works on weighted graph`
            : `${selectedOption.label} works on un-weighted graph`}
        </h3>
      ) : (
        <h3>Pick an Algorithm and Visualize It!!!!</h3>
      )}
    </div>
  );
};

export default Navbar;
