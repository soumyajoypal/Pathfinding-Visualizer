import React from "react";
import "./Header.css";
const Header = ({ setShowModal, setModalPage }) => {
  return (
    <div className="header">
      <h1
        onClick={() => {
          setShowModal(true);
          setModalPage(0);
        }}
      >
        Path Finding Visualizer
      </h1>
    </div>
  );
};

export default Header;
