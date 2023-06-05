import { createContext, useState } from "react";

export const MonthContext = createContext(null);

export const MonthProvider = ({ children }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(
    months[new Date().getMonth() - 1]
  );

  const value = {
    months,
    currentMonth,
    setCurrentMonth,
  };

  return (
    <MonthContext.Provider value={value}>{children}</MonthContext.Provider>
  );
};
