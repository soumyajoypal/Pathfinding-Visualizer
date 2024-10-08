import React, { useState } from "react";
import "./Navbar.css";
import { BFS, BFSBombsync, BFSbomb } from "../../Utils/Algos/BFS.js";
import { randomWallsGenerator } from "../../Utils/randomWalls";
import DFS, { DFSBomb, DFSBombsync } from "../../Utils/Algos/DFS.js";
import {
  DjikstrasBombsync,
  Djikstrasbomb,
  Djiskstras,
} from "../../Utils/Algos/Djikstras.js";
import { clearAll } from "../../Utils/clearFunctions.js";
import { DFSsync } from "../../Utils/Algos/DFS.js";
import { BFSsync } from "../../Utils/Algos/BFS.js";
import { Djikstrasync } from "../../Utils/Algos/Djikstras.js";
import { clearVisited } from "../../Utils/clearFunctions.js";
import { clearWeights } from "../../Utils/clearFunctions.js";
import { recursiveDivision } from "../../MazeAlgos/recursiveDivision.js";
import { recursiveDivisionHorizontal } from "../../MazeAlgos/recursiveHorizontal.js";
import { recursiveDivisionVertical } from "../../MazeAlgos/recursiveVertical.js";
import {
  AstarBombsync,
  Astarbomb,
  Astarsync,
} from "../../Utils/Algos/Astar.js";
import { Astar } from "../../Utils/Algos/Astar.js";
import {
  GreedyBFS,
  GreedyBFSBombsync,
  GreedyBFSbomb,
} from "../../Utils/Algos/GreedyBfs.js";
import { GreedyBFSsync } from "../../Utils/Algos/GreedyBfs.js";
import Select from "react-select";
import Info from "../Info/Info.jsx";
const ALGO_OPTIONS = [
  {
    value: { ASYNC: BFS, SYNC: BFSsync, BOMB: BFSbomb, BOMBSYNC: BFSBombsync },
    label: "Breadth-First Search",
  },
  {
    value: { ASYNC: DFS, SYNC: DFSsync, BOMB: DFSBomb, BOMBSYNC: DFSBombsync },
    label: "Depth-First Search",
  },
  {
    value: {
      ASYNC: Djiskstras,
      SYNC: Djikstrasync,
      BOMB: Djikstrasbomb,
      BOMBSYNC: DjikstrasBombsync,
    },
    label: "Djikstra's Algorithm",
  },
  {
    value: {
      ASYNC: Astar,
      SYNC: Astarsync,
      BOMB: Astarbomb,
      BOMBSYNC: AstarBombsync,
    },
    label: "A* Algorithm",
  },
  {
    value: {
      ASYNC: GreedyBFS,
      SYNC: GreedyBFSsync,
      BOMB: GreedyBFSbomb,
      BOMBSYNC: GreedyBFSBombsync,
    },
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
  { value: 4, label: "Fast" },
  { value: 25, label: "Medium" },
  { value: 225, label: "Slow" },
];
const Navbar = ({
  handleStart,
  handleSelectedAlgo,
  checkWeightedAlgo,
  handleSpeed,
  handleBomb,
}) => {
  const [startCheck, setStartCheck] = useState(false);
  const [isWeighted, setIsWeighted] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [wallType, setWallType] = useState(null);
  const [speed, setSpeed] = useState(SPEED_OPTIONS[0]);
  const [bomb, setBomb] = useState(false);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "var(--turquoise)"
        : state.isSelected
        ? "var(--turquoise)"
        : null,
      color:
        state.isFocused || state.isSelected
          ? "var(--lapis-lazuli)"
          : "var(--aquamarine)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--aquamarine)",
      "&:hover": {
        color: "var(--picton-blue)",
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
    <>
      <div className="navbar-section">
        <div className="navbar-header">
          <Select
            options={ALGO_OPTIONS}
            placeholder="Algorithms"
            value={null}
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
            className="select-container w-180"
            styles={customStyles}
          ></Select>
          <Select
            options={WALL_OPTIONS}
            placeholder="Mazes and Walls"
            value={null}
            onChange={async (option) => {
              if (!startCheck) {
                handleSelectedAlgo(null);
                if (
                  !isWeighted &&
                  option.value === "weight" &&
                  selectedOption
                ) {
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
            className="select-container w-160 w-sm"
            styles={customStyles}
          ></Select>
          <button
            onClick={() => {
              if (startCheck) {
                return;
              }
              handleBomb(bomb, setBomb);
            }}
            className={`nav-btn`}
          >
            {bomb ? "Remove Bomb" : "Add Bomb"}
          </button>
          <button
            onClick={() => {
              handleSelectedAlgo(selectedOption, setStartCheck, bomb);
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
            className={`nav-btn`}
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
            className={`nav-btn`}
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
              className="select-container w-120"
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
          <>
            <h3>Pick an Algorithm and Visualize It!!!!</h3>{" "}
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
