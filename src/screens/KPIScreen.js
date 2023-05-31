import classes from "./KPIScreen.module.css";
import { VendorFilter } from "../components/KPI/VendorFilter";
import { KPIBarChart } from "../components/KPI/KPIBarChart";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const NUMBER_BN = { min: 0, max: 6 };

const totalAmount = {
  labels,
  datasets: [
    {
      label: "2022",
      data: labels.map(() => Math.round(Math.random() * 70)),
      backgroundColor: "#93eb34",
    },
    {
      label: "2023",
      data: labels.map(() => Math.round(Math.random() * 70)),
      backgroundColor: "#3461eb",
    },
    {
      label: "Төлөвлөгөө",
      data: labels.map(() => Math.round(Math.random() * 70)),
      backgroundColor: "#ebc934",
    },
  ],
};

const deliveredAmount = {
  labels,
  datasets: [
    {
      label: "2022",
      data: labels.map(() => Math.round(Math.random() * 70)),
      backgroundColor: "#93eb34",
    },
    {
      label: "2023",
      data: labels.map(() => Math.round(Math.random() * 60)),
      backgroundColor: "#3461eb",
    },
    {
      label: "Төлөвлөгөө",
      data: labels.map(() => Math.round(Math.random() * 50)),
      backgroundColor: "#eb6234",
    },
  ],
};

const merchant = {
  labels,
  datasets: [
    {
      label: "2022",
      data: labels.map(() => Math.round(Math.random() * 70)),
      backgroundColor: "#93eb34",
    },
    {
      label: "2023",
      data: labels.map(() => Math.round(Math.random() * 60)),
      backgroundColor: "#3461eb",
    },
    {
      label: "Төлөвлөгөө",
      data: labels.map(() => Math.round(Math.random() * 50)),
      backgroundColor: "#eb34a8",
    },
  ],
};

const deliveryRate = {
  labels,
  datasets: [
    {
      label: "2022",
      data: labels.map(() => Math.round(Math.random() * 70)),
      backgroundColor: "#93eb34",
    },
    {
      label: "2023",
      data: labels.map(() => Math.round(Math.random() * 60)),
      backgroundColor: "#3461eb",
    },
    {
      label: "Хувь",
      data: labels.map(() => Math.round(Math.random() * 50)),
      backgroundColor: "#9934eb",
    },
  ],
};

export const datas = [totalAmount, deliveredAmount, merchant, deliveryRate];

export const KPIScreen = () => {
  return (
    <>
      <div className={classes.screenHead}>
        <div className={classes.filters}>
          <VendorFilter />
          <VendorFilter />
          <VendorFilter />
        </div>

        {/* <StatusFilters />
        <MonthFilter /> */}
      </div>

      <div className={classes.kpiContent}>
        {datas.map((data, index) => {
          return (
            <div className={classes.barWrapper}>
              <h1 className={classes.title}>Нийт дүн</h1>
              <KPIBarChart key={`kpi-bar-chart-${index}`} data={data} />;
            </div>
          );
        })}
      </div>
    </>
  );
};
