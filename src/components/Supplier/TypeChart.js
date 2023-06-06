import classes from "./TypeChart.module.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const TypeChart = ({ typeStat }) => {
  const data = {
    labels: ["GT", "Horeca"],
    datasets: [
      {
        label: "Amount",
        data: [typeStat.gtAmount, typeStat.horecaAmount],
        backgroundColor: ["#F9C74F", "#E66C37"],
        borderColor: ["#F9C74F", "#E66C37"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
        },
        title: {
          text: "Type",
          display: true,
          font: {
            size: 14,
            weight: 600,
          },
        },
      },
    },
  };

  return (
    <div className={classes.chartWrapper}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
