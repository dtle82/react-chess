import React from "react";
import SideNotation from "./components/Side-Notation";
import Chessboard from "./components/Chessboard";
import Sideinfo from "./components/Sideinfo";
import Store from "./Store";
import "./App.css";

function App() {
  return (
    <Store>
      <div className="App">
        <h1>React Chess</h1>
        <div className="grid-container">
          <div className="grid-item">
            <SideNotation />
            <Chessboard />
          </div>
          <div className="grid-item">
            <Sideinfo />
          </div>
        </div>
      </div>
    </Store>
  );
}

export default App;
