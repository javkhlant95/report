import classes from "./PickPackDoughnutChart.module.css";

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
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const PickPackDoughnutChart = ({ data }) => {
  const options = {
    maintainAspectRatio: false,

    plugins: {
      legend: {
        maxWidth: 120,
        position: "right",
        align: "end",
        labels: {
          usePointStyle: true,
        },
        title: {
          display: true,
          text: "Нийлүүлэгч",
          align: "start",
          color: "#57758F",
          font: {
            size: 20,
          },
        },
      },
      // title: {
      //   display: true,
      //   text: "Нийлүүлэгч",
      //   align: "center",
      //   padding: {
      //     bottom: 20,
      //   },
      //   color: "#57758F",
      //   font: {
      //     size: 20,
      //   },
      // },

      outlabels: {
        text: "%l %p",
        color: "white",
        stretch: 35,
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 18,
        },
      },
    },
  };
  return (
    <div className={classes.doughnut}>
      <Doughnut options={options} data={data} />
    </div>
  );
};
