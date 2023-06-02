import { useEffect, useState } from "react";
import { ManagementRow } from "../components/Management/ManagementRow";
import { MonthFilter } from "../components/Management/MonthFilter";
import { StatusFilters } from "../components/Management/StatusFilters";
import { VendorFilter } from "../components/Management/VendorFilter";
import classes from "./ManagementScreen.module.css";
import { StateFilter } from "../components/Management/StateFilter";
import { TypeFilter } from "../components/Management/TypeFilter";

const countUnique = (arr) => {
  return new Set(arr).size;
};

export const ManagementScreen = () => {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [states, setStates] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [totalStat, setTotalStat] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `https://api2.ebazaar.mn/api/orders?order_start=2023-05-01&order_end=2023-05-02&page=all`,
        {
          method: "GET",
          headers: {
            ebazaar_token: localStorage.getItem("ebazaar_token"),
          },
        }
      );

      const data = await res.json();

      setOrders(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await fetch(
        "https://api2.ebazaar.mn/api/backoffice/suppliers",
        {
          method: "GET",
          headers: {
            ebazaar_token: localStorage.getItem("ebazaar_token"),
          },
        }
      );

      const data = await res.json();
      setVendors(
        data.data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await fetch("https://api.ebazaar.mn/api/site_data");
      const data = await res.json();

      setStates(data.location.filter((loc) => loc.parent_id === 0));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await fetch("https://api2.ebazaar.mn/api/order/status/list", {
        method: "GET",
        headers: {
          ebazaar_token: localStorage.getItem("ebazaar_token"),
        },
      });

      const data = await res.json();
      setStatuses(
        data.data.filter((status) =>
          [1, 2, 3, 5].includes(status.OrderStatusID)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchVendors();
    fetchStates();
    fetchStatuses();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const gtIds = ["1", "2", "3", "4", "5"];
      const horekaIds = ["6", "7", "8", "9", "10", "11", "12", "13", "14"];

      const gtOrders = orders.filter((order) =>
        gtIds.includes(order.business_type_id)
      );

      const horekaOrders = orders.filter((order) =>
        horekaIds.includes(order.business_type_id)
      );

      const shuurkhaiOrders = orders.filter(
        (order) => order.supplier_id === 13884
      );

      const otherOrders = orders.filter((order) => order.supplier_id !== 13884);

      const newTotalStat = {
        all: {
          label: "Нийт",
          data: {
            total: { stat: orders.length, label: "Захиалга" },
            totalAmount: {
              stat: orders.reduce((acc, cur) => acc + cur.grand_total, 0),
              label: "Нийт дүн",
            },
            delivered: {
              label: "Хүргэсэн",
              stat: orders
                .filter((order) => order.status === 3)
                .reduce((acc, cur) => acc + cur.grand_total, 0),
            },
            customers: {
              label: "Идэвхитэй харилцагч",
              stat: countUnique(orders.map((order) => order.customer_id)),
            },
            suppliers: {
              label: "Нийлүүлэгч",
              stat: countUnique(orders.map((order) => order.supplier_id)),
            },
            deliveryRate: {
              label: "Хүргэлтийн хувь",
              stat:
                Math.round(
                  (orders.filter((order) => order.status === 3).length * 100) /
                    orders.length
                ) + "%",
            },
          },
        },
        gt: {
          label: "GT",
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
                Math.round(
                  (gtOrders.filter((order) => order.status === 3).length *
                    100) /
                    gtOrders.length
                ) + "%",
            },
          },
        },
        horeka: {
          label: "Хореке",
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
                Math.round(
                  (horekaOrders.filter((order) => order.status === 3).length *
                    100) /
                    horekaOrders.length
                ) + "%",
            },
          },
        },
        shuurkhai: {
          label: "Шуурхай түгээлт",
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
              stat: countUnique(
                shuurkhaiOrders.map((order) => order.supplier_id)
              ),
            },
            deliveryRate: {
              label: "Хүргэлтийн хувь",
              stat:
                Math.round(
                  (shuurkhaiOrders.filter((order) => order.status === 3)
                    .length *
                    100) /
                    shuurkhaiOrders.length
                ) + "%",
            },
          },
        },
        others: {
          label: "Шуурхай түгээлтээс бусад",
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
                Math.round(
                  (otherOrders.filter((order) => order.status === 3).length *
                    100) /
                    otherOrders.length
                ) + "%",
            },
          },
        },
      };

      setTotalStat(newTotalStat);
    }
  }, [orders]);

  return (
    <>
      <div className={classes.screenHead}>
        <div className={classes.filters}>
          <VendorFilter vendors={vendors} />
          <TypeFilter />
          <StateFilter states={states} />
        </div>

        <StatusFilters statuses={statuses} />
        <MonthFilter />
      </div>

      <div className={classes.managementContent}>
        {Object.keys(totalStat).map((key, index) => {
          return (
            <ManagementRow
              key={`management-row-${index}`}
              stat={totalStat[key].data}
              label={totalStat[key].label}
            />
          );
        })}
      </div>
    </>
  );
};
