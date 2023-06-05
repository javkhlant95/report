import classes from "./Report.module.css";
import { useEffect, useState } from "react";
import {
  ManagementScreen,
  KPIScreen,
  SupplierScreen,
  MauDauScreen,
  PickPackScreen,
} from "./screens";
import { MonthProvider } from "./contexts/MonthContext";

export const Report = () => {
  const [orders, setOrders] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  });

  const fetchOrders = async () => {
    try {
      const currentMonth = new Date().getMonth() + 1;

      for (let i = currentMonth; i >= 1; i--) {
        const res = await fetch(
          "https://api2.ebazaar.mn/api/order/duplicate/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ebazaar_token: localStorage.getItem("ebazaar_token"),
            },
            body: JSON.stringify({
              start_date: `2023-${i}-01`,
              end_date: `2023-${i}-31`,
              projection: {
                order_id: 1,
                supplier_id: 1,
                customer_id: 1,
                line: 1,
                grand_total: 1,
                status: 1,
                business_type_id: 1,
                order_date: 1,
              },
            }),
          }
        );

        const data = await res.json();

        setOrders((prev) => ({ ...prev, [i]: data }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const tabs = [
    {
      title: "Management",
      content: <ManagementScreen orders={orders} />,
    },
    {
      title: "KPI",
      content: <KPIScreen />,
    },
    { title: "MAU/DAU", content: <MauDauScreen /> },
    { title: "Supplier", content: <SupplierScreen /> },
    { title: "PickPack", content: <PickPackScreen /> },
  ];
  const [activeTab, setActiveTab] = useState("Management");

  return (
    <MonthProvider>
      <div className={classes.report}>
        <div className={classes.tabs}>
          {tabs.map((tab, index) => {
            return (
              <button
                onClick={() => setActiveTab(tab.title)}
                className={`${classes.singleTab} ${
                  tab.title === activeTab ? classes.active : null
                }`}
                key={`tab-${index}`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
        <div className={classes.content}>
          {tabs.find((tab) => tab.title === activeTab).content}
        </div>
      </div>
    </MonthProvider>
  );
};
