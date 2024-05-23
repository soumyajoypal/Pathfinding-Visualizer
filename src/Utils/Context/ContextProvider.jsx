import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();
const useAppContext = () => {
  const data = useContext(AppContext);
  return data;
};
const ContextProvider = ({ children }) => {
  let start = false;
  return <AppContext.Provider value={start}>{children}</AppContext.Provider>;
};
export { useAppContext };
export default ContextProvider;
