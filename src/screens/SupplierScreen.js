import { useState } from "react";
import classes from "./SupplierScreen.module.css";
import { SupplierTable } from "../components/Supplier/SupplierTable";
import { TypeChart } from "../components/Supplier/TypeChart";
import { FilterHeader } from "../components/Filters";
import { MerchantTable } from "../components/Supplier/MerchantTable";

export const SupplierScreen = () => {
  const [vendors, setVendors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [states, setStates] = useState([]);

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader vendors={vendors} states={states} statuses={statuses} />

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

          <div className={classes.leftContentWrapper}>
            <TypeChart />
            <MerchantTable />
          </div>
        </div>
      </div>
    </div>
  );
};
