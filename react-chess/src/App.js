import React from "react";
import SideNotation from "./components/side-notation";
import Chessboard from "./components/Chessboard";
import History from "./components/History";
import Store from "./Store";
import "./App.css";

function App() {
  return (
    <Store>
      <div className="App">
        <h1>React Chess</h1>
        <SideNotation />
        <Chessboard />
        <History />
      </div>
    </Store>
  );
}

export default App;
