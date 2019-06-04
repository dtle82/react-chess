import React, { useState, useContext } from "react";
import {
  getBoardNotation,
  isOdd,
  alternateColor,
  factory_piece,
  pieceReducer,
  playSound
} from "../helpers.js";
import { HistoryContext } from "../Store";
import { TurnContext } from "../Store";

const bottomNotation = ["a", "b", "c", "d", "e", "f", "g", "h"];

const white_position = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
const white_pawn_position = Array(8).fill("♙");
const neutral_positions = Array(4 * 8).fill("");
const black_position = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
const black_pawn_position = Array(8).fill("♟");
white_position[0] = pieceReducer({ emoji: "♖", notation: "a1" });
white_position[1] = pieceReducer({ emoji: "♘", notation: "b1" });
white_position[2] = pieceReducer({ emoji: "♗", notation: "c1" });
white_position[3] = pieceReducer({ emoji: "♕", notation: "d1" });
white_position[4] = pieceReducer({ emoji: "♔", notation: "e1" });
white_position[5] = pieceReducer({ emoji: "♗", notation: "f1" });
white_position[6] = pieceReducer({ emoji: "♘", notation: "g1" });
white_position[7] = pieceReducer({ emoji: "♖", notation: "h1" });
const generated_white_pawn_position = white_pawn_position.map((pawn, idx) => {
  const obj = factory_piece(
    "pawn",
    "♙",
    "white",
    [-8, -16],
    idx + 48,
    [],
    [],
    "active"
  );
  return obj;
});

const white_combined_position = generated_white_pawn_position.concat(
  white_position
);
black_position[0] = pieceReducer({ emoji: "♜", notation: "a8" });
black_position[1] = pieceReducer({ emoji: "♞", notation: "b8" });
black_position[2] = pieceReducer({ emoji: "♝", notation: "c8" });
black_position[3] = pieceReducer({ emoji: "♛", notation: "d8" });
black_position[4] = pieceReducer({ emoji: "♚", notation: "e8" });
black_position[5] = pieceReducer({ emoji: "♝", notation: "f8" });
black_position[6] = pieceReducer({ emoji: "♞", notation: "g8" });
black_position[7] = pieceReducer({ emoji: "♜", notation: "h8" });
const generated_black_pawn_position = black_pawn_position.map((pawn, idx) => {
  const obj = factory_piece(
    "pawn",
    pawn,
    "black",
    [8, 16],
    idx + 8,
    [],
    [],
    "active"
  );
  return obj;
});
const black_combined_position = black_position.concat(
  generated_black_pawn_position
);
console.log("black_combined_position", black_combined_position);

function Chessboard() {
  const [history, setHistory] = useContext(HistoryContext);
  const [isWhiteNext, setIsWhiteNext] = useContext(TurnContext);
  const [squares, setSquares] = useState(
    black_combined_position
      .concat(neutral_positions)
      .concat(white_combined_position)
  );
  const [isSelected, setIsSelected] = useState(Array(64).fill(false));
  const [possibleMoves, setpossibleMoves] = useState(Array(64).fill(false));

  const handleClick = event => {
    const { index } = getBoardNotation(event.target);
    const nextSquares = squares.slice();
    nextSquares[index] = squares[index];
    setSquares(nextSquares);

    if (isSquareNotClicked(isSelected[index])) {
      const nextSelected = Array(64).fill(false);
      nextSelected[index] = true;
      setIsSelected(nextSelected);

      const nextPossibleMoves = Array(64).fill(false);
      setpossibleMoves(nextPossibleMoves);
    }

    if (isObject(squares[index])) {
      // console.log("possibleMoves", possibleMoves[index]);
      if (
        isWhiteNext &&
        squares[index].getColor() === "black" &&
        !possibleMoves[index]
      ) {
        // console.log("reject!", possibleMoves[index]);
        setIsSelected(Array(64).fill(false));
        return;
      } else if (
        !isWhiteNext &&
        squares[index].getColor() === "white" &&
        !possibleMoves[index]
      ) {
        // console.log("reject!", possibleMoves[index]);
        setIsSelected(Array(64).fill(false));
        return;
      }
      const nextPossibleMoves = Array(64).fill(false);
      squares[index].validate();
      console.log("squares[index]", squares[index]);
      squares[index]
        .getMoveset()
        .flat()
        .forEach(idx => {
          if (!nextSquares[index + idx] && squares[index].getIsFree()) {
            nextPossibleMoves[index + idx] = true;
          } else {
            squares[index].setBlocked();
          }
        });
      squares[index].getCaptureSet().forEach(idx => {
        if (squareContainsOpponent(nextSquares[index + idx], squares[index])) {
          nextPossibleMoves[index + idx] = true;
        }
      });
      setpossibleMoves(nextPossibleMoves);
    }

    if (possibleMoves[index]) {
      const nextSquares = squares.slice();
      const currentSelected = Array.prototype.indexOf.call(isSelected, true);
      const { notation } = getBoardNotation(
        document.getElementById("chessboard").children[index]
      );
      console.log("currentSelected", currentSelected);
      nextSquares[currentSelected] = false;
      nextSquares[index] = squares[currentSelected];
      squares[currentSelected].setLocation(notation);
      squares[currentSelected].updateHistory(currentSelected);
      const nextHistory = history.slice();

      nextHistory.push(
        notation +
          ` (${squares[currentSelected].getColor()} ${squares[
            currentSelected
          ].getName()})`
      );
      playSound(
        "https://raw.githubusercontent.com/ornicar/lila/master/public/sound/standard/Move.ogg"
      );
      setHistory(nextHistory);
      setSquares(nextSquares);

      // clear possible moves and highlighted squares
      const nextPossibleMoves = Array(64).fill(false);
      setpossibleMoves(nextPossibleMoves);
      setIsSelected(Array(64).fill(false));
      const isBlackNext = !isWhiteNext;
      setIsWhiteNext(isBlackNext);
    }
  };

  function squareContainsOpponent(opponentSquare, selfSquare) {
    //checks if possible capture square contains an opponent by checking if square contains object and that the colors do not match
    return (
      opponentSquare &&
      opponentSquare.hasOwnProperty("color") &&
      selfSquare.hasOwnProperty("color") &&
      opponentSquare.getColor() !== selfSquare.getColor()
    );
  }

  function isSquareNotClicked(square) {
    return square === false;
  }

  function isObject(squareObject) {
    return typeof squareObject == "object";
  }

  function isPieceObject(obj) {
    return obj.hasOwnProperty("emoji") ? obj.getEmoji() : obj;
  }

  function renderSquares(paramIndex, alternate) {
    // if true, start the square on this rank with black
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
          {isPieceObject(squares[paramIndex])}
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
          {isPieceObject(squares[paramIndex])}
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
