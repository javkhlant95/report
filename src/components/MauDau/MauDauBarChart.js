import classes from "./MauDauBarChart.module.css";
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

export const MauDauBarChart = ({ data, title }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: title,
        color: "#57758F",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className={classes.bar}>
      <Bar options={options} data={data} />
    </div>
  );
};
