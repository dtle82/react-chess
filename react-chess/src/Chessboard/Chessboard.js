import React, { useState } from "react";
import "./Chessboard.css";

function Chessboard() {
  const bottomNotation = ["a", "b", "c", "d", "e", "f", "g", "h"];
  function isOdd(num) {
    return num % 2;
  }
  function alternateColor(color) {
    var color;
    if (color == "black") {
      color = "white";
    } else {
      color = "black";
    }
    return color;
  }
  const board_array = [];
  for (var i = 0; i <= 63; i++) {
    var starting_color = "black";
    var quotient = Math.floor(i / 8);
    if (isOdd(quotient)) {
      if (i % 2) {
        board_array.push(<div className={alternateColor(starting_color)} />);
      } else {
        board_array.push(<div className={starting_color} />);
      }
    } else {
      if (i % 2) {
        board_array.push(<div className={starting_color} />);
      } else {
        board_array.push(<div className={alternateColor(starting_color)} />);
      }
    }
  }

  return (
    <div className="Chessboard">
      <div id="chessboard">
        {board_array}
        {bottomNotation.map(function(notation) {
          return <div className="bottom-notation">{notation}</div>;
        })}
      </div>
    </div>
  );
}

export default Chessboard;
