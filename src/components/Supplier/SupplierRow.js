import classes from "./SupplierRow.module.css";

export const SupplierRow = ({ data }) => {
  return (
    <div className={classes.stats}>
      {Object.keys(data).map((key, index) => {
        const stat = data[key];

        return (
          <div key={`stat-box-${index}`} className={classes.singleStat}>
            <h2>{stat.label}</h2>
            <h1
              style={{
                color: stat.goal ? (stat.goal > stat.data ? "#D64554" : "#1AAB40") : "inherit",
              }}
            >
              {stat.data >= 1_000_000 ? Math.round(stat.data / 1_000_000) + "M" : stat.data}
            </h1>
            {stat.goal > 0 && (
              <p>Goals: {stat.goal >= 1_000_00 ? stat.goal / 1_000_000 + "M" : stat.goal}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
