import { useEffect, useState } from "react";
import classes from "./SupplierScreen.module.css";
import { SupplierTable } from "../components/Supplier/SupplierTable";
import { TypeChart } from "../components/Supplier/TypeChart";
import { FilterHeader } from "../components/Filters";
import { MerchantTable } from "../components/Supplier/MerchantTable";
import { countUnique } from "../utils/countUnique";

export const SupplierScreen = ({ orders }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const [vendors, setVendors] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [states, setStates] = useState([]);

  const [totalStat, setTotalStat] = useState({});

  const calculate = () => {
    const currentOrders = orders[currentMonth];

    const newTotalStat = {
      total: { stat: currentOrders.length, label: "Захиалга" },
      totalAmount: {
        stat: currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0),
        label: "Нийт дүн",
      },
      delivered: {
        label: "Хүргэсэн",
        stat: currentOrders
          .filter((order) => order.status === 3)
          .reduce((acc, cur) => acc + cur.grand_total, 0),
      },
      customers: {
        label: "Идэвхитэй харилцагч",
        stat: countUnique(currentOrders.map((order) => order.customer_id)),
      },
      suppliers: {
        label: "Нийлүүлэгч",
        stat: countUnique(currentOrders.map((order) => order.supplier_id)),
      },
      deliveryRate: {
        label: "Хүргэлтийн хувь",
        stat:
          (Math.round(
            (currentOrders.filter((order) => order.status === 3).length * 100) /
              currentOrders.length
          ) || 0) + "%",
      },
    };
    setTotalStat(newTotalStat);
  };

  useEffect(() => {
    calculate();
  }, [currentMonth, orders[currentMonth]]);

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader
        vendors={vendors}
        states={states}
        statuses={statuses}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <div className={classes.suppliersContent}>
        <div className={classes.stats}>
          {Object.keys(totalStat).map((key, index) => {
            return (
              <div key={`stat-box-${index}`} className={classes.singleStat}>
                <h2>{totalStat[key].label}</h2>
                <h1>
                  {totalStat[key].stat >= 1_000_000
                    ? Math.round(totalStat[key].stat / 1_000_000) + "M"
                    : totalStat[key].stat}
                </h1>
                {totalStat[key].goal && <p>Goal: 1,400M</p>}
              </div>
            );
          })}
        </div>

        <div className={classes.contentWrapper}>
          <SupplierTable />

          <div className={classes.leftContentWrapper}>
            <TypeChart />
            <MerchantTable />
          </div>
        </div>
      </div>
    </div>
  );
};
