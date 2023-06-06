import classes from "./MauDauScreen.module.css";
import { useEffect, useState } from "react";
import { MauDauBarChart } from "../components/MauDau/MauDauBarChart";
import { MauDauLineChart } from "../components/MauDau/MauDauLineChart";
import { MauDauRow } from "../components/MauDau/MauDauRow";
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

const lineLabels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const MauDauScreen = ({ orders }) => {
  // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentMonth, setCurrentMonth] = useState(13);

  const [vendors, setVendors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [states, setStates] = useState([]);

  const [stats, setStats] = useState({});
  const [lineData, setLineData] = useState({});

  const [statsDaily, setStatsDaily] = useState({});

  const [dailyStats, setDailyStats] = useState({
    merchant: { title: "Өдрийн дундаж мерчант", stat: 0 },
  });
  const [monthlyStats, setMonthlyStats] = useState({
    merchant: { title: "Сарын дундаж мерчант", stat: 0 },
    order: { title: "Сарын дундаж захиалга", stat: 0 },
    totalAmount: { title: "Сарын дундаж борлуулалт", stat: 0 },
  });

  useEffect(() => {
    const newStatsDaily = {};

    for (let i = 1; i <= new Date().getMonth() + 1; i++) {
      newStatsDaily[i] = {
        order: {
          total: [],
          delivered: [],
        },
      };

      for (let j = 1; j <= 31; j++) {
        newStatsDaily[i].order.total.push(
          orders[i]
            .filter((order) => new Date(order.order_date).getDate() === j)
            .reduce((acc, cur) => acc + cur.grand_total, 0)
        );
        newStatsDaily[i].order.delivered.push(
          orders[i]
            .filter(
              (order) =>
                new Date(order.order_date).getDate() === j && order.status === 3
            )
            .reduce((acc, cur) => acc + cur.grand_total, 0)
        );
      }
    }

    setStatsDaily(newStatsDaily);
  }, [orders]);

  // Bar Chart
  const barChartData = () => {
    if (currentMonth === 13) {
      const customerRes = [];
      const orderAmountRes = [];
      const totalAmountRes = [];

      Object.keys(orders).map((key) => {
        customerRes.push(
          countUnique(orders[key].map((order) => order.customer_id))
        );
        orderAmountRes.push(orders[key].length);
        totalAmountRes.push(
          orders[key].reduce((acc, cur) => acc + cur.grand_total, 0)
        );
      });

      const newBarStat = {
        customer: {
          title: "Харилцагч",
          data: {
            labels,
            datasets: [
              {
                display: false,
                label: "2023",
                data: customerRes,
                backgroundColor: "#eded21",
                barPercentage: 1,
              },
            ],
          },
          maxScale: 500,
        },

        order: {
          title: "Захиалга",
          data: {
            labels,
            datasets: [
              {
                display: false,
                labels: "2023",
                data: orderAmountRes,
                backgroundColor: "#3FDCFF",
                barPercentage: 1,
              },
            ],
          },
          maxScale: 4_000,
        },

        totalAmount: {
          title: "Нийт дүн",
          data: {
            labels,
            datasets: [
              {
                display: false,
                data: totalAmountRes,
                backgroundColor: "#FFB40F",
                barPercentage: 1,
              },
            ],
          },
          maxScale: 1_000_000_000,
        },
      };
      setStats(newBarStat);
    } else if (currentMonth < 13) {
      const newBarStat = {
        customer: {
          title: "Харилцагч",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                display: false,
                label: "2023",
                data: [
                  countUnique(
                    orders[currentMonth].map((order) => order.customer_id)
                  ),
                ],
                backgroundColor: "#eded21",
                barPercentage: 0.2,
              },
            ],
          },
          maxScale: 500,
        },
        order: {
          title: "Захиалга",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                display: false,
                data: [orders[currentMonth].length],
                backgroundColor: "#3FDCFF",
                barPercentage: 0.2,
              },
            ],
          },
          maxScale: 4_000,
        },
        totalAmount: {
          title: "Нийт дүн",
          data: {
            labels: [labels[currentMonth - 1]],
            datasets: [
              {
                display: false,
                data: [
                  orders[currentMonth].reduce(
                    (acc, cur) => acc + cur.grand_total,
                    0
                  ),
                ],
                barPercentage: 0.2,
              },
            ],
          },
          maxScale: 1_000_000_000,
        },
      };
      setStats(newBarStat);
    }
  };

  // Line Chart
  const lineChartData = () => {
    if (currentMonth === 13) {
      const customerRes = [];
      const orderAmountRes = [];
      const totalAmountRes = [];

      Object.keys(statsDaily).map((key) => {
        orderAmountRes.push(statsDaily[key].map((order) => order.customer_id));
      });

      const newLineStat = {
        customer: {
          title: "Харилцагч",
          data: {
            labels: lineLabels,
            datasets: [
              {
                display: false,
                label: "Нийт",
                data: {},
                backgroundColor: "#eded21",
                borderColor: "#eded21",
                pointStyle: true,
              },
            ],
          },
          maxScale: 200,
        },
        order: {
          title: "Захиалга",
          data: {
            labels: lineLabels,
            datasets: [
              {
                display: false,
                label: "Нийт",
                data: {},
                backgroundColor: "#3FDCFF",
                borderColor: "#3FDCFF",
                pointStyle: true,
              },
            ],
          },
          maxScale: 200,
        },
        totalAmount: {
          title: "Нийт дүн",
          data: {
            labels: lineLabels,
            datasets: [
              {
                display: false,
                label: "Нийт",
                data: {},
                backgroundColor: "#FFB40F",
                borderColor: "#FFB40F",
                pointStyle: true,
              },
            ],
          },
          maxScale: 200,
        },
      };
      // setStatsDaily(newLineStat);
    }
  };

  // Average Row
  const calculateAverageRow = () => {
    const newMonthlyStats = { ...monthlyStats };
    const newDailyStats = { ...dailyStats };

    const averageMonthlyMerchRes = [];
    const averageMonthlyOrderRes = [];
    const averageMonthlyTotalRes = [];

    const averageDailylyMerchRes = [];
    const averageDailylyOrderRes = [];
    const averageDailylyTotalRes = [];

    for (let i = 1; i <= new Date().getMonth() + 1; i++) {
      averageMonthlyMerchRes.push(
        countUnique(orders[i].map((order) => order.customer_id))
      );
      averageMonthlyOrderRes.push(orders[i].length);
      averageMonthlyTotalRes.push(
        orders[i].reduce((acc, cur) => acc + cur.grand_total, 0)
      );
    }

    // console.log(averageMonthlyTotalRes);

    if (currentMonth === 13) {
      newMonthlyStats.merchant.stat =
        averageMonthlyMerchRes.reduce((acc, cur) => acc + cur, 0) /
        averageMonthlyMerchRes.length;
      newMonthlyStats.order.stat =
        averageMonthlyOrderRes.reduce((acc, cur) => acc + cur, 0) /
        averageMonthlyOrderRes.length;
      newMonthlyStats.totalAmount.stat =
        averageMonthlyTotalRes.reduce((acc, cur) => acc + cur, 0) /
        averageMonthlyTotalRes.length;
    } else {
      newMonthlyStats.merchant.stat = averageMonthlyMerchRes[currentMonth - 1];
      newMonthlyStats.order.stat = averageMonthlyOrderRes[currentMonth - 1];
      newMonthlyStats.totalAmount.stat =
        averageMonthlyTotalRes[currentMonth - 1];
    }

    setMonthlyStats(newMonthlyStats);
  };

  // console.log(monthlyStats);

  useEffect(() => {
    barChartData();
    lineChartData();
    calculateAverageRow();
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

      <div className={classes.mauDauContent}>
        <div className={classes.chartContent}>
          <div className={classes.barContent}>
            {Object.keys(stats).map((key, index) => {
              return (
                <MauDauBarChart
                  key={`mau-dau-bar-chart-${index}`}
                  data={stats[key].data}
                  title={stats[key].title}
                  maxScale={stats[key].maxScale}
                />
              );
            })}
          </div>
          <div className={classes.lineContent}>
            {/* {Object.keys(statsDaily).map((key, index) => {
              return (
                <MauDauLineChart
                  key={`mau-dau-line-chart-${index}`}
                  data={statsDaily[key].data}
                  title={statsDaily[key].title}
                  maxScale={statsDaily[key].maxScale}
                />
              );
            })} */}
          </div>
        </div>
        {/* Average */}

        <MauDauRow monthlyStats={monthlyStats} />
      </div>
    </>
  );
};
