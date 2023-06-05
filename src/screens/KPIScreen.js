import classes from "./KPIScreen.module.css";
import { KPIBarChart } from "../components/KPI/KPIBarChart";
import { useState } from "react";
import { FilterHeader } from "../components/Filters";

export const KPIScreen = () => {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [states, setStates] = useState([]);

  const [labels, setLabels] = useState([
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

  // const NUMBER_BN = { min: 0, max: 6 };

  const totalAmount = {
    labels,
    datasets: [
      {
        label: "2022",
        data: labels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#93eb34",
        borderWidth: 1,
        pointStyle: "rectRot",
        pointRadius: 5,
      },
      {
        label: "2023",
        data:
          orders.length > 0
            ? [
                0,
                0,
                0,
                0,
                orders.reduce((acc, cur) => acc + cur.grand_total, 0),
              ]
            : [],
        backgroundColor: "#3461eb",
      },
      {
        label: "Төлөвлөгөө",
        data: labels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#ebc934",
      },
    ],
  };

  const deliveredAmount = {
    labels,
    datasets: [
      {
        label: "2022",
        data: labels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#93eb34",
      },
      {
        label: "2023",
        data:
          orders.length > 0
            ? [
                0,
                0,
                0,
                0,
                orders
                  .filter((order) => order.status === 3)
                  .reduce((acc, cur) => acc + cur.grand_total, 0),
              ]
            : [],
        backgroundColor: "#3461eb",
      },
      {
        label: "Төлөвлөгөө",
        data: labels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#eb6234",
      },
    ],
  };

  const merchant = {
    labels,
    datasets: [
      {
        label: "2022",
        data: labels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#93eb34",
      },
      {
        label: "2023",
        data: labels.map(() => Math.round(Math.random() * 60)),
        backgroundColor: "#3461eb",
      },
      {
        label: "Төлөвлөгөө",
        data: labels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#eb34a8",
      },
    ],
  };

  const deliveryRate = {
    labels,
    datasets: [
      {
        label: "2022",
        data: labels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#93eb34",
      },
      {
        label: "2023",
        data:
          orders.length > 0
            ? [
                0,
                0,
                0,
                0,
                Math.round(
                  (orders.filter((order) => order.status === 3).length * 100) /
                    orders.length
                ),
              ]
            : [],
        backgroundColor: "#3461eb",
      },
      {
        label: "Хувь",
        data: labels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#9934eb",
      },
    ],
  };

  // const datas = [totalAmount, deliveredAmount, merchant, deliveryRate];
  const datas = [
    { data: totalAmount, title: "Нийт дүн" },
    { data: deliveredAmount, title: "Хүргэсэн дүн" },
    { data: merchant, title: "Мерчант" },
    { data: deliveryRate, title: "Хүргэлтийн хувь" },
  ];

  return (
    <>
      <FilterHeader vendors={vendors} states={states} statuses={statuses} />

      <div className={classes.kpiContent}>
        {datas.map((data, index) => {
          return (
            <div className={classes.barWrapper}>
              <h1 className={classes.title}>{data.title}</h1>
              <KPIBarChart key={`kpi-bar-chart-${index}`} data={data.data} />
            </div>
          );
        })}
      </div>
    </>
  );
};
