import { useEffect, useState } from "react";
import classes from "./MerchantTable.module.css";

export const MerchantTable = ({ merchantStat }) => {
  const [stats, setStats] = useState(merchantStat);

  const [total, setTotal] = useState({
    totalAmount: 0,
    orderAmount: 0,
  });

  useEffect(() => {
    const newTotal = { ...total };
    for (const stat of merchantStat) {
      newTotal.totalAmount += stat.total;
      newTotal.orderAmount += stat.order;
    }

    setTotal(newTotal);
    setStats(merchantStat);
  }, [merchantStat]);

  return (
    <div className={classes.tableWrapper}>
      <div className={classes.table}>
        <div className={classes.tableHead}>
          <button>Merchant</button>
          <button>Total</button>
          <button>Order</button>
          <button>Rate</button>
        </div>

        <div className={classes.tableBody}>
          {stats.map((stat, index) => {
            return (
              <div key={`table-row-${index}`} className={classes.tableRow}>
                <span>{stat.name}</span>
                <span>{stat.total}</span>
                <span>{stat.order}</span>
                <span>58.6%</span>
              </div>
            );
          })}
        </div>

        <div className={classes.tableFooter}>
          <span>Total</span>
          <span>{total.totalAmount}</span>
          <span>{total.orderAmount}</span>
          <span>47,3%</span>
        </div>
      </div>
    </div>
  );
};
