import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [results, setResults] = useState(null);

  return (
    <DataContext.Provider value={{ results, setResults }}>
      {children}
    </DataContext.Provider>
  );
};
