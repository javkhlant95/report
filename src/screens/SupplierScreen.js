import { useContext, useEffect, useMemo } from "react";
import classes from "./SupplierScreen.module.css";
import { SupplierTable } from "../components/Supplier/SupplierTable";
import { TypeChart } from "../components/Supplier/TypeChart";
import { FilterHeader } from "../components/Filters";
import { MerchantTable } from "../components/Supplier/MerchantTable";
import { countUnique } from "../utils/countUnique";
import { SupplierRow } from "../components/Supplier/SupplierRow";
import { Context } from "../contexts/Context";

export const SupplierScreen = () => {
  const {
    orders,
    currentMonth,
    setCurrentMonth,
    currentStatus,
    currentVendor,
    vendors,
    merchants,
  } = useContext(Context);

  useEffect(() => {
    setCurrentMonth(new Date().getMonth() + 1);

    return () => {
      setCurrentMonth(new Date().getMonth() + 1);
    };
  }, []);

  const rowData = useMemo(() => {
    const result = {
      orders: {
        label: "Захиалга",
        data: 0,
        goal: 100,
      },
      totalAmount: {
        label: "Нийт дүн",
        data: 0,
        goal: 0,
      },
      deliveredAmount: {
        label: "Хүргэсэн",
        data: 0,
        goal: 0,
      },
      activeCustomers: {
        label: "Идэвхитэй харилцагч",
        data: 0,
        goal: 0,
      },
      suppliers: {
        label: "Нийлүүлэгч",
        data: 0,
        goal: 0,
      },
      orderFrequency: {
        label: "Захиалгын давтамж",
        data: 0,
        goal: 0,
      },
      deliveryRate: {
        label: "Хүргэлтийн хувь",
        data: 0,
        goal: 0,
      },
    };

    let currentOrders =
      currentMonth === 13 ? orders[new Date().getMonth() + 1] : orders[currentMonth];

    if (currentVendor.id) {
      currentOrders = currentOrders.filter((order) => order.supplier_id === currentVendor.id);
    }

    if (currentStatus > 0) {
      currentOrders = currentOrders.filter((order) => order.status === currentStatus);
    }

    for (const key in result) {
      const singleStat = result[key];

      switch (key) {
        case "orders":
          singleStat.data = currentOrders.length;
          break;
        case "totalAmount":
          singleStat.data = currentOrders.reduce((acc, cur) => acc + cur.grand_total, 0);
          break;
        case "deliveredAmount":
          singleStat.data = currentOrders
            .filter((order) => order.status === 3)
            .reduce((acc, cur) => acc + cur.grand_total, 0);
          break;
        case "activeCustomers":
          singleStat.data = countUnique(currentOrders.map((order) => order.customer_id));
          break;
        case "suppliers":
          singleStat.data = countUnique(currentOrders.map((order) => order.supplier_id));
          break;
        case "deliveryRate":
          singleStat.data =
            Math.round((result.deliveredAmount.data * 100) / result.totalAmount.data) + "%";
          break;
        default:
          break;
      }
    }

    return result;
  }, [orders, currentMonth, currentStatus, currentVendor]);

  const supplierTableData = useMemo(() => {
    const result = [];

    let currentOrders =
      currentMonth === 13 ? orders[new Date().getMonth() + 1] : orders[currentMonth];

    if (currentVendor.id) {
      currentOrders = currentOrders.filter((order) => order.supplier_id === currentVendor.id);
    }

    if (currentStatus > 0) {
      currentOrders = currentOrders.filter((order) => order.status === currentStatus);
    }

    for (const vendor of vendors) {
      const singleData = {
        name: vendor.name,
        total: 0,
        delivered: 0,
        canceled: 0,
        order: 0,
        merchants: 0,
        rate: 0,
        type: "others",
        status: 0,
        tradeshops: [],
      };

      const merchants = [];
      for (const order of currentOrders) {
        if (order.supplier_id === vendor.id) {
          merchants.push(order.customer_id);
          singleData.total += order.grand_total;
          singleData.order++;
          singleData.status = order.status;
          singleData.tradeshops.push(order.tradeshop_id);

          if (order.status === 3) {
            singleData.delivered += order.grand_total;
          }

          if (order.status === 5) {
            singleData.canceled += order.grand_total;
          }

          if (["1", "2", "3", "4", "5"].includes(order.business_type_id)) {
            singleData.type = "gt";
          }

          if (["6", "7", "8", "9", "10", "11", "12", "13", "14"].includes(order.business_type_id)) {
            singleData.type = "horeca";
          }
        }
      }

      singleData.rate = (singleData.delivered * 100) / singleData.total;
      singleData.merchants = countUnique(merchants);

      result.push(singleData);
    }

    return result.filter((data) => data.total > 0);
  }, [orders, currentMonth, vendors, currentStatus, currentVendor]);

  const typeChartData = useMemo(() => {
    const result = {
      gtAmount: 0,
      horecaAmount: 0,
    };

    const currentData = supplierTableData;

    result.gtAmount = currentData
      .filter((data) => data.type === "gt")
      .reduce((acc, cur) => acc + cur.total, 0);

    result.horecaAmount = currentData
      .filter((data) => data.type === "horeca")
      .reduce((acc, cur) => acc + cur.total, 0);

    return result;
  }, [supplierTableData]);

  const merchantTableData = useMemo(() => {
    const result = [];

    const currentOrders =
      currentMonth === 13 ? orders[new Date().getMonth() + 1] : orders[currentMonth];

    let currentMerchants = [];
    for (const data of supplierTableData) {
      currentMerchants = [...currentMerchants, ...data.tradeshops];
    }
    currentMerchants = [...new Set(currentMerchants)];

    for (let i = 0; i < currentMerchants.length; i++) {
      currentMerchants[i] = merchants.find((merch) => merch.tradeshop_id === currentMerchants[i]);
    }

    currentMerchants = currentMerchants.filter((merch) => merch !== undefined);

    if (currentMerchants.length === 0) return result;

    for (const merchant of currentMerchants) {
      const singleStat = {
        name: merchant.tradeshop_name,
        total: 0,
        order: 0,
        rate: 0,
      };

      for (const order of currentOrders) {
        if (order.tradeshop_id === merchant.tradeshop_id) {
          singleStat.total += order.grand_total;
          singleStat.order++;
        }
      }

      result.push(singleStat);
    }

    return result;
  }, [orders, currentMonth, merchants, supplierTableData]);

  return (
    <div className={classes.screenWrapper}>
      <FilterHeader />

      <div className={classes.suppliersContent}>
        <SupplierRow data={rowData} />

        <div className={classes.contentWrapper}>
          <SupplierTable vendorStat={supplierTableData} />

          <div className={classes.leftContentWrapper}>
            <TypeChart typeStat={typeChartData} />
            <MerchantTable merchantStat={merchantTableData} />
          </div>
        </div>
      </div>
    </div>
  );
};
