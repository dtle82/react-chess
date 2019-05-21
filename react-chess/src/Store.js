import React, { useState } from "react";

export const HistoryContext = React.createContext();
export const TurnContext = React.createContext();

const Store = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [isWhiteNext, setIsWhiteNext] = useState(true);

  return (
    <HistoryContext.Provider value={[history, setHistory]}>
      <TurnContext.Provider value={[isWhiteNext, setIsWhiteNext]}>
        {children}
      </TurnContext.Provider>
    </HistoryContext.Provider>
  );
};

export default Store;
