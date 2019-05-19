import React, { useState } from "react";
import SideNotation from "./components/side-notation";
import Chessboard from "./components/Chessboard";
import History from "./components/History";
import Store from "./Store";
import "./App.css";

function App() {
  return (
    <Store>
      <div className="App">
        <h1>Chess in Javascript & SCSS</h1>
        <SideNotation />
        <Chessboard />
        <History />
      </div>
    </Store>
  );
}

export default App;
