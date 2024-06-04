import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Grid from "./Components/Grid/Grid";
import Tutorial from "./Components/Tutorial/Tutorial";
const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [modalPage, setModalPage] = useState(0);
  return (
    <main>
      <Tutorial
        showModal={showModal}
        setShowModal={setShowModal}
        modalPage={modalPage}
        setModalPage={setModalPage}
      ></Tutorial>
      <Header setShowModal={setShowModal} setModalPage={setModalPage}></Header>
      <Grid></Grid>
    </main>
  );
};

export default App;
