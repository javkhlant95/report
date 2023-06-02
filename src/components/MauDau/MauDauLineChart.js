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

export const MauDauLineChart = ({ data, title }) => {
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
  };

  return (
    <div className={classes.line}>
      <Line
        options={options}
        data={data}
        style={{ width: 1000, height: 200 }}
      />
    </div>
  );
};
