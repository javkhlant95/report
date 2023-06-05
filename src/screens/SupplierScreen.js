import { useState } from "react";
import { MonthFilter } from "../components/Management/MonthFilter";
import { StateFilter } from "../components/Management/StateFilter";
import { StatusFilters } from "../components/Management/StatusFilters";
import { TypeFilter } from "../components/Management/TypeFilter";
import { VendorFilter } from "../components/Management/VendorFilter";
import classes from "./SupplierScreen.module.css";
import { SupplierTable } from "../components/Supplier/SupplierTable";

export const SupplierScreen = () => {
  const [vendors, setVendors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [states, setStates] = useState([]);

  return (
    <div className={classes.screenWrapper}>
      <div className={classes.screenHead}>
        <div className={classes.filters}>
          <VendorFilter vendors={vendors} />
          <TypeFilter />
          <StateFilter states={states} />
        </div>

        <StatusFilters statuses={statuses} />
        <MonthFilter />
      </div>

      <div className={classes.suppliersContent}>
        <div className={classes.stats}>
          {Array.from(Array(7)).map((val, index) => {
            return (
              <div className={classes.singleStat}>
                <h2>Захиалга</h2>
                <h1>2174</h1>
                {index === 1 && <p>Goal</p>}
              </div>
            );
          })}
        </div>

        <div className={classes.contentWrapper}>
          <SupplierTable />

          <div className={classes.leftContentWrapper}></div>
        </div>
      </div>
    </div>
  );
};
