import React, { useState } from "react";
import "./Tutorial.css";
import { modalData } from "./modalData";
const Tutorial = ({ showModal, setShowModal, modalPage, setModalPage }) => {
  const handleNext = () => {
    if (modalPage === 8) {
      setShowModal(false);
      setModalPage(0);
      return;
    }
    setModalPage((prev) => {
      return prev + 1;
    });
  };
  const handlePrevious = () => {
    setModalPage((prev) => {
      return prev - 1;
    });
  };
  // const { width, height, bottom, top, left } = modalData[modalPage]?.image;
  return (
    <>
      {showModal ? (
        <div
          className="modal-background"
          onClick={() => {
            if (showModal) {
              setShowModal(false);
            }
          }}
        ></div>
      ) : null}
      <div className={`modal ${showModal ? "modal-show" : null}`}>
        <div className="modal-box">
          <div className="modal-title">
            <h1>{modalData[modalPage].heading}</h1>
            <span className="pages">{modalPage + 1}/9</span>
          </div>

          <div className="modal-subtitle">
            <h2>{modalData[modalPage].subheading}</h2>
          </div>
          <div className="modal-text">
            {modalData[modalPage]?.text ? (
              <p>{modalData[modalPage].text}</p>
            ) : (
              <ul className="modal-list">
                {modalData[modalPage].list.map((item, index) => {
                  const { name, type, info } = item;
                  return (
                    <li className="modal-list__items" key={index}>
                      <p>
                        <span>{name}</span>({type}):{info})
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="modal-buttons">
            <button
              onClick={() => {
                setShowModal(false);
              }}
            >
              Skip Tutorial
            </button>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {modalPage >= 1 ? (
                <button onClick={handlePrevious}>Previous</button>
              ) : null}
              <button onClick={handleNext}>
                {modalPage === 8 ? "Finish" : "Next"}
              </button>
            </div>
          </div>

          {modalData[modalPage]?.image && (
            <img
              src={modalData[modalPage].image.img}
              // style={{ bottom, width, height, top }}
              alt=""
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Tutorial;
