import classes from "./MauDauLineChart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const MauDauLineChart = ({ data, title, maxScale }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          title: "Нийт",
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
    <div className={classes.line}>
      <Line options={options} data={data} />
    </div>
  );
};
