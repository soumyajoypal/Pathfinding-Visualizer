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
          ></div>
          <span>Visited Node</span>
        </li>
        <li className="info-item">
          <div
            className="node-box"
            style={{ background: "var(--mindaro)" }}
          ></div>
          <span>Path Node</span>
        </li>
      </ul>
     
    </div>
  );
};

export default Info;
