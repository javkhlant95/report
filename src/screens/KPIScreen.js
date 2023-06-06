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

export const KPIScreen = ({ orders, statuses }) => {
  const [currentMonth, setCurrentMonth] = useState(13);
  const [currentStatus, setCurrentStatus] = useState(0);

  const [vendors, setVendors] = useState([]);
  const [states, setStates] = useState([]);
  const [avStatuses, setAvStatuses] = useState([]);

  const [stats, setStats] = useState({});

  useEffect(() => {
    const newStatuses = [];

    if (currentMonth === 13) {
      let allOrders = [];

      for (const key in orders) {
        allOrders = [...allOrders, ...orders[key]];
      }

      for (const status of statuses) {
        for (const order of allOrders) {
          if (status.OrderStatusID === order.status) {
            newStatuses.push(status);
            break;
          }
        }
      }
    } else {
      for (const status of statuses) {
        for (const order of orders[currentMonth]) {
          if (status.OrderStatusID === order.status) {
            newStatuses.push(status);
            break;
          }
        }
      }
    }

    setAvStatuses(newStatuses);
  }, [statuses, currentMonth, orders]);

  useEffect(() => {
    if (currentMonth === 13) {
      const totalAmountRes = [];
      const deliveredAmountRes = [];
      const merchantRes = [];
      const deliveryRateRes = [];

      Object.keys(orders).map((key) => {
        if (currentStatus === 0) {
          totalAmountRes.push(orders[key].reduce((acc, cur) => acc + cur.grand_total, 0));
          deliveredAmountRes.push(
            orders[key]
              .filter((order) => order.status === 3)
              .reduce((acc, cur) => acc + cur.grand_total, 0)
          );
          merchantRes.push(countUnique(orders[key].map((order) => order.customer_id)));
          deliveryRateRes.push(
            (orders[key].filter((order) => order.status === 3).length * 100) / orders[key].length
          );
        } else {
          const filteredOrders = orders[key].filter((order) => order.status === currentStatus);

          totalAmountRes.push(filteredOrders.reduce((acc, cur) => acc + cur.grand_total, 0));
          deliveredAmountRes.push(
            filteredOrders
              .filter((order) => order.status === 3)
              .reduce((acc, cur) => acc + cur.grand_total, 0)
          );
          merchantRes.push(countUnique(filteredOrders.map((order) => order.customer_id)));
          deliveryRateRes.push(
            (filteredOrders.filter((order) => order.status === 3).length * 100) /
              filteredOrders.length
          );
        }
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
          maxScale: 100,
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
                  currentStatus === 0
                    ? orders[currentMonth].reduce((acc, cur) => acc + cur.grand_total, 0)
                    : orders[currentMonth]
                        .filter((order) => order.status === currentStatus)
                        .reduce((acc, cur) => acc + cur.grand_total, 0),
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
          maxScale: 2_000_000_000,
        },
        deliveredAmount: {
          title: "Хүргэсэн дүн",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                label: "2023",
                data: [
                  currentStatus === 0
                    ? orders[currentMonth]
                        .filter((order) => order.status === 3)
                        .reduce((acc, cur) => acc + cur.grand_total, 0)
                    : orders[currentMonth]
                        .filter((order) => order.status === currentStatus)
                        .filter((order) => order.status === 3)
                        .reduce((acc, cur) => acc + cur.grand_total, 0),
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
          maxScale: 2_000_000_000,
        },
        merchant: {
          title: "Мерчант",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                label: "2023",
                data: [
                  currentStatus === 0
                    ? countUnique(orders[currentMonth].map((order) => order.customer_id))
                    : countUnique(
                        orders[currentMonth]
                          .filter((order) => order.status === currentStatus)
                          .map((order) => order.customer_id)
                      ),
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
          maxScale: 1_000,
        },
        deliveryRate: {
          title: "Хүргэлтийн хувь",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                label: "2023",
                data: [
                  currentStatus === 0
                    ? (orders[currentMonth]
                        .filter((order) => order.status === 3)
                        .reduce((acc, cur) => acc + cur.grand_total, 0) *
                        100) /
                      orders[currentMonth].reduce((acc, cur) => acc + cur.grand_total, 0)
                    : (orders[currentMonth]
                        .filter((order) => order.status === currentStatus)
                        .filter((order) => order.status === 3)
                        .reduce((acc, cur) => acc + cur.grand_total, 0) *
                        100) /
                      orders[currentMonth]
                        .filter((order) => order.status === currentStatus)
                        .reduce((acc, cur) => acc + cur.grand_total, 0),
                ],
                backgroundColor: "#3461eb",
                barPercentage: 0.1,
              },
            ],
          },
          maxScale: 100,
        },
      };

      setStats(newStat);
    }
  }, [currentMonth, orders, currentStatus]);

  return (
    <>
      <FilterHeader
        vendors={vendors}
        states={states}
        statuses={avStatuses}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        removeMonth
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />

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
