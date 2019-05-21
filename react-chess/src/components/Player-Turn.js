import React, { useContext } from "react";
import { TurnContext } from "../Store.js";

function PlayerTurn() {
  const [isWhiteNext] = useContext(TurnContext);
  console.log("isWhiteNext", isWhiteNext);
  return (
    <div id="playerturn">
      <h2>Player Turn</h2>
      <div className="container">
        <div className={isWhiteNext ? "turn-display current" : "turn-display"}>
          White
        </div>
        <div className={!isWhiteNext ? "turn-display current" : "turn-display"}>
          Black
        </div>
      </div>
    </div>
  );
}

export default PlayerTurn;
