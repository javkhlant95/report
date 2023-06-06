import classes from "./KPIScreen.module.css";
import { KPIBarChart } from "../components/KPI/KPIBarChart";
import { useEffect, useState } from "react";
import { FilterHeader } from "../components/Filters";
import { countUnique } from "../utils/countUnique";

const labels = [
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

export const KPIScreen = () => {
  const stats = {};

  return (
    <>
      <FilterHeader removeMonth />

      <div className={classes.kpiContent}>
        {Object.keys(stats).map((key, index) => {
          return (
            <div key={`kpi-bar-${index}`} className={classes.barWrapper}>
              <h1 className={classes.title}>{stats[key].title}</h1>
              <KPIBarChart
                key={`kpi-bar-chart-${index}`}
                data={stats[key].data}
                maxScale={stats[key].maxScale}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
