import classes from "./ManagementRow.module.css";

export const ManagementRow = ({ stat, label }) => {
  return (
    <div className={classes.row}>
      <h1 className={classes.title}>Сарын гүйцэтгэл /{label}/</h1>
      <div className={classes.boxs}>
        {Object.keys(stat).map((key, index) => {
          return (
            <div key={`stat-box-${index}`} className={classes.singleBox}>
              <p className={classes.boxTitle}>{stat[key].label}</p>
              <h3 className={classes.boxContent}>
                {stat[key].stat >= 1_000_000
                  ? Math.round(stat[key].stat / 1_000_000) + "M"
                  : stat[key].stat}
              </h3>
              {stat[key].goal && (
                <span className={classes.boxGoal}>Goal: 1,400M</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
