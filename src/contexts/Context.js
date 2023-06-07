import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [currentVendor, setCurrentVendor] = useState({});

  const [orders, setOrders] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  });
  const [statuses, setStatuses] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [states, setStates] = useState([]);
  const [merchants, setMerchants] = useState([]);

  const fetchOrders = async () => {
    try {
      const currentMonth = new Date().getMonth() + 1;

      for (let i = currentMonth; i >= 1; i--) {
        const res = await fetch("https://api2.ebazaar.mn/api/order/duplicate/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ebazaar_token: localStorage.getItem("ebazaar_token"),
          },
          body: JSON.stringify({
            start_date: `2023-${i}-01`,
            end_date: `2023-${i}-31`,
            projection: {
              order_id: 1,
              supplier_id: 1,
              customer_id: 1,
              line: 1,
              grand_total: 1,
              status: 1,
              business_type_id: 1,
              order_date: 1,
              tradeshop_id: 1,
            },
          }),
        });

        const data = await res.json();

        setOrders((prev) => ({ ...prev, [i]: data }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch("https://api2.ebazaar.mn/api/order/status/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ebazaar_token: localStorage.getItem("ebazaar_token"),
        },
      });
      const data = await res.json();

      setStatuses(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await fetch("https://api2.ebazaar.mn/api/backoffice/suppliers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ebazaar_token: localStorage.getItem("ebazaar_token"),
        },
      });
      const data = await res.json();

      setVendors(
        data.data.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMerchants = async () => {
    try {
      const res = await fetch("https://api2.ebazaar.mn/api/merchants?page=all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ebazaar_token: localStorage.getItem("ebazaar_token"),
        },
      });
      const data = await res.json();

      setMerchants(
        data.data.sort((a, b) => {
          if (a.tradeshop_name > b.tradeshop_name) return 1;
          if (a.tradeshop_name < b.tradeshop_name) return -1;
          return 0;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchStatus();
    fetchVendors();
    fetchMerchants();
  }, []);

  const value = {
    orders,
    statuses,
    vendors,
    states,
    merchants,
    currentMonth,
    setCurrentMonth,
    currentStatus,
    setCurrentStatus,
    currentVendor,
    setCurrentVendor,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
