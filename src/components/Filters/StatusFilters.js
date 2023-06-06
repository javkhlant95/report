import { useState } from "react";
import classes from "./StatusFilters.module.css";

export const StatusFilters = ({ statuses, currentStatus, setCurrentStatus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={classes.statusFilters}>
      {currentIndex !== 0 && (
        <button onClick={() => setCurrentIndex(currentIndex - 1)} className={classes.chevronLeft}>
          <img src="/icons/chevron-left.svg" alt="Left Chevron" />
        </button>
      )}

      {statuses.slice(currentIndex, currentIndex + 2).map((status) => {
        return (
          <button
            onClick={() =>
              setCurrentStatus(currentStatus === status.OrderStatusID ? 0 : status.OrderStatusID)
            }
            key={`status-filter-${status.OrderStatusID}`}
            className={`${classes.singleStatus} ${
              currentStatus === status.OrderStatusID ? classes.active : null
            }`}
          >
            {status.Name}
          </button>
        );
      })}

      {currentIndex !== statuses.length - 2 && (
        <button onClick={() => setCurrentIndex(currentIndex + 1)} className={classes.chevronRight}>
          <img src="/icons/chevron-right.svg" alt="Right Chevron" />
        </button>
      )}
    </div>
  );
};
