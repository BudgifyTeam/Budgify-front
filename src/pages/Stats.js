import React, { useState, useEffect } from "react";
import { Footer, Header } from "../components/AppComponents";
import { FormatIntegerWithDecimals } from "../utils/stringUtils";
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
import { GetHistoryRequest } from "../api/HistoryAPI";
import "./Stats.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Stats() {
  const [labels, setlabels] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    GetHistoryRequest(currentDate, "Mes")
      .then((responseData) => {
        const types = responseData.history.items.map(
          (item) => item.type + ":" + FormatIntegerWithDecimals(item.value)
        );
        setlabels(types);
        console.log(types);
        const values = responseData.history.items.map((item) => {
          if (item.name === "expense") {
            return -item.value; // Valor negativo si el name es "expense"
          }
          return item.value;
        });
        setValues(values);
        const backgroundColor = values.map((value) => {
          if (value >= 0) {
            return "rgba(155, 193, 141, 1)"; // Valor positivo
          } else {
            return "rgba(206, 112, 112, 1)"; // Valor negativo
          }
        });
        setColors(backgroundColor);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="dashboardContainer">
      <Header />
      <div>
        <h3 id="weekReviewTitle">Revisión del mes</h3>
        <hr />
        <div className="WeekRevision">
          <Bar options={options} data={data} />
        </div>
        <br />
        <h3 id="weekReviewTitle">Revisión de categorias del mes</h3>
        <hr />
      </div>
      <Footer />
    </div>
  );
}

export default Stats;
