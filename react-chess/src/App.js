import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Chess in Javascript & SCSS</h1>
      <div id="side-notation" />
      <div id="chessboard" />
      <div id="history">
        <h2>Move History</h2>
      </div>
    </div>
  );
}

export default App;
