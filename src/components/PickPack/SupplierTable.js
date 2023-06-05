import classes from "./SupplierTable.module.css";

export const SupplierTable = () => {
  return (
    <div className={classes.container}>
      <div className={classes.tableWrapper}>
        <div className={classes.tableHead}>
          <button>Бүтээгдэхүүний нэр</button>
          <button>Qty</button>
          <button>Total</button>
          <button>Үлдэгдэл</button>
          <button>Зохистой хэмжээ</button>
          <button>Аюулгүй нөөц</button>
        </div>
        <div className={classes.tableBody}>
          {Array.from(Array(100)).map((val, index) => {
            return (
              <div className={classes.tableRow}>
                <span className={classes.label}>00-ын цаас Өд цагаан</span>
                <span>15</span>
                <span>20,000</span>
                <span>17</span>
                <span>21</span>
                <span>4</span>
              </div>
            );
          })}
        </div>
        <div className={classes.tableFooter}>
          <span className={classes.total}>Total</span>
          <span>61,341</span>
          <span>203,061,745</span>
          <span>25692</span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
