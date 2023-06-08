import classes from "./ManagementRow.module.css";

export const ManagementRow = ({ data, title, labelColor }) => {
  return (
    <div className={classes.row}>
      <h1 style={{ color: labelColor }} className={classes.title}>
        Сарын гүйцэтгэл /{title}/
      </h1>
      <div className={classes.boxs}>
        {Object.keys(data).map((key, index) => {
          return (
            <div key={`stat-box-${index}`} className={classes.singleBox}>
              <h2>{data[key].label}</h2>
              <h1>
                {data[key].stat >= 1_000_000
                  ? Math.round(data[key].stat / 1_000_000) + "M"
                  : data[key].stat}
              </h1>
              {data[key].goal > 0 && <p>Goal: 1,400M</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
