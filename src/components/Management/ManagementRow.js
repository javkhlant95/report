import classes from "./ManagementRow.module.css";

export const ManagementRow = ({ stat, label, labelColor }) => {
  return (
    <div className={classes.row}>
      <h1 style={{ color: labelColor }} className={classes.title}>
        Сарын гүйцэтгэл /{label}/
      </h1>
      <div className={classes.boxs}>
        {Object.keys(stat).map((key, index) => {
          return (
            <div key={`stat-box-${index}`} className={classes.singleBox}>
              <h2 className={classes.boxTitle}>{stat[key].label}</h2>
              <h1 className={classes.boxContent}>
                {stat[key].stat >= 1_000_000
                  ? Math.round(stat[key].stat / 1_000_000) + "M"
                  : stat[key].stat}
              </h1>
              {stat[key].goal && (
                <p className={classes.boxGoal}>Goal: 1,400M</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
