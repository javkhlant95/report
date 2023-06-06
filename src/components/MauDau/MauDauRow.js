import classes from "./MauDauRow.module.css";

export const MauDauRow = ({ monthlyStats }) => {
  return (
    <div className={classes.row}>
      {Object.keys(monthlyStats).map((key, index) => {
        const stat = Math.round(monthlyStats[key].stat);
        return (
          <div key={`monthly-stat-${index}`} className={classes.monthSingleBox}>
            <p className={classes.monthBoxTitle}>{monthlyStats[key].title}</p>
            <h3 className={classes.monthBoxContent}>
              {stat >= 1_000_000 ? Math.round(stat / 1_000_000) + "M" : stat}
            </h3>
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
