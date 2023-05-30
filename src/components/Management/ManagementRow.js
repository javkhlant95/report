import classes from "./ManagementRow.module.css";

export const ManagementRow = () => {
  return (
    <div className={classes.row}>
      <h1 className={classes.title}>Сарын гүйцэтгэл</h1>
      <div className={classes.boxs}>
        {Array.from(Array(7)).map((val) => {
          return (
            <div className={classes.singleBox}>
              <p className={classes.boxTitle}>Захиалга</p>
              <h3 className={classes.boxContent}>257</h3>
              <span className={classes.boxGoal}>Goal: 1,400M</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
