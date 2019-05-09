import React, { useState } from "react";

const allPiece = [];

function factory_piece(name, emoji, color, moveset, location, history) {
  let piece = {
    getName: function() {
      return this.name;
    },
    getMoveset: function() {
      return this.moveset;
    },
    getEmoji: function() {
      return this.emoji;
    },
    getLocation: function() {
      return this.location;
    },
    setLocation: function(location) {
      this.location = location;
    },
    updateHistory: function(notation) {
      this.history.push(notation);
    },
    validate: function() {
      switch (this.emoji) {
        case "♟":
          if (this.history.length > 0) {
            this.moveset = [8];
          }
          break;
        case "♙":
          if (this.history.length > 0) {
            this.moveset = [-8];
          }
          break;
      }
    }
  };

  let obj = Object.assign(Object.create(piece), {
    name,
    emoji,
    color,
    moveset,
    location,
    history
  });

  allPiece.push(obj);
  return obj;
}

const bottomNotation = ["a", "b", "c", "d", "e", "f", "g", "h"];

const white_position = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
const white_pawn_position = Array(8).fill("♙");
const white_combined_position = white_pawn_position.concat(white_position);
const neutral_positions = Array(4 * 8).fill("");
const black_position = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
const black_pawn_position = Array(8).fill("♟");
const black_combined_position = black_position.concat(black_pawn_position);

black_pawn_position.forEach((pawn, idx) => {
  factory_piece("pawn", "♟", "black", [8, 16], idx + 8, []);
});
white_pawn_position.forEach((pawn, idx) => {
  factory_piece("pawn", "♙", "white", [-8, -16], idx + 48, []);
});

function Chessboard() {
  const [squares, setSquares] = useState(
    black_combined_position
      .concat(neutral_positions)
      .concat(white_combined_position)
  );
  const [isSelected, setIsSelected] = useState(Array(64).fill(false));
  const [possibleMoves, setpossibleMoves] = useState(Array(64).fill(false));

  const handleClick = event => {
    console.log("allPiece", allPiece);
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
          console.log("piece", piece);
          piece.validate();
          piece.moveset.forEach(idx => {
            nextPossibleMoves[index + idx] = true;
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
    console.log("simple index", index);

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
