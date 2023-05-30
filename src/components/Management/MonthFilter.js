import classes from "./MonthFilter.module.css";

export const MonthFilter = () => {
  const months = ["January", "February", "March"];

  return (
    <div className={classes.monthFilters}>
      {months.map((month, index) => {
        return (
          <button key={`month-filter-${index}`} className={classes.singleMonth}>
            {month}
          </button>
        );
      })}
    </div>
  );
};
