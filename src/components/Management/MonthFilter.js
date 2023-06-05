import { useContext, useState } from "react";
import classes from "./MonthFilter.module.css";
import { MonthContext } from "../../contexts/MonthContext";

export const MonthFilter = () => {
  const { months, currentMonth, setCurrentMonth } = useContext(MonthContext);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth() - 2
  );

  return (
    <div className={classes.monthFilters}>
      {currentMonthIndex !== 0 && (
        <button
          onClick={() => setCurrentMonthIndex(currentMonthIndex - 1)}
          className={classes.chevronLeft}
        >
          <img src="/icons/chevron-left.svg" />
        </button>
      )}
      {months
        .slice(currentMonthIndex, currentMonthIndex + 3)
        .map((month, index) => {
          return (
            <button
              onClick={() => setCurrentMonth(month)}
              key={`month-filter-${index}`}
              className={`${classes.singleMonth} ${
                month === currentMonth && classes.active
              }`}
            >
              {month}
            </button>
          );
        })}
      {currentMonthIndex !== months.length - 3 && (
        <button
          onClick={() => setCurrentMonthIndex(currentMonthIndex + 1)}
          className={classes.chevronRight}
        >
          <img src="/icons/chevron-right.svg" />
        </button>
      )}
    </div>
  );
};
