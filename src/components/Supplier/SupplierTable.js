import { useEffect, useState } from "react";
import classes from "./SupplierTable.module.css";

export const SupplierTable = ({ vendorStat }) => {
  const [total, setTotal] = useState({
    totalAmount: 0,
    deliveredAmount: 0,
    canceledAmount: 0,
    order: 0,
    merchants: 0,
    rate: 0,
  });

  useEffect(() => {
    const newTotal = { ...total };

    let totalRate = 0;

    for (const stat of vendorStat) {
      newTotal.totalAmount += stat.total;
      newTotal.deliveredAmount += stat.delivered;
      newTotal.canceledAmount += stat.canceled;
      newTotal.order += stat.order;
      newTotal.merchants += stat.merchants;
      totalRate += stat.rate;
    }

    newTotal.rate =
      totalRate / vendorStat.filter((stat) => stat.rate > 0).length;

    setTotal(newTotal);
  }, [vendorStat]);

  return (
    <div className={classes.tableWrapper}>
      <div className={classes.tableHead}>
        <button>Нийлүүлэгч</button>
        <button>Нийт</button>
        <button>Хүргэсэн</button>
        <button>Цуцлагдсан</button>
        <button>Захиалга</button>
        <button>Харилцагч</button>
        <button>Хүргэлтийн хувь</button>
      </div>

      <div className={classes.tableBody}>
        {vendorStat.map((stat, index) => {
          return (
            <div key={`vendor-stat-${index}`} className={classes.tableRow}>
              <span>{stat.name}</span>
              <span>{stat.total}</span>
              <span>{stat.delivered}</span>
              <span>{stat.canceled}</span>
              <span>{stat.order}</span>
              <span>{stat.merchants}</span>
              <span>{stat.rate.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>

      <div className={classes.tableFooter}>
        <span>Total</span>
        <span>{total.totalAmount}</span>
        <span>{total.deliveredAmount}</span>
        <span>{total.canceledAmount}</span>
        <span>{total.order}</span>
        <span>{total.merchants}</span>
        <span>{total.rate.toFixed(1)}%</span>
      </div>
    </div>
  );
};
