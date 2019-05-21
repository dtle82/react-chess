import React from "react";
import SideNotation from "./components/side-notation";
import Chessboard from "./components/Chessboard";
import Sideinfo from "./components/Sideinfo";
import Store from "./Store";
import "./App.css";

function App() {
  return (
    <Store>
      <div className="App">
        <h1>React Chess</h1>
        <SideNotation />
        <Chessboard />
        <Sideinfo />
      </div>
    </Store>
  );
}

export default App;
