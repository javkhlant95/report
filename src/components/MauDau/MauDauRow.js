import classes from "./MauDauRow.module.css";

export const MauDauRow = ({ monthlyRowStats, dailyRowStats }) => {
  return (
    <div className={classes.row}>
      {Object.keys(monthlyRowStats).map((key, index) => {
        return (
          <div key={`mau-dau-monthly-row-${index}`} className={classes.monthSingleBox}>
            <p className={classes.monthBoxTitle}>{monthlyRowStats[key].title}</p>
            <h3 className={classes.monthBoxContent}>{monthlyRowStats[key].data}</h3>
          </div>
        );
      })}
      {Object.keys(dailyRowStats).map((key, index) => {
        return (
          <div key={`mau-dau-daily-row-${index}`} className={classes.dailySingleBox}>
            <p className={classes.dailyBoxTitle}>{dailyRowStats[key].title}</p>
            <h3 className={classes.dailyBoxContent}>{dailyRowStats[key].data}</h3>
          </div>
        );
      })}
    </div>
  );
};
