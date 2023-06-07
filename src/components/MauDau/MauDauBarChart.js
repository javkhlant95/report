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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export const MauDauBarChart = ({ data, title }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value >= 1_000_000_000
              ? value / 1_000_000_000 + "bn"
              : value >= 1_000_000
              ? value / 1_000_000 + "M"
              : value >= 1_000
              ? value / 1_000 + "K"
              : value;
          },
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
