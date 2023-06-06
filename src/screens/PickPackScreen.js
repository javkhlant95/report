import { useState } from "react";
import { PickPackRow } from "../components/PickPack/PickPackRow";
import classes from "./PickPackScreen.module.css";
import { PickPackDoughnutChart } from "../components/PickPack/PickPackDoughnutChart";
import { SupplierTable } from "../components/PickPack/SupplierTable";
import { FilterHeader } from "../components/Filters";

export const PickPackScreen = ({ vendors }) => {
  const [currentVendors, setCurrentVendors] = useState({});

  const [statuses, setStatuses] = useState([]);
  const [states, setStates] = useState([]);
  const [labels, setlabels] = useState([
    "Mon",
    "Tueshdbhdbhb",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurshbhbhbhhnciudhcndunnj",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
  ]);
  const color = [
    "#FBD31E",
    "#F7961D",
    "#0E8DFF",
    "#12239E",
    "#69B47C",
    "#E66C37",
    "#6B007B",
    "#90BE6D",
    "#42AA8B",
    "#F48426",
    "#E044A7",
    "#734EC1",
    "#D9B203",
    "#D64550",
    "#1A7178",
    "#19AA40",
    "#16C6F4",
    "#4092FF",
    "#FF9F57",
    "#BE5CC8",
    "#F471D0",
    "#B5A1FF",
    "#C4A100",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekly Sales",
        data: [
          19, 15, 5, 12, 3, 7, 19, 15, 5, 12, 3, 7, 19, 15, 5, 12, 3, 7, 19, 15,
          5, 12, 3, 7,
        ],
        backgroundColor: color,
        cutout: "65%",
      },
    ],
  };

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader
        vendors={vendors}
        states={states}
        statuses={statuses}
        currentVendors={currentVendors}
        setCurrentVendors={setCurrentVendors}
      />
      <div className={classes.pickPackContent}>
        <PickPackRow />
        <div className={classes.pickPackDataContent}>
          <div className={classes.pickPackPieContent}>
            <PickPackDoughnutChart data={data} />
          </div>
          <SupplierTable />
        </div>
      </div>
    </div>
  );
};
