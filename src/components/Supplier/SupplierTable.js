import classes from "./SupplierTable.module.css";

export const SupplierTable = () => {
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
        {Array.from(Array(1000)).map((val, index) => {
          return (
            <div className={classes.tableRow}>
              <span>Шуурхай түгээлт</span>
              <span>203,061,745</span>
              <span>183,819,275</span>
              <span>19,242,470</span>
              <span>580</span>
              <span>173</span>
              <span>90.5%</span>
            </div>
          );
        })}
      </div>

      <div className={classes.tableFooter}>
        <span>Total</span>
        <span>912,758,125</span>
        <span>774,886,265</span>
        <span>134,231,921</span>
        <span>2166</span>
        <span>278</span>
        <span>84,9%</span>
      </div>
    </div>
  );
};
