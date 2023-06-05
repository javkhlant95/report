import classes from "./MerchantTable.module.css";

export const MerchantTable = () => {
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
          {Array.from(Array(100)).map((val, index) => {
            return (
              <div key={`table-row-${index}`} className={classes.tableRow}>
                <span>Олимп супермаркет</span>
                <span>9,581,600</span>
                <span>4</span>
                <span>58.6%</span>
              </div>
            );
          })}
        </div>

        <div className={classes.tableFooter}>
          <span>Total</span>
          <span>125,297,346</span>
          <span>266</span>
          <span>47,3%</span>
        </div>
      </div>
    </div>
  );
};
