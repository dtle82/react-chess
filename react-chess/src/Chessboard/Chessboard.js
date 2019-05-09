import React, { useState } from "react";
import {
  getBoardNotation,
  isOdd,
  alternateColor,
  factory_piece
} from "../helpers.js";

const allPiece = [];

const bottomNotation = ["a", "b", "c", "d", "e", "f", "g", "h"];

const white_position = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
const white_pawn_position = Array(8).fill("♙");
const white_combined_position = white_pawn_position.concat(white_position);
const neutral_positions = Array(4 * 8).fill("");
const black_position = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
const black_pawn_position = Array(8).fill("♟");
const black_combined_position = black_position.concat(black_pawn_position);

black_pawn_position.forEach((pawn, idx) => {
  allPiece.push(factory_piece("pawn", "♟", "black", [8, 16], idx + 8, [], []));
});
white_pawn_position.forEach((pawn, idx) => {
  allPiece.push(
    factory_piece("pawn", "♙", "white", [-8, -16], idx + 48, [], [])
  );
});

function Chessboard() {
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
        if (piece.getLocation() === index) {
          const nextPossibleMoves = Array(64).fill(false);
          piece.validate();
          piece.getMoveset().forEach(idx => {
            // checks if possible square already has a value
            if (!nextSquares[index + idx]) {
              nextPossibleMoves[index + idx] = true;
            }
          });
          piece.getCaptureSet().forEach(idx => {
            // checks if possible square already has a value for pawn capture
            if (nextSquares[index + idx]) {
              nextPossibleMoves[index + idx] = true;
            }
          });
          setpossibleMoves(nextPossibleMoves);
        }
      });
    }
    if (possibleMoves[index]) {
      const nextSquares = squares.slice();
      const currentSelected = Array.prototype.indexOf.call(isSelected, true);
      nextSquares[currentSelected] = false;
      nextSquares[index] = squares[currentSelected];
      allPiece.forEach(piece => {
        if (piece.getLocation() === currentSelected) {
          piece.setLocation(index);
          piece.updateHistory(currentSelected);
        }
      });
      setSquares(nextSquares);
      const nextPossibleMoves = Array(64).fill(false);
      setpossibleMoves(nextPossibleMoves);
      setIsSelected(Array(64).fill(false));
      console.log("allPiece", allPiece);
    }
  };

  function renderSquares(paramIndex, alternate) {
    // if true, start the square on this rank with black
    console.log("paramIndex", paramIndex);
    console.log("possibleMoves[paramIndex]", possibleMoves[paramIndex]);
    console.log("squares[paramIndex]", squares[paramIndex]);
    if (alternate) {
      return (
        <div
          key={paramIndex}
          className={
            alternateColor(starting_color) +
            (isSelected[paramIndex] ? " selected" : "") +
            (possibleMoves[paramIndex] ? " black-moves" : "") +
            (possibleMoves[paramIndex] && squares[paramIndex]
              ? " capture-moves"
              : "")
          }
          onClick={handleClick}
        >
          {squares[paramIndex]}
        </div>
      );
    } else {
      return (
        <div
          key={paramIndex}
          className={
            starting_color +
            (isSelected[paramIndex] ? " selected" : "") +
            (possibleMoves[paramIndex] ? " black-moves" : "") +
            (possibleMoves[paramIndex] && squares[paramIndex]
              ? " capture-moves"
              : "")
          }
          onClick={handleClick}
        >
          {squares[paramIndex]}
        </div>
      );
    }
  }

  const board_array = [];
  for (var i = 0; i <= 63; i++) {
    var starting_color = "black";
    var quotient = Math.floor(i / 8);
    if (isOdd(quotient)) {
      if (i % 2) {
        board_array.push(renderSquares(i, true));
      } else {
        board_array.push(renderSquares(i, false));
      }
    } else {
      if (i % 2) {
        board_array.push(renderSquares(i, false));
      } else {
        board_array.push(renderSquares(i, true));
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
