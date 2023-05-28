import React, { useState } from "react";
import "./History.css";
import { GetHistoryRequest } from "../api/HistoryAPI";
import { Footer, Header } from "../components/AppComponents";
import {
  IncomeMovmentButton,
  ExpenseMovmentButton,
} from "../components/HistoryComponents";

function History() {
  const [timeTypeSelected, setTimeTypeSelected] = useState("Dia");
  const [selectedDate, setSelectedDate] = useState(getFormattedDate());
  const [movments, setMovments] = useState([]);

  const options = [
    { value: "Dia", label: "Día" },
    { value: "Semana", label: "Semana" },
    { value: "Mes", label: "Mes" },
    { value: "Año", label: "Año" },
  ];

  const handleChange = (event) => {
    setTimeTypeSelected(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleFind = () => {
    GetHistoryRequest(selectedDate, timeTypeSelected)
      .then((responseData) => {
        console.log(responseData);
        setMovments(responseData.history.items);
        console.log(responseData.history.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="dashboardContainer">
      <Header />
      <div id="HistoryContainer">
        <div id="findParmsContainer">
          <select
            value={timeTypeSelected}
            onChange={handleChange}
            id="timeSelector"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div id="date-btn">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              id="dateSelector"
            />
            <button id="findButton" onClick={handleFind}>
              <img
                id="findImage"
                src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Lupa.png?alt=media&token=dcc9c279-c441-4b21-845a-efb75ae626e4"
                alt="Find vector"
              ></img>
            </button>
          </div>
        </div>
        <div className="Movments-History">
          {movments.map((movement) => (
            <>
              {movement.name === "income" ? (
                <IncomeMovmentButton value={movement} />
              ) : (
                <ExpenseMovmentButton value={movement} />
              )}
            </>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default History;
