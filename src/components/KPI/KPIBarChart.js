import classes from "./KPIBarChart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      align: "start",
    },
    title: {
      display: true,
    },
  },
};

export const KPIBarChart = ({ data }) => {
  return (
    <div className={classes.bar}>
      <Bar options={options} data={data} />
    </div>
  );
};
