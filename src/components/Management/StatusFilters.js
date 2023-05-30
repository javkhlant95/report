import classes from "./StatusFilters.module.css";

export const StatusFilters = () => {
  const statuses = ["Хүлээгдэж буй", "Хүргэсэн", "Цуцлагдсан"];

  return (
    <div className={classes.statusFilters}>
      {statuses.map((status, index) => {
        return (
          <button className={classes.singleStatus} key={`status-filter-${index}`}>
            {status}
          </button>
        );
      })}
    </div>
  );
};
