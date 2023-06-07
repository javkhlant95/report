import classes from "./FilterHeader.module.css";
import {
  MonthFilter,
  VendorFilter,
  TypeFilter,
  StateFilter,
  StatusFilters,
} from "./";

export const FilterHeader = ({ removeMonth = false }) => {
  return (
    <div className={classes.filterHeader}>
      <div className={classes.dropdownFilters}>
        <VendorFilter />
        <TypeFilter />
        <StateFilter />
      </div>

      <StatusFilters />
      <MonthFilter removeMonth={removeMonth} />
    </div>
  );
};
