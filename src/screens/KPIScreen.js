import classes from "./KPIScreen.module.css";
import { VendorFilter } from "../components/KPI/VendorFilter";
import { KPIBarChart } from "../components/KPI/KPIBarChart";
import { useEffect, useState } from "react";





export const KPIScreen = () => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const res = await fetch(`https://api2.ebazaar.mn/api/orders?order_start=2023-05-01&order_end=2023-05-02&page=all`, {
        method: "GET",
        headers: {
          ebazaar_token: localStorage.getItem("ebazaar_token")
        }
        
      })
      const data = await res.json();

      setOrders(data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchOrders();
  },[])

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
  ])
  
  // const NUMBER_BN = { min: 0, max: 6 };
  
  const totalAmount = {
    labels,
    datasets: [
      {
        label: "2022",
        data: labels.map(() => Math.round(Math.random() * 70)),
        backgroundColor: "#93eb34",
      },
      {
        label: "2023",
        data: orders.length > 0 ? [0, 0, 0, 0, orders.reduce((acc, cur) => acc + cur.grand_total, 0)] : [],
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
        data: orders.length > 0 ? [0, 0, 0, 0, orders.filter((order) => order.status === 3).reduce((acc, cur) => acc + cur.grand_total, 0)]: [],
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
        data: orders.length > 0 ? [0, 0, 0, 0, Math.round(orders.filter((order) => order.status === 3).length * 100 / orders.length)] : [],
        backgroundColor: "#3461eb",
      },
      {
        label: "Хувь",
        data: labels.map(() => Math.round(Math.random() * 50)),
        backgroundColor: "#9934eb",
      },
    ],
  };

  const datas = [totalAmount, deliveredAmount, merchant, deliveryRate];

  
console.log(orders)

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

      <div className={classes.kpiContent}>
        {datas.map((data, index) => {
          return (
            <div className={classes.barWrapper}>
              <h1 className={classes.title}>Нийт дүн</h1>
              <KPIBarChart key={`kpi-bar-chart-${index}`} data={data} />;
            </div>
          );
        })}
      </div>
    </>
  );
};
