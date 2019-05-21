import React from "react";
import History from "./History";
import PlayerTurn from "./Player-Turn";

function Sideinfo() {
  return (
    <div id="sideinfo">
      <PlayerTurn />
      <History />
    </div>
  );
}

export default Sideinfo;
