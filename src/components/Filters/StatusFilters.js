import classes from "./StatusFilters.module.css";
import { useContext, useMemo, useState } from "react";
import { Context } from "../../contexts/Context";

export const StatusFilters = () => {
  const { statuses, currentStatus, setCurrentStatus, currentMonth, orders, currentVendor } =
    useContext(Context);

  const [currentIndex, setCurrentIndex] = useState(0);

  const usedStatuses = useMemo(() => {
    const result = [];

    let currentOrders = [];

    if (currentMonth < 13) {
      currentOrders = orders[currentMonth];
    } else {
      Object.keys(orders).map((key) => {
        currentOrders = [...currentOrders, ...orders[key]];
      });
    }

    if (currentVendor.id) {
      currentOrders = currentOrders.filter((order) => order.supplier_id === currentVendor.id);
    }

    for (const status of statuses) {
      for (const order of currentOrders) {
        if (status.OrderStatusID === order.status) {
          result.push(status);
          break;
        }
      }
    }

    setCurrentIndex(0);

    return result;
  }, [orders, currentMonth, statuses, currentVendor]);

  return (
    <div className={classes.statusFilters}>
      {currentIndex !== 0 && usedStatuses.length !== 0 && (
        <button onClick={() => setCurrentIndex(currentIndex - 1)} className={classes.chevronLeft}>
          <img src="/icons/chevron-left.svg" alt="Left Chevron" />
        </button>
      )}

      {usedStatuses.slice(currentIndex, currentIndex + 2).map((status) => {
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

      {currentIndex !== usedStatuses.length - 2 && usedStatuses.length !== 0 && (
        <button onClick={() => setCurrentIndex(currentIndex + 1)} className={classes.chevronRight}>
          <img src="/icons/chevron-right.svg" alt="Right Chevron" />
        </button>
      )}
    </div>
  );
};
