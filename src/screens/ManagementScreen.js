import classes from "./ManagementScreen.module.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { ManagementRow } from "../components/Management/ManagementRow";
import { FilterHeader } from "../components/Filters";
import { countUnique } from "../utils/countUnique";
import { Context } from "../contexts/Context";

export const ManagementScreen = () => {
  const {
    orders,
    currentMonth,
    setCurrentMonth,
    currentStatus,
    setCurrentStatus,
    currentVendor,
    setCurrentVendor,
  } = useContext(Context);

  const rowStats = useMemo(() => {
    const result = {
      total: {
        labelColor: "#2EAE70",
        filter: "all",
        title: "Нийт",
        data: {
          order: {
            label: "Захиалга",
            stat: 0,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: 0,
          },
          deliveredAmount: {
            label: "Хүргэсэн",
            stat: 0,
          },
          activeCustomers: {
            label: "Идэвхитэй харилцагч",
            stat: 0,
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: 0,
          },
          orderFrequency: {
            label: "Захиалгын давтамж",
            stat: 0,
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat: "0%",
          },
        },
      },
      gt: {
        labelColor: "#414FB1",
        filter: "gt",
        title: "GT",
        data: {
          order: {
            label: "Захиалга",
            stat: 0,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: 0,
          },
          deliveredAmount: {
            label: "Хүргэсэн",
            stat: 0,
          },
          activeCustomers: {
            label: "Идэвхитэй харилцагч",
            stat: 0,
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: 0,
          },
          orderFrequency: {
            label: "Захиалгын давтамж",
            stat: 0,
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat: "0%",
          },
        },
      },
      horeca: {
        labelColor: "#9071CE",
        filter: "horeca",
        title: "Хореке",
        data: {
          order: {
            label: "Захиалга",
            stat: 0,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: 0,
          },
          deliveredAmount: {
            label: "Хүргэсэн",
            stat: 0,
          },
          activeCustomers: {
            label: "Идэвхитэй харилцагч",
            stat: 0,
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: 0,
          },
          orderFrequency: {
            label: "Захиалгын давтамж",
            stat: 0,
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat: "0%",
          },
        },
      },
      shuurkhai: {
        labelColor: "#41A4FF",
        filter: "shuurkhai",
        title: "Шуурхай түгээлт",
        data: {
          order: {
            label: "Захиалга",
            stat: 0,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: 0,
          },
          deliveredAmount: {
            label: "Хүргэсэн",
            stat: 0,
          },
          activeCustomers: {
            label: "Идэвхитэй харилцагч",
            stat: 0,
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: 0,
          },
          orderFrequency: {
            label: "Захиалгын давтамж",
            stat: 0,
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat: "0%",
          },
        },
      },
      others: {
        labelColor: "#20ADC9",
        filter: "other",
        title: "Шуурхай түгээлтээс бусад",
        data: {
          order: {
            label: "Захиалга",
            stat: 0,
          },
          totalAmount: {
            label: "Нийт дүн",
            stat: 0,
          },
          deliveredAmount: {
            label: "Хүргэсэн",
            stat: 0,
          },
          activeCustomers: {
            label: "Идэвхитэй харилцагч",
            stat: 0,
          },
          suppliers: {
            label: "Нийлүүлэгч",
            stat: 0,
          },
          orderFrequency: {
            label: "Захиалгын давтамж",
            stat: 0,
          },
          deliveryRate: {
            label: "Хүргэлтийн хувь",
            stat: "0%",
          },
        },
      },
    };

    let currentOrders = orders[currentMonth];

    if (currentVendor.id) {
      currentOrders = currentOrders.filter(
        (order) => order.supplier_id === currentVendor.id
      );
    }

    if (currentStatus > 0) {
      currentOrders = currentOrders.filter(
        (order) => order.status === currentStatus
      );
    }

    if (currentOrders.length === 0) return result;

    Object.keys(result).map((key) => {
      let filteredOrders;
      switch (result[key].filter) {
        case "gt":
          filteredOrders = currentOrders.filter((order) =>
            ["1", "2", "3", "4", "5"].includes(order.business_type_id)
          );
          break;
        case "horeca":
          filteredOrders = currentOrders.filter((order) =>
            ["6", "7", "8", "9", "10", "11", "12", "13", "14"].includes(
              order.business_type_id
            )
          );
          break;
        case "shuurkhai":
          filteredOrders = currentOrders.filter(
            (order) => order.supplier_id === 13884
          );
          break;
        case "other":
          filteredOrders = currentOrders.filter(
            (order) => order.supplier_id !== 13884
          );
          break;
        default:
          filteredOrders = currentOrders;
          break;
      }

      const singleStat = result[key].data;

      const orderVendors = [];
      for (const order of filteredOrders) {
        for (const product of order.line) {
          if (product.vendor) {
            orderVendors.push(product.vendor);
          }
        }
      }

      singleStat.order.stat = filteredOrders.length;
      singleStat.totalAmount.stat = filteredOrders.reduce(
        (acc, cur) => acc + cur.grand_total,
        0
      );
      singleStat.deliveredAmount.stat = filteredOrders
        .filter((order) => order.status === 3)
        .reduce((acc, cur) => acc + cur.grand_total, 0);
      singleStat.activeCustomers.stat = countUnique(
        filteredOrders.map((order) => order.customer_id)
      );
      singleStat.suppliers.stat = countUnique(
        result[key].filter === "shuurkhai"
          ? orderVendors
          : filteredOrders.map((order) => order.supplier_id)
      );
      singleStat.deliveryRate.stat =
        Math.round(
          (singleStat.deliveredAmount.stat * 100) / singleStat.totalAmount.stat
        ) + "%";
    });

    return result;
  }, [currentMonth, orders, currentStatus, currentVendor]);

  useEffect(() => {
    return () => {
      setCurrentMonth(new Date().getMonth() + 1);
      setCurrentStatus(0);
      setCurrentVendor({});
    };
  }, []);

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader />

      <div className={classes.managementContent}>
        {Object.keys(rowStats).map((key, index) => {
          return (
            <ManagementRow
              key={`management-row-${index}`}
              data={rowStats[key].data}
              title={rowStats[key].title}
              labelColor={rowStats[key].labelColor}
            />
          );
        })}
      </div>
    </div>
  );
};
