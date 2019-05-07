import React, { useState } from "react";
import "./side-notation.css";

function side-notation() {
  return (
    <div className="side-notation">
      <h1>Chess in Javascript & SCSS</h1>
      <div id="side-notation" />
      <div id="chessboard" />
      <div id="history">
        <h2>Move History</h2>
      </div>
    </div>
  );
}

export default side-notation;
