import React from "react";
import SideNotation from "./components/side-notation";
import Chessboard from "./components/Chessboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Chess in Javascript & SCSS</h1>
      <SideNotation />
      <Chessboard />
      <div id="history">
        <h2>Move History</h2>
      </div>
    </div>
  );
}

export default App;
