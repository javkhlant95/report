import classes from "./MauDauScreen.module.css";
import { useContext, useEffect, useMemo } from "react";
import { MauDauBarChart } from "../components/MauDau/MauDauBarChart";
import { MauDauLineChart } from "../components/MauDau/MauDauLineChart";
import { MauDauRow } from "../components/MauDau/MauDauRow";
import { FilterHeader } from "../components/Filters";
import { Context } from "../contexts/Context";
import { countUnique } from "../utils/countUnique";

const monthLabels = [
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

const dateLabels = Array.from(Array(31)).map((val, index) => index + 1);

export const MauDauScreen = () => {
  const {
    orders,
    currentMonth,
    setCurrentMonth,
    currentStatus,
    currentVendor,
  } = useContext(Context);

  useEffect(() => {
    setCurrentMonth(13);

    return () => {
      setCurrentMonth(new Date().getMonth() + 1);
    };
  }, []);

  const barStats = useMemo(() => {
    const result = {
      merchants: {
        title: "Харилцагч",
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: "#eded21",
            },
          ],
        },
      },
      orders: {
        title: "Захиалга",
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: "#3FDCFF",
            },
          ],
        },
      },
      totalAmount: {
        title: "Нийт дүн",
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: "#FFB40F",
            },
          ],
        },
      },
    };

    const uniqueMerchantCount = [];
    const totalOrderCount = [];
    const totalOrderAmount = [];

    for (let i = 1; i <= 12; i++) {
      let currentOrders = orders[i];

      if (currentVendor.id) {
        currentOrders = currentOrders.filter(
          (order) => order.supplier_id === currentVendor.id
        );
      }

      if (currentStatus > 0) {
        currentOrders = currentOrders.filter(
          (order) => order.status === currentStatus
        );
      }

      uniqueMerchantCount.push(
        countUnique(currentOrders.map((order) => order.customer_id))
      );
      totalOrderCount.push(currentOrders.length);
      totalOrderAmount.push(
        currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0)
      );
    }

    for (const key in result) {
      const barData = result[key].data;

      barData.labels =
        currentMonth < 13
          ? [monthLabels[currentMonth - 1]]
          : monthLabels.slice(0, new Date().getMonth() + 1);
      barData.datasets[0].barPercentage = currentMonth < 13 ? 0.2 : 1;

      switch (key) {
        case "merchants":
          barData.datasets[0].data =
            currentMonth < 13
              ? [uniqueMerchantCount[currentMonth - 1]]
              : uniqueMerchantCount;
          break;
        case "orders":
          barData.datasets[0].data =
            currentMonth < 13
              ? [totalOrderCount[currentMonth - 1]]
              : totalOrderCount;
          break;
        case "totalAmount":
          barData.datasets[0].data =
            currentMonth < 13
              ? [totalOrderAmount[currentMonth - 1]]
              : totalOrderAmount;
          break;
        default:
          break;
      }
    }

    return result;
  }, [orders, currentMonth, currentStatus, currentVendor]);

  const lineStats = useMemo(() => {
    const result = {
      merchants: {
        title: "Харилцагч",
        data: {
          labels: dateLabels,
          datasets: [
            {
              label: "Нийт",
              backgroundColor: "#eded21",
              borderColor: "#eded21",
              data: [],
            },
            {
              label: "Хүргэсэн",
              backgroundColor: "#6FD132",
              borderColor: "#6FD132",
              data: [],
            },
          ],
        },
      },
      orders: {
        title: "Захиалга",
        data: {
          labels: dateLabels,
          datasets: [
            {
              label: "Нийт",
              backgroundColor: "#3FDCFF",
              borderColor: "#3FDCFF",
              data: [],
            },
            {
              label: "Хүргэсэн",
              backgroundColor: "#6FD132",
              borderColor: "#6FD132",
              data: [],
            },
          ],
        },
      },
      totalAmount: {
        title: "Нийт дүн",
        data: {
          labels: dateLabels,
          datasets: [
            {
              label: "Нийт",
              backgroundColor: "#FFB40F",
              borderColor: "#FFB40F",
              data: [],
            },
            {
              label: "Хүргэсэн",
              backgroundColor: "#6FD132",
              borderColor: "#6FD132",
              data: [],
            },
          ],
        },
      },
    };

    const dailyMerchantCountByMonth = Array.from(
      Array(new Date().getMonth() + 1)
    ).map(() => Array.from(Array(31)).map(() => 0));

    const deliveredDailyMerchantCountByMonth = Array.from(
      Array(new Date().getMonth() + 1)
    ).map(() => Array.from(Array(31)).map(() => 0));

    const dailyOrderCountByMonth = Array.from(
      Array(new Date().getMonth() + 1)
    ).map(() => Array.from(Array(31)).map(() => 0));
    const deliveredDailyOrderCountByMonth = Array.from(
      Array(new Date().getMonth() + 1)
    ).map(() => Array.from(Array(31)).map(() => 0));

    const dailyOrderAmountByMonth = Array.from(
      Array(new Date().getMonth() + 1)
    ).map(() => Array.from(Array(31)).map(() => 0));
    const deliveredDailyOrderAmountByMonth = Array.from(
      Array(new Date().getMonth() + 1)
    ).map(() => Array.from(Array(31)).map(() => 0));

    const dailyMerchantCount = Array.from(Array(31)).map(() => 0);
    const deliveredDailyMerchantCount = Array.from(Array(31)).map(() => 0);

    const dailyOrderCount = Array.from(Array(31)).map(() => 0);
    const deliveredDailyOrderCount = Array.from(Array(31)).map(() => 0);

    const dailyOrderAmount = Array.from(Array(31)).map(() => 0);
    const deliveredOrderAmount = Array.from(Array(31)).map(() => 0);

    for (let i = 1; i <= new Date().getMonth() + 1; i++) {
      let currentOrders = orders[i];

      if (currentVendor.id) {
        currentOrders = currentOrders.filter(
          (order) => order.supplier_id === currentVendor.id
        );
      }

      if (currentStatus > 0) {
        currentOrders = currentOrders.filter(
          (order) => order.status === currentStatus
        );
      }

      for (let j = 1; j <= 31; j++) {
        dailyMerchantCountByMonth[i - 1][j - 1] += countUnique(
          currentOrders
            .filter((order) => new Date(order.order_date).getDate() === j)
            .map((order) => order.customer_id)
        );
        deliveredDailyMerchantCountByMonth[i - 1][j - 1] += countUnique(
          currentOrders
            .filter(
              (order) =>
                order.status === 3 && new Date(order.order_date).getDate() === j
            )
            .map((order) => order.customer_id)
        );
        dailyOrderCountByMonth[i - 1][j - 1] += currentOrders.filter(
          (order) => new Date(order.order_date).getDate() === j
        ).length;
        deliveredDailyOrderCountByMonth[i - 1][j - 1] += currentOrders.filter(
          (order) =>
            order.status === 3 && new Date(order.order_date).getDate() === j
        ).length;
        dailyOrderAmountByMonth[i - 1][j - 1] += currentOrders
          .filter((order) => new Date(order.order_date).getDate() === j)
          .reduce((acc, cur) => acc + cur.grand_total, 0);
        deliveredDailyOrderAmountByMonth[i - 1][j - 1] += currentOrders
          .filter(
            (order) =>
              order.status === 3 && new Date(order.order_date).getDate() === j
          )
          .reduce((acc, cur) => acc + cur.grand_total, 0);
        dailyMerchantCount[j - 1] += countUnique(
          currentOrders
            .filter((order) => new Date(order.order_date).getDate() === j)
            .map((order) => order.customer_id)
        );
        deliveredDailyMerchantCount[j - 1] += countUnique(
          currentOrders
            .filter(
              (order) =>
                order.status === 3 && new Date(order.order_date).getDate() === j
            )
            .map((order) => order.customer_id)
        );
        dailyOrderCount[j - 1] += currentOrders.filter(
          (order) => new Date(order.order_date).getDate() === j
        ).length;
        deliveredDailyOrderCount[j - 1] += currentOrders.filter(
          (order) =>
            order.status === 3 && new Date(order.order_date).getDate() === j
        ).length;
        dailyOrderAmount[j - 1] += currentOrders
          .filter((order) => new Date(order.order_date).getDate() === j)
          .reduce((acc, cur) => acc + cur.grand_total, 0);
        deliveredOrderAmount[j - 1] += currentOrders
          .filter(
            (order) =>
              order.status === 3 && new Date(order.order_date).getDate() === j
          )
          .reduce((acc, cur) => acc + cur.grand_total, 0);
      }
    }

    for (const key in result) {
      const lineData = result[key].data.datasets;

      switch (key) {
        case "merchants":
          lineData[0].data =
            currentMonth < 13
              ? dailyMerchantCountByMonth[currentMonth - 1]
              : dailyMerchantCount;
          lineData[1].data =
            currentMonth < 13
              ? deliveredDailyMerchantCountByMonth[currentMonth - 1]
              : deliveredDailyMerchantCount;
          break;
        case "orders":
          lineData[0].data =
            currentMonth < 13
              ? dailyOrderCountByMonth[currentMonth - 1]
              : dailyOrderCount;
          lineData[1].data =
            currentMonth < 13
              ? deliveredDailyOrderCountByMonth[currentMonth - 1]
              : deliveredDailyOrderCount;
          break;
        case "totalAmount":
          lineData[0].data =
            currentMonth < 13
              ? dailyOrderAmountByMonth[currentMonth - 1]
              : dailyOrderAmount;
          lineData[1].data =
            currentMonth < 13
              ? deliveredDailyOrderAmountByMonth[currentMonth - 1]
              : deliveredOrderAmount;
          break;
        default:
          break;
      }
    }

    return result;
  }, [orders, currentMonth, currentStatus, currentVendor]);

  const monthlyRowStats = useMemo(() => {
    const result = {
      merchants: {
        title: "Сарын дундаж мерчант",
        data: 0,
      },
      orders: {
        title: "Сарын дундаж захиалга",
        data: 0,
      },
      totalAmount: {
        title: "Сарын дундаж борлуулалт",
        data: 0,
      },
    };

    for (const key in barStats) {
      const data = barStats[key].data.datasets[0].data;

      result[key].data = Math.round(
        data.reduce((acc, cur) => acc + cur, 0) / (new Date().getMonth() + 1)
      );
    }

    return result;
  }, [barStats]);

  const dailyRowStats = useMemo(() => {
    const result = {
      merchants: {
        title: "Өдрийн дундаж мерчант",
        data: 0,
      },
      orders: {
        title: "Өдрийн дундаж захиалга",
        data: 0,
      },
      totalAmount: {
        title: "Өдрийн дундаж борлуулалт",
        data: 0,
      },
    };

    for (const key in lineStats) {
      const data = lineStats[key].data.datasets[0].data;

      result[key].data = Math.round(
        data.reduce((acc, cur) => acc + cur, 0) /
          data.filter((singleData) => singleData > 0).length
      );
    }

    return result;
  }, [lineStats]);


  return (
    <>
      <FilterHeader removeMonth />

      <div className={classes.mauDauContent}>
        <div className={classes.chartContent}>
          <div className={classes.barContent}>
            {Object.keys(barStats).map((key, index) => {
              return (
                <MauDauBarChart
                  key={`mau-dau-bar-chart-${index}`}
                  data={barStats[key].data}
                  title={barStats[key].title}
                />
              );
            })}
          </div>
          <div className={classes.lineContent}>
            {Object.keys(lineStats).map((key, index) => {
              return (
                <MauDauLineChart
                  key={`mau-dau-line-chart-${index}`}
                  data={lineStats[key].data}
                  title={lineStats[key].title}
                  style={{ width: 300 }}
                />
              );
            })} */}
          </div>
        </div>
        <MauDauRow
          monthlyRowStats={monthlyRowStats}
          dailyRowStats={dailyRowStats}
        />
      </div>
    </>
  );
};
