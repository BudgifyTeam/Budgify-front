import React, { useState } from "react";
import "./HistoryComponents.css";
import { FormatIntegerWithDecimals } from "../utils/stringUtils";

export function IncomeMovmentButton(props) {
  const date = props.value.date.split("T")[0].split("-");

  return (
    <>
      <button className="IncomeMovmentButton">
        <span>
          {date[1]}/{date[2]}
          <br />
          {date[0]}
        </span>
        <h2>+${FormatIntegerWithDecimals(props.value.value)}</h2>
      </button>
    </>
  );
}

function IncomeMovmentPanel(props) {
  return (
    <div className="editButtonsContainer">
      <div id="goalContainer">Categoria:{props.value.category}</div>
    </div>
  );
}

export function ExpenseMovmentButton(props) {
  const date = props.value.date.split("T")[0].split("-");
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };
  return (
    <>
      <button className="ExpenseMovmentButton" onClick={togglePanel}>
        <span>
          {date[1]}/{date[2]}
          <br />
          {date[0]}
        </span>
        <h2>-${FormatIntegerWithDecimals(props.value.value)}</h2>
      </button>
      {showPanel && <IncomeMovmentPanel value={props.value} />}
    </>
  );
}
