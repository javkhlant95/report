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
  const { orders, currentMonth, setCurrentMonth, currentStatus, currentVendor } =
    useContext(Context);

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
        currentOrders = currentOrders.filter((order) => order.supplier_id === currentVendor.id);
      }

      if (currentStatus > 0) {
        currentOrders = currentOrders.filter((order) => order.status === currentStatus);
      }

      uniqueMerchantCount.push(countUnique(currentOrders.map((order) => order.customer_id)));
      totalOrderCount.push(currentOrders.length);
      totalOrderAmount.push(currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0));
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
            currentMonth < 13 ? [uniqueMerchantCount[currentMonth - 1]] : uniqueMerchantCount;
          break;
        case "orders":
          barData.datasets[0].data =
            currentMonth < 13 ? [totalOrderCount[currentMonth - 1]] : totalOrderCount;
          break;
        case "totalAmount":
          barData.datasets[0].data =
            currentMonth < 13 ? [totalOrderAmount[currentMonth - 1]] : totalOrderAmount;
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
              data: Array.from(Array(31)).map(() => 0),
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

    let currentOrders;

    if (currentMonth === 13) {
      currentOrders = [];
      for (const key in orders) {
        for (const order of orders[key]) {
          currentOrders.push(order);
        }
      }
    } else {
      currentOrders = orders[currentMonth];
    }

    if (currentVendor.id) {
      currentOrders = currentOrders.filter((order) => order.supplier_id === currentVendor.id);
    }

    if (currentStatus > 0) {
      currentOrders = currentOrders.filter((order) => order.status === currentStatus);
    }

    const deliveredOrders = currentOrders.filter((order) => order.status === 3);

    const merchants = [];
    const deliveredMerchants = [];

    const ordersCount = [];
    const deliveredOrdersCount = [];

    const ordersTotalAmount = [];
    const deliveredOrdersTotalAmount = [];

    for (let i = 1; i <= 31; i++) {
      merchants[i - 1] = [];
      deliveredMerchants[i - 1] = [];

      ordersCount[i - 1] = 0;
      deliveredOrdersCount[i - 1] = 0;

      ordersTotalAmount[i - 1] = 0;
      deliveredOrdersTotalAmount[i - 1] = 0;

      for (const order of currentOrders) {
        if (new Date(order.order_date).getDate() === i) {
          merchants[i - 1].push(order.customer_id);
          ordersCount[i - 1]++;
          ordersTotalAmount[i - 1] += order.grand_total;
        }
      }

      for (const order of deliveredOrders) {
        if (new Date(order.order_date).getDate() === i) {
          deliveredMerchants[i - 1].push(order.customer_id);
          deliveredOrdersCount[i - 1]++;
          deliveredOrdersTotalAmount[i - 1] += order.grand_total;
        }
      }

      merchants[i - 1] = countUnique(merchants[i - 1]);
      deliveredMerchants[i - 1] = countUnique(deliveredMerchants[i - 1]);
    }

    result.merchants.data.datasets[0].data = merchants;
    result.merchants.data.datasets[1].data = deliveredMerchants;

    result.orders.data.datasets[0].data = ordersCount;
    result.orders.data.datasets[1].data = deliveredOrdersCount;

    result.totalAmount.data.datasets[0].data = ordersTotalAmount;
    result.totalAmount.data.datasets[1].data = deliveredOrdersTotalAmount;

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
        data.reduce((acc, cur) => acc + cur, 0) / data.filter((singleData) => singleData > 0).length
      );
    }

    return result;
  }, [lineStats]);

  return (
    <div className={classes.screenWrapper}>
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
            })}
          </div>
        </div>
        <MauDauRow monthlyRowStats={monthlyRowStats} dailyRowStats={dailyRowStats} />
      </div>
    </div>
  );
};
