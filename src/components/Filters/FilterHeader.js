import classes from "./FilterHeader.module.css";
import { MonthFilter, VendorFilter, TypeFilter, StateFilter, StatusFilters } from "./";

export const FilterHeader = ({
  vendors,
  states,
  statuses,
  currentMonth,
  setCurrentMonth,
  removeMonth = false,
  currentStatus,
  setCurrentStatus,
}) => {
  return (
    <div className={classes.filterHeader}>
      <div className={classes.dropdownFilters}>
        <VendorFilter vendors={vendors} />
        <TypeFilter />
        <StateFilter states={states} />
      </div>

      <StatusFilters
        statuses={statuses}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />
      <MonthFilter
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        removeMonth={removeMonth}
      />
    </div>
  );
};
