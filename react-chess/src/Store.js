import React, { useState } from "react";

export const HistoryContext = React.createContext();

const Store = ({ children }) => {
  const [history, setHistory] = useState([]);

  return (
    <HistoryContext.Provider value={[history, setHistory]}>
      {children}
    </HistoryContext.Provider>
  );
};

export default Store;
