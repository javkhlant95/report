import classes from "./PickPackRow.module.css";

export const PickPackRow = () => {
  return (
    <div className={classes.stats}>
      {Array.from(Array(7)).map((val, index) => {
        return (
          <div className={classes.singleStat}>
            <h2>Захиалга</h2>

            <h1>2174</h1>

            {index === 1 && <p>0</p>}
          </div>
        );
      })}
    </div>
  );
};
