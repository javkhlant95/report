import { ManagementRow } from "../components/Management/ManagementRow";
import { MonthFilter } from "../components/Management/MonthFilter";
import { StatusFilters } from "../components/Management/StatusFilters";
import { VendorFilter } from "../components/Management/VendorFilter";
import classes from "./ManagementScreen.module.css";

export const ManagementScreen = () => {
  return (
    <>
      <div className={classes.screenHead}>
        <div className={classes.filters}>
          <VendorFilter />
          <VendorFilter />
          <VendorFilter />
        </div>

        <StatusFilters />
        <MonthFilter />
      </div>

      <div className={classes.managementContent}>
        {Array.from(Array(5)).map((val, index) => {
          return <ManagementRow key={`management-row-${index}`} />;
        })}
      </div>
    </>
  );
};
