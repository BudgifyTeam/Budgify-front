import React from "react";
import { Footer, Header } from "../components/AppComponents";
import {
  Chart as ChartJS,
  CategoryScale,
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
  Title,
  Tooltip,
  Legend
);

function Stats() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false, // Oculta el eje X
        ticks: {
          display: false, // Oculta los valores en el eje X
        },
        grid: {
          display: false, // Oculta la cuadrícula en el eje X
        },
      },
      y: {
        display: true, // Muestra el eje Y
        grid: {
          display: false, // Oculta la cuadrícula en el eje Y
        },
      },
    },
  };

  const data = {
    labels: ["categoria1", "categoria2", "categoria3"],
    datasets: [
      {
        label: "Dataset 1",
        data: [100, -200, 140],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  };

  return (
    <div className="dashboardContainer">
      <Header />
      <div>
        <h3 id="weekReviewTitle">Revisión del mes</h3>
        <hr />
        <Bar options={options} data={data} />
      </div>
      <Footer />
    </div>
  );
}

export default Stats;
