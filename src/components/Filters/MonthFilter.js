import { useState } from "react";
import classes from "./MonthFilter.module.css";

export const MonthFilter = ({
  currentMonth,
  setCurrentMonth,
  removeMonth = false,
}) => {
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth() - 1
  );

  return (
    <div className={classes.monthFilters}>
      {currentMonthIndex !== 0 && (
        <button
          onClick={() => setCurrentMonthIndex(currentMonthIndex - 1)}
          className={classes.chevronLeft}
        >
          <img src="/icons/chevron-left.svg" alt="Left Chevron" />
        </button>
      )}
      {months
        .slice(currentMonthIndex, currentMonthIndex + 3)
        .map((month, index) => {
          return (
            <button
              onClick={() =>
                setCurrentMonth(
                  removeMonth && month.value === currentMonth ? 13 : month.value
                )
              }
              key={`month-filter-${index}`}
              className={`${classes.singleMonth} ${
                month.value === currentMonth && classes.active
              }`}
            >
              {month.label}
            </button>
          );
        })}
      {currentMonthIndex !== months.length - 3 && (
        <button
          onClick={() => setCurrentMonthIndex(currentMonthIndex + 1)}
          className={classes.chevronRight}
        >
          <img src="/icons/chevron-right.svg" alt="Right Chevron" />
        </button>
      )}
    </div>
  );
};
