import { useState } from "react";
import classes from "./MonthFilter.module.css";

export const MonthFilter = () => {
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
  const [currentIndex, setCurrentIndex] = useState(new Date().getMonth() - 2);

  return (
    <div className={classes.monthFilters}>
      {currentIndex !== 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className={classes.chevronLeft}
        >
          <img src="/icons/chevron-left.svg" />
        </button>
      )}
      {months.slice(currentIndex, currentIndex + 3).map((month, index) => {
        return (
          <button
            key={`month-filter-${index}`}
            className={`${classes.singleMonth} ${
              month === currentMonth && classes.active
            }`}
          >
            {month}
          </button>
        );
      })}
      {currentIndex !== months.length - 3 && (
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          className={classes.chevronRight}
        >
          <img src="/icons/chevron-right.svg" />
        </button>
      )}
    </div>
  );
};
