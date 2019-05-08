import React, { useState } from "react";
import "./Chessboard.css";

const allPiece = [];
let piece = {
  getMoveset: function() {
    return this.moveset;
  }
};

let black_pawn = Object.create(piece);
Object.assign(black_pawn, {
  name: "black pawn",
  emoji: "♟",
  color: "black",
  moveset: [8, 16]
});
let white_pawn = Object.create(piece);
Object.assign(white_pawn, {
  name: "white pawn",
  emoji: "♙",
  color: "white",
  moveset: [-8, -16]
});
allPiece.push(black_pawn);
allPiece.push(white_pawn);

function Chessboard() {
  const bottomNotation = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const white_position = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
  const white_pawn_position = Array(8).fill("♙");
  const white_combined_position = white_pawn_position.concat(white_position);
  const neutral_positions = Array(4 * 8).fill("");
  const black_position = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
  const black_pawn_position = Array(8).fill("♟");
  const black_combined_position = black_position.concat(black_pawn_position);

  const [squares, setSquares] = useState(
    black_combined_position
      .concat(neutral_positions)
      .concat(white_combined_position)
  );
  const [isSelected, setIsSelected] = useState(Array(64).fill(false));
  const [possibleMoves, setpossibleMoves] = useState(Array(64).fill(false));

  console.log("allPiece", allPiece);
  const handleClick = event => {
    const index = getBoardNotation(event.target);
    const nextSquares = squares.slice();
    nextSquares[index] = squares[index];
    setSquares(nextSquares);

    if (isSelected[index] === false) {
      const nextSelected = Array(64).fill(false);
      nextSelected[index] = true;
      setIsSelected(nextSelected);

      allPiece.forEach(piece => {
        if (piece.emoji === event.target.innerHTML) {
          const nextPossibleMoves = Array(64).fill(false);
          piece.moveset.forEach(idx => {
            nextPossibleMoves[index + idx] = true;
          });
          setpossibleMoves(nextPossibleMoves);
        }
      });
    } else {
      console.log("was already selected!");
    }
  };

  function getBoardNotation(paramTarget) {
    let chessboard = document.getElementById("chessboard");
    let index = Array.prototype.indexOf.call(chessboard.children, paramTarget);
    let rank;
    let file;

    let rank_arr = [8, 7, 6, 5, 4, 3, 2, 1];
    let file_arr = ["a", "b", "c", "d", "e", "f", "g", "h"];

    rank = rank_arr[Math.floor(index / 8)];
    file = file_arr[index % 8];

    console.log("algebraic notation", file + rank);

    return index;
  }
  function isOdd(num) {
    return num % 2;
  }
  function alternateColor(color) {
    if (color === "black") {
      color = "white";
    } else {
      color = "black";
    }
    return color;
  }
  const board_array = [];
  console.log("possibleMoves", possibleMoves);
  for (var i = 0; i <= 63; i++) {
    var starting_color = "black";
    var quotient = Math.floor(i / 8);
    if (isOdd(quotient)) {
      if (i % 2) {
        board_array.push(
          <div
            key={i}
            className={
              alternateColor(starting_color) +
              " " +
              (isSelected[i] ? "selected" : "") +
              " " +
              (possibleMoves[i] ? "black-moves" : "")
            }
            onClick={handleClick}
          >
            {squares[i]}
          </div>
        );
      } else {
        board_array.push(
          <div
            key={i}
            className={
              starting_color +
              " " +
              (isSelected[i] ? "selected" : "") +
              " " +
              (possibleMoves[i] ? "black-moves" : "")
            }
            onClick={handleClick}
          >
            {squares[i]}
          </div>
        );
      }
    } else {
      if (i % 2) {
        board_array.push(
          <div
            key={i}
            className={
              starting_color +
              " " +
              (isSelected[i] ? "selected" : "") +
              " " +
              (possibleMoves[i] ? "black-moves" : "")
            }
            onClick={handleClick}
          >
            {squares[i]}
          </div>
        );
      } else {
        board_array.push(
          <div
            key={i}
            className={
              alternateColor(starting_color) +
              " " +
              (isSelected[i] ? "selected" : "") +
              " " +
              (possibleMoves[i] ? "black-moves" : "")
            }
            onClick={handleClick}
          >
            {squares[i]}
          </div>
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
