import { useEffect, useState } from "react";
import classes from "./SupplierScreen.module.css";
import { SupplierTable } from "../components/Supplier/SupplierTable";
import { TypeChart } from "../components/Supplier/TypeChart";
import { FilterHeader } from "../components/Filters";
import { MerchantTable } from "../components/Supplier/MerchantTable";
import { countUnique } from "../utils/countUnique";

export const SupplierScreen = ({ orders, vendors, merchants, statuses }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentStatus, setCurrentStatus] = useState(0);

  const [states, setStates] = useState([]);
  const [avStatuses, setAvStatuses] = useState([]);

  const [totalStat, setTotalStat] = useState({});
  const [vendorStat, setVendorStat] = useState([]);
  const [typeStat, setTypeStat] = useState({ gtAmount: 0, horecaAmount: 0 });
  const [merchantStat, setMerchantStat] = useState([]);

  const calculateRow = () => {
    const currentOrders = orders[currentMonth];

    const newTotalStat = {
      total: {
        stat:
          currentStatus === 0
            ? currentOrders.length
            : currentOrders.filter((order) => order.status === currentStatus).length,
        label: "Захиалга",
      },
      totalAmount: {
        stat:
          currentStatus === 0
            ? currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0)
            : currentOrders
                .filter((order) => order.status === currentStatus)
                .reduce((acc, cur) => acc + cur.grand_total, 0),
        label: "Нийт дүн",
      },
      delivered: {
        label: "Хүргэсэн",
        stat:
          currentStatus === 0
            ? currentOrders
                .filter((order) => order.status === 3)
                .reduce((acc, cur) => acc + cur.grand_total, 0)
            : currentOrders
                .filter((order) => order.status === currentStatus)
                .filter((order) => order.status === 3)
                .reduce((acc, cur) => acc + cur.grand_total, 0),
        goal: 1_392_000_000,
      },
      customers: {
        label: "Идэвхитэй харилцагч",
        stat:
          currentStatus === 0
            ? countUnique(currentOrders.map((order) => order.customer_id))
            : countUnique(
                currentOrders
                  .filter((order) => order.status === currentStatus)
                  .map((order) => order.customer_id)
              ),
      },
      suppliers: {
        label: "Нийлүүлэгч",
        stat:
          currentStatus === 0
            ? countUnique(currentOrders.map((order) => order.supplier_id))
            : countUnique(
                currentOrders
                  .filter((order) => order.status === currentStatus)
                  .map((order) => order.supplier_id)
              ),
      },
      deliveryRate: {
        label: "Хүргэлтийн хувь",
        stat:
          (currentStatus === 0
            ? Math.round(
                (currentOrders
                  .filter((order) => order.status === 3)
                  .reduce((acc, cur) => acc + cur.grand_total, 0) *
                  100) /
                  currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0)
              ) || 0
            : Math.round(
                (currentOrders
                  .filter((order) => order.status === currentStatus)
                  .filter((order) => order.status === 3)
                  .reduce((acc, cur) => acc + cur.grand_total, 0) *
                  100) /
                  currentOrders
                    .filter((order) => order.status === currentStatus)
                    .reduce((acc, cur) => acc + cur.grand_total, 0)
              ) || 0) + "%",
      },
    };
    setTotalStat(newTotalStat);
  };

  const calculateVendors = () => {
    const newVendorStats = [];

    for (const vendor of vendors) {
      const stat = {
        name: vendor.name,
        total: 0,
        delivered: 0,
        canceled: 0,
        order: 0,
        merchants: 0,
        rate: 0,
      };

      const merchants = [];

      for (const order of orders[currentMonth]) {
        if (order.supplier_id === vendor.id) {
          merchants.push(order.customer_id);
          stat.total += order.grand_total;
          stat.order++;
          if (order.status === 3) {
            stat.delivered += order.grand_total;
          }
          if (order.status === 5) {
            stat.canceled += order.grand_total;
          }
        }
      }

      stat.rate = (stat.delivered * 100) / stat.total;
      stat.merchants = countUnique(merchants);

      newVendorStats.push(stat);
    }

    let result;
    if (currentStatus === 0) {
      result = newVendorStats.filter((stat) => stat.total !== 0);
    } else if (currentStatus === 3) {
      result = newVendorStats
        .filter((stat) => stat.total !== 0)
        .filter((stat) => stat.delivered > 0);
    } else if (currentStatus === 5) {
      result = newVendorStats
        .filter((stat) => stat.total !== 0)
        .filter((stat) => stat.canceled > 0);
    }

    setVendorStat(result);
  };

  const calculateType = () => {
    const newTypeStat = { ...typeStat };

    const gtIds = ["1", "2", "3", "4", "5"];
    const horekaIds = ["6", "7", "8", "9", "10", "11", "12", "13", "14"];

    if (currentStatus === 0) {
      newTypeStat.gtAmount = orders[currentMonth]
        .filter((order) => gtIds.includes(order.business_type_id))
        .reduce((acc, cur) => acc + cur.grand_total, 0);
      newTypeStat.horecaAmount = orders[currentMonth]
        .filter((order) => horekaIds.includes(order.business_type_id))
        .reduce((acc, cur) => acc + cur.grand_total, 0);
    } else {
      newTypeStat.gtAmount = orders[currentMonth]
        .filter((order) => gtIds.includes(order.business_type_id))
        .filter((order) => order.status === currentStatus)
        .reduce((acc, cur) => acc + cur.grand_total, 0);
      newTypeStat.horecaAmount = orders[currentMonth]
        .filter((order) => horekaIds.includes(order.business_type_id))
        .filter((order) => order.status === currentStatus)
        .reduce((acc, cur) => acc + cur.grand_total, 0);
    }

    setTypeStat(newTypeStat);
  };

  const calculateMerchant = () => {
    const newMerchantStat = [];

    for (const merchant of merchants) {
      const stat = {
        name: merchant.tradeshop_name,
        total: 0,
        order: 0,
        rate: 0,
      };

      for (const order of orders[currentMonth]) {
        if (order.tradeshop_id === merchant.tradeshop_id) {
          stat.total += order.grand_total;
          stat.order++;
        }
      }

      newMerchantStat.push(stat);
    }

    setMerchantStat(newMerchantStat.filter((stat) => stat.total !== 0));
  };

  useEffect(() => {
    const newStatuses = [];

    for (const status of statuses) {
      if (status.OrderStatusID === 3 || status.OrderStatusID === 5) newStatuses.push(status);
    }

    setAvStatuses(newStatuses);
  }, [statuses]);

  useEffect(() => {
    calculateMerchant();
  }, [currentMonth, orders[currentMonth], merchants]);

  useEffect(() => {
    calculateVendors();
    calculateRow();
    calculateType();
  }, [currentMonth, orders[currentMonth], currentStatus]);

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader
        vendors={vendors}
        states={states}
        statuses={avStatuses}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />

      <div className={classes.suppliersContent}>
        <div className={classes.stats}>
          {Object.keys(totalStat).map((key, index) => {
            const stat = totalStat[key];

            return (
              <div key={`stat-box-${index}`} className={classes.singleStat}>
                <h2>{stat.label}</h2>
                <h1
                  style={{
                    color: stat.goal ? (stat.goal > stat.stat ? "#D64554" : "#1AAB40") : "inherit",
                  }}
                >
                  {stat.stat >= 1_000_000 ? Math.round(stat.stat / 1_000_000) + "M" : stat.stat}
                </h1>
                {stat.goal && (
                  <p>Goal: {stat.goal >= 1_000_00 ? stat.goal / 1_000_000 + "M" : stat.goal}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className={classes.contentWrapper}>
          <SupplierTable vendorStat={vendorStat} />

          <div className={classes.leftContentWrapper}>
            <TypeChart typeStat={typeStat} />
            <MerchantTable merchantStat={merchantStat} />
          </div>
        </div>
      </div>
    </div>
  );
};
