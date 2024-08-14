import React from "react";
import "./Info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";

const Info = ({ isWeighted }) => {
  return (
    <div>
      <ul className="info-list">
        <li className="info-item">
          <div
            className="node-box"
            style={{ background: " rgb(15, 218, 32)" }}
          ></div>
          <span>Source</span>
        </li>
        <li className="info-item">
          <div className="node-box" style={{ background: "  #ff1a09" }}></div>
          <span>Destination</span>
        </li>
        <li className="info-item">
          <div
            className="node-box"
            style={{ background: "var(--french-violet)" }}
          ></div>
          <span>Wall Node</span>
        </li>
        <li className="info-item">
          <div
            className="node-box"
            style={{ background: "rgb(62, 49, 3)" }}
          ></div>
          <span>Bomb Node</span>
        </li>
        <li className="info-item">
          <div
            className="node-box"
            style={{
              border: "1px solid rgba(152, 146, 146, 0.718)",
              background: "rgb(254, 255, 255)",
            }}
          ></div>
          <span>Unvisited Node</span>
        </li>
        <li className="info-item">
          <div
            className="node-box weight "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faWeightHanging}
              className="node-icon"
            ></FontAwesomeIcon>
          </div>
          <span
            style={{ textDecoration: !isWeighted ? "line-through" : "none" }}
          >
            Weight Node
          </span>
        </li>
        <li className="info-item">
          <div
            className="node-box"
            style={{ background: "var(--tifanny-blue)" }}
          ></div>{" "}
          <div
            className="node-box"
            style={{ background: "rgb(242, 138, 193)" }}
          ></div>
          <span>Visited Node</span>
        </li>
        <li className="info-item">
          <div className="node-box" style={{ background: "#b8fbb0" }}></div>
          <div className="node-box" style={{ background: " #f7ff8e" }}></div>
          <span>Path Node</span>
        </li>
      </ul>
    </div>
  );
};

export default Info;
