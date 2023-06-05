import classes from "./ManagementScreen.module.css";
import { useEffect, useState } from "react";
import { ManagementRow } from "../components/Management/ManagementRow";
import { FilterHeader } from "../components/Filters";

const countUnique = (arr) => {
  return new Set(arr).size;
};

export const ManagementScreen = ({ orders, vendors }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const [states, setStates] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [totalStat, setTotalStat] = useState({});

  const calculate = () => {
    const currentOrders = orders[currentMonth];

    const gtIds = ["1", "2", "3", "4", "5"];
    const horekaIds = ["6", "7", "8", "9", "10", "11", "12", "13", "14"];

    const gtOrders = currentOrders.filter((order) =>
      gtIds.includes(order.business_type_id)
    );

    const horekaOrders = currentOrders.filter((order) =>
      horekaIds.includes(order.business_type_id)
    );

    const shuurkhaiOrders = currentOrders.filter(
      (order) => order.supplier_id === 13884
    );

    const shuurkhaiOrderVendors = [];

    shuurkhaiOrders.map((order) => {
      order.line.map((product) => {
        product.vendor && shuurkhaiOrderVendors.push(product.vendor);
      });
    });

    const otherOrders = currentOrders.filter(
      (order) => order.supplier_id !== 13884
    );

    const newTotalStat = {
      all: {
        label: "Нийт",
        labelColor: "#2EAE70",
        data: {
          total: { stat: currentOrders.length, label: "Захиалга" },
          totalAmount: {
            stat: currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0),
            label: "Нийт дүн",
          },
          delivered: {
            label: "Хүргэсэн",
            stat: currentOrders
              .filter((order) => order.status === 3)
              .reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          customers: {
            label: "Идэвхитэй харилцагч",
            stat: countUnique(currentOrders.map((order) => order.customer_id)),
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: countUnique(currentOrders.map((order) => order.supplier_id)),
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat:
              (Math.round(
                (currentOrders.filter((order) => order.status === 3).length *
                  100) /
                  currentOrders.length
              ) || 0) + "%",
          },
        },
      },
      gt: {
        label: "GT",
        labelColor: "#414FB1",
        data: {
          total: {
            label: "Захиалга",
            stat: gtOrders.length,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: gtOrders.reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          delivered: {
            label: "Хүргэсэн",
            stat: gtOrders
              .filter((order) => order.status === 3)
              .reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          customers: {
            label: "Идэвхитэй харилцагч",
            stat: countUnique(gtOrders.map((order) => order.customer_id)),
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: countUnique(gtOrders.map((order) => order.supplier_id)),
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat:
              (Math.round(
                (gtOrders.filter((order) => order.status === 3).length * 100) /
                  gtOrders.length
              ) || 0) + "%",
          },
        },
      },
      horeka: {
        label: "Хореке",
        labelColor: "#9071CE",
        data: {
          total: {
            label: "Захиалга",
            stat: horekaOrders.length,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: horekaOrders.reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          delivered: {
            label: "Хүргэсэн",
            stat: horekaOrders
              .filter((order) => order.status === 3)
              .reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          customers: {
            label: "Идэвхитэй харилцагч",
            stat: countUnique(horekaOrders.map((order) => order.customer_id)),
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: countUnique(horekaOrders.map((order) => order.supplier_id)),
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat:
              (Math.round(
                (horekaOrders.filter((order) => order.status === 3).length *
                  100) /
                  horekaOrders.length
              ) || 0) + "%",
          },
        },
      },
      shuurkhai: {
        label: "Шуурхай түгээлт",
        labelColor: "#41A4FF",
        data: {
          total: {
            label: "Захиалга",
            stat: shuurkhaiOrders.length,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: shuurkhaiOrders.reduce(
              (acc, cur) => acc + cur.grand_total,
              0
            ),
          },
          delivered: {
            label: "Хүргэсэн",
            stat: shuurkhaiOrders
              .filter((order) => order.status === 3)
              .reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          customers: {
            label: "Идэвхитэй харилцагч",
            stat: countUnique(
              shuurkhaiOrders.map((order) => order.customer_id)
            ),
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: countUnique(shuurkhaiOrderVendors),
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat:
              (Math.round(
                (shuurkhaiOrders.filter((order) => order.status === 3).length *
                  100) /
                  shuurkhaiOrders.length
              ) || 0) + "%",
          },
        },
      },
      others: {
        label: "Шуурхай түгээлтээс бусад",
        labelColor: "#20ADC9",
        data: {
          total: {
            label: "Захиалга",
            stat: otherOrders.length,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: otherOrders.reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          delivered: {
            label: "Хүргэсэн",
            stat: otherOrders
              .filter((order) => order.status === 3)
              .reduce((acc, cur) => acc + cur.grand_total, 0),
          },
          customers: {
            label: "Идэвхитэй харилцагч",
            stat: countUnique(otherOrders.map((order) => order.customer_id)),
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: countUnique(otherOrders.map((order) => order.supplier_id)),
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat:
              (Math.round(
                (otherOrders.filter((order) => order.status === 3).length *
                  100) /
                  otherOrders.length
              ) || 0) + "%",
          },
        },
      },
    };

    setTotalStat(newTotalStat);
  };

  useEffect(() => {
    calculate();
  }, [currentMonth, orders[currentMonth]]);

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader
        vendors={vendors}
        states={states}
        statuses={statuses}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <div className={classes.managementContent}>
        {Object.keys(totalStat).map((key, index) => {
          return (
            <ManagementRow
              key={`management-row-${index}`}
              stat={totalStat[key].data}
              label={totalStat[key].label}
              labelColor={totalStat[key].labelColor}
            />
          );
        })}
      </div>
    </div>
  );
};
