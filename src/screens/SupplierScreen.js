import { useEffect, useState } from "react";
import classes from "./SupplierScreen.module.css";
import { SupplierTable } from "../components/Supplier/SupplierTable";
import { TypeChart } from "../components/Supplier/TypeChart";
import { FilterHeader } from "../components/Filters";
import { MerchantTable } from "../components/Supplier/MerchantTable";
import { countUnique } from "../utils/countUnique";

export const SupplierScreen = () => {
  const [totalStat, setTotalStat] = useState({});
  const [vendorStat, setVendorStat] = useState([]);
  const [typeStat, setTypeStat] = useState({ gtAmount: 0, horecaAmount: 0 });
  const [merchantStat, setMerchantStat] = useState([]);

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader />

      <div className={classes.suppliersContent}>
        <div className={classes.stats}>
          {Object.keys(totalStat).map((key, index) => {
            const stat = totalStat[key];

            return (
              <div key={`stat-box-${index}`} className={classes.singleStat}>
                <h2>{stat.label}</h2>
                <h1
                  style={{
                    color: stat.goal
                      ? stat.goal > stat.stat
                        ? "#D64554"
                        : "#1AAB40"
                      : "inherit",
                  }}
                >
                  {stat.stat >= 1_000_000
                    ? Math.round(stat.stat / 1_000_000) + "M"
                    : stat.stat}
                </h1>
                {stat.goal && (
                  <p>
                    Goal:{" "}
                    {stat.goal >= 1_000_00
                      ? stat.goal / 1_000_000 + "M"
                      : stat.goal}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className={classes.contentWrapper}>
          <SupplierTable vendorStat={vendorStat} />

          <div className={classes.leftContentWrapper}>
            <TypeChart typeStat={typeStat} />
            <MerchantTable merchantStat={merchantStat} />
          </div>
        </div>
      </div>
    </div>
  );
};
