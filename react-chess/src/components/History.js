import React, { useContext } from "react";
import { HistoryContext } from "../Store.js";

function History() {
  const [history, setHistory] = useContext(HistoryContext);
  return (
    <div id="history">
      <h2>Move History</h2>
      {history.map((moves, index) => {
        return <li key={index}>{moves}</li>;
      })}
    </div>
  );
}

export default History;
