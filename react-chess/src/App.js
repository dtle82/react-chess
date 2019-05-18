import React from "react";
import SideNotation from "./components/side-notation";
import Chessboard from "./components/Chessboard";
import History from "./components/History";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Chess in Javascript & SCSS</h1>
      <SideNotation />
      <Chessboard />
      <History />
    </div>
  );
}

export default App;
