import classes from "./KPIScreen.module.css";
import { KPIBarChart } from "../components/KPI/KPIBarChart";
import { useContext, useEffect, useMemo } from "react";
import { FilterHeader } from "../components/Filters";
import { countUnique } from "../utils/countUnique";
import { Context } from "../contexts/Context";

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

export const KPIScreen = () => {
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
      totalAmount: {
        title: "Нийт дүн",
        data: {
          labels: [],
          datasets: [
            {
              label: "2023",
              data: [],
              backgroundColor: "#3461eb",
            },
          ],
        },
      },
      deliveredAmount: {
        title: "Хүргэсэн дүн",
        data: {
          labels: [],
          datasets: [
            {
              label: "2023",
              data: [],
              backgroundColor: "#3461eb",
            },
          ],
        },
      },
      merchant: {
        title: "Мерчант",
        data: {
          labels: [],
          datasets: [
            {
              label: "2023",
              data: [],
              backgroundColor: "#3461eb",
            },
          ],
        },
      },
      deliveryRate: {
        title: "Хүргэлтийн хувь",
        data: {
          labels: [],
          datasets: [
            {
              label: "2023",
              data: [],
              backgroundColor: "#3461eb",
            },
          ],
        },
      },
    };

    const totalOrderAmount = [];
    const totalDeliveredAmount = [];
    const uniqueMerchantCount = [];
    const totalDeliveryRate = [];

    for (let i = 1; i <= 12; i++) {
      let currentOrders = orders[i];

      if (currentVendor.id) {
        currentOrders = currentOrders.filter((order) => order.supplier_id === currentVendor.id);
      }

      if (currentStatus > 0) {
        currentOrders = currentOrders.filter((order) => order.status === currentStatus);
      }

      const calculatedTotalAmount = currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0);
      const calculatedDeliverdAmount = currentOrders
        .filter((order) => order.status === 3)
        .reduce((acc, cur) => acc + cur.grand_total, 0);

      totalOrderAmount.push(calculatedTotalAmount);
      totalDeliveredAmount.push(calculatedDeliverdAmount);
      uniqueMerchantCount.push(countUnique(currentOrders.map((order) => order.customer_id)));
      totalDeliveryRate.push((calculatedDeliverdAmount * 100) / calculatedTotalAmount);
    }

    for (const key in result) {
      const chartData = result[key].data;
      chartData.labels = currentMonth < 13 ? [monthLabels[currentMonth - 1]] : monthLabels;
      chartData.datasets[0].barPercentage = currentMonth < 13 ? 0.2 : 1;

      switch (key) {
        case "totalAmount":
          chartData.datasets[0].data =
            currentMonth < 13 ? [totalOrderAmount[currentMonth - 1]] : totalOrderAmount;
          break;
        case "deliveredAmount":
          chartData.datasets[0].data =
            currentMonth < 13 ? [totalDeliveredAmount[currentMonth - 1]] : totalDeliveredAmount;
          break;
        case "merchant":
          chartData.datasets[0].data =
            currentMonth < 13 ? [uniqueMerchantCount[currentMonth - 1]] : uniqueMerchantCount;
          break;
        case "deliveryRate":
          chartData.datasets[0].data =
            currentMonth < 13 ? [totalDeliveryRate[currentMonth - 1]] : totalDeliveryRate;
          result[key].maxScale = 100;
          break;
        default:
          break;
      }
    }

    return result;
  }, [currentMonth, orders, currentStatus, currentVendor]);

  return (
    <>
      <FilterHeader removeMonth />

      <div className={classes.kpiContent}>
        {Object.keys(barStats).map((key, index) => {
          return (
            <div key={`kpi-bar-${index}`} className={classes.barWrapper}>
              <h1 className={classes.title}>{barStats[key].title}</h1>
              <KPIBarChart
                key={`kpi-bar-chart-${index}`}
                data={barStats[key].data}
                maxScale={barStats[key].maxScale}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
