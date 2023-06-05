import { createContext, useState } from "react";

export const MonthContext = createContext(null);

export const MonthProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const value = {
    currentMonth,
    setCurrentMonth,
  };

  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
};
