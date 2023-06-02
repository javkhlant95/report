import { VendorFilter } from "../components/MauDau/VendorFilter";
import classes from "./MauDauScreen.module.css";
import { useState } from "react";
import { MauDauBarChart } from "../components/MauDau/MauDauBarChart";
import { MauDauLineChart } from "../components/MauDau/MauDauLineChart";
import { MauDauRow } from "../components/MauDau/MauDauRow";

export const MauDauScreen = () => {
  const [barLabels, setBarLabels] = useState([
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
  ]);

  const [lineLabels, setLineLabels] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]);

  // Bar Chart
  const barCustomer = {
    labels: barLabels,
    datasets: [
      {
        display: false,
        data: barLabels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#eded21",
        datalabels: {
          color: "#e3d",
        },
      },
    ],
  };

  const barOrder = {
    labels: barLabels,
    datasets: [
      {
        display: false,
        data: barLabels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#3FDCFF",
      },
    ],
  };

  const barTotal = {
    labels: barLabels,
    datasets: [
      {
        display: false,
        data: barLabels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#FFB40F",
      },
    ],
  };

  const barDatas = [
    { data: barCustomer, title: "Харилцагч" },
    { data: barOrder, title: "Захиалга" },
    { data: barTotal, title: "Нийт дүн" },
  ];

  // Line Chart

  const lineCustomer = {
    labels: lineLabels,
    datasets: [
      {
        label: "Нийт",
        display: false,
        data: lineLabels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#eded21",
        borderColor: "#eded21",
        pointStyle: true,
      },
      {
        label: "Хүргэсэн",
        display: false,
        data: lineLabels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#6FD132",
        borderColor: "#6FD132",
        pointStyle: true,
      },
    ],
  };

  const lineOrder = {
    labels: lineLabels,
    datasets: [
      {
        label: "Нийт",
        display: true,
        data: lineLabels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#3FDCFF",
        borderColor: "#3FDCFF",
        pointStyle: true,
      },
      {
        label: "Хүргэсэн",
        display: false,
        data: lineLabels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#6FD132",
        borderColor: "#6FD132",
        pointStyle: true,
      },
    ],
  };

  const lineTotal = {
    labels: lineLabels,
    datasets: [
      {
        label: "Нийт",
        display: true,
        data: lineLabels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#FFB40F",
        borderColor: "#FFB40F",
        pointStyle: true,
      },
      {
        label: "Хүргэсэн",
        display: false,
        data: lineLabels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#6FD132",
        borderColor: "#6FD132",
        pointStyle: true,
      },
    ],
  };

  const lineDatas = [
    { data: lineCustomer, title: "Харилцагч" },
    { data: lineOrder, title: "Захиалга" },
    { data: lineTotal, title: "Нийт дүн" },
  ];

  return (
    <>
      <div className={classes.screenHead}>
        <div className={classes.filters}>
          <VendorFilter />
          <VendorFilter />
          <VendorFilter />
        </div>

        {/* <StatusFilters />
        <MonthFilter /> */}
      </div>

      <div className={classes.mauDauContent}>
        <div className={classes.chartContent}>
          <div className={classes.barContent}>
            {barDatas.map((data, index) => {
              return (
                <MauDauBarChart
                  key={`mau-dau-bar-chart-${index}`}
                  data={data.data}
                  title={data.title}
                />
              );
            })}
          </div>
          <div className={classes.lineContent}>
            {lineDatas.map((data, index) => {
              return (
                <MauDauLineChart
                  key={`mau-dau-line-chart-${index}`}
                  data={data.data}
                  title={data.title}
                  style={{ width: 300 }}
                />
              );
            })}
          </div>
        </div>
        {/* Average */}
        <MauDauRow />
      </div>
    </>
  );
};
