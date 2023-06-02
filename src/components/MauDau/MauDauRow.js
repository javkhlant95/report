import classes from "./MauDauRow.module.css";

export const MauDauRow = () => {
  return (
    <div className={classes.row}>
      {Array.from(Array(3)).map((val) => {
        return (
          <div className={classes.monthSingleBox}>
            <p className={classes.monthBoxTitle}>Сарын дундаж мерчант</p>
            <h3 className={classes.monthBoxContent}>257</h3>
          </div>
        );
      })}
      {Array.from(Array(3)).map((val) => {
        return (
          <div className={classes.dailySingleBox}>
            <p className={classes.dailyBoxTitle}>Сарын дундаж мерчант</p>
            <h3 className={classes.dailyBoxContent}>257</h3>
          </div>
        );
      })}
    </div>
  );
};
