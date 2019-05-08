import React, { useState } from "react";
import "./Chessboard.css";

function Chessboard() {
  const bottomNotation = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const handleClick = event => {
    console.log("notation is", getBoardNotation(event.target));
  };
  function getBoardNotation(paramTarget) {
    var chessboard = document.getElementById("chessboard");
    var index = Array.prototype.indexOf.call(chessboard.children, paramTarget);
    var rank;
    var file;

    var rank_arr = [8, 7, 6, 5, 4, 3, 2, 1];
    var file_arr = ["a", "b", "c", "d", "e", "f", "g", "h"];

    rank = rank_arr[Math.floor(index / 8)];
    file = file_arr[index % 8];

    console.log("algebraic notation", file + rank);

    return index;
  }
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
        board_array.push(
          <div
            key={i}
            className={alternateColor(starting_color)}
            onClick={handleClick}
          />
        );
      } else {
        board_array.push(
          <div key={i} className={starting_color} onClick={handleClick} />
        );
      }
    } else {
      if (i % 2) {
        board_array.push(
          <div key={i} className={starting_color} onClick={handleClick} />
        );
      } else {
        board_array.push(
          <div
            key={i}
            className={alternateColor(starting_color)}
            onClick={handleClick}
          />
        );
      }
    }
  }

  return (
    <div id="chessboard">
      {board_array}
      {bottomNotation.map(function(notation, key) {
        return (
          <div key={key} className="bottom-notation">
            {notation}
          </div>
        );
      })}
    </div>
  );
}

export default Chessboard;
