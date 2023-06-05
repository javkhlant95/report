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

export const KPIScreen = ({ orders }) => {
  const [currentMonth, setCurrentMonth] = useState(13);

  const [vendors, setVendors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [states, setStates] = useState([]);

  const [stats, setStats] = useState({});

  useEffect(() => {
    if (currentMonth === 13) {
      const totalAmountRes = [];
      const deliveredAmountRes = [];
      const merchantRes = [];
      const deliveryRateRes = [];

      Object.keys(orders).map((key) => {
        totalAmountRes.push(
          orders[key].reduce((acc, cur) => acc + cur.grand_total, 0)
        );
        deliveredAmountRes.push(
          orders[key]
            .filter((order) => order.status === 3)
            .reduce((acc, cur) => acc + cur.grand_total, 0)
        );
        merchantRes.push(
          countUnique(orders[key].map((order) => order.customer_id))
        );
        deliveryRateRes.push(
          (orders[key].filter((order) => order.status === 3).length * 100) /
            orders[key].length
        );
      });

      const newStat = {
        totalAmount: {
          title: "Нийт дүн",
          data: {
            labels,
            datasets: [
              {
                label: "2023",
                data: totalAmountRes,
                backgroundColor: "#3461eb",
                barPercentage: 1,
              },
            ],
          },
        },
        deliveredAmount: {
          title: "Хүргэсэн дүн",
          data: {
            labels,
            datasets: [
              {
                label: "2023",
                data: deliveredAmountRes,
                backgroundColor: "#3461eb",
                barPercentage: 1,
              },
            ],
          },
        },
        merchant: {
          title: "Мерчант",
          data: {
            labels,
            datasets: [
              {
                label: "2023",
                data: merchantRes,
                backgroundColor: "#3461eb",
                barPercentage: 1,
              },
            ],
          },
        },
        deliveryRate: {
          title: "Хүргэлтийн хувь",
          data: {
            labels,
            datasets: [
              {
                label: "2023",
                data: deliveryRateRes,
                backgroundColor: "#3461eb",
                barPercentage: 1,
              },
            ],
          },
        },
      };

      setStats(newStat);
    } else if (currentMonth < 13) {
      const newStat = {
        totalAmount: {
          title: "Нийт дүн",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                label: "2023",
                data: [
                  orders[currentMonth].reduce(
                    (acc, cur) => acc + cur.grand_total,
                    0
                  ),
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
        },
        deliveredAmount: {
          title: "Хүргэсэн дүн",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                label: "2023",
                data: [
                  orders[currentMonth]
                    .filter((order) => order.status === 3)
                    .reduce((acc, cur) => acc + cur.grand_total, 0),
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
        },
        merchant: {
          title: "Мерчант",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                label: "2023",
                data: [
                  countUnique(
                    orders[currentMonth].map((order) => order.customer_id)
                  ),
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
        },
        deliveryRate: {
          title: "Хүргэлтийн хувь",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                label: "2023",
                data: [
                  (orders[currentMonth].filter((order) => order.status === 3)
                    .length *
                    100) /
                    orders[currentMonth].length,
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
        },
      };

      setStats(newStat);
    }
  }, [currentMonth, orders]);

  return (
    <>
      <FilterHeader
        vendors={vendors}
        states={states}
        statuses={statuses}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        removeMonth
      />

      <div className={classes.kpiContent}>
        {Object.keys(stats).map((key, index) => {
          return (
            <div className={classes.barWrapper}>
              <h1 className={classes.title}>{stats[key].title}</h1>
              <KPIBarChart
                key={`kpi-bar-chart-${index}`}
                data={stats[key].data}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
