import React, { useState} from "react";
import "./IncomeAndExpenseComponents.css";
import { Link } from "react-router-dom";

export function IAEValueInput(props) {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    props.onInputChange(value); // Llama a la función de actualización en el componente padre
  };
  return (
    <>
      <h2>Valor</h2>
      <input
        type="number"
        id="IAEValueInput"
        value={inputValue}
        onChange={handleInputChange}
      />
    </>
  );
}


export function CategorySelector(props) {
  console.log(props.categories);
  return (
    <>
      <h2>Category</h2>
      <select id="categorySelector" className="form-select">
        {props.categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}

export function WalletSelector(props) {

  const handleWalletChange = (event) => {
    const selectedWallet = event.target.value;
    props.onWalletChange(selectedWallet);
  };

  return (
    <>
      <h2>Wallet</h2>
      <select
        id="walletSelector"
        className="form-select"
        onChange={handleWalletChange}
      >
        {props.wallets.map((wallet, index) => (
          <option key={index} value={wallet}>
            {wallet}
          </option>
        ))}
      </select>
      Balance: 0
    </>
  );
}

export function PocketSelector(props) {
  const handleWalletChange = (event) => {
    props.onWalletChange(event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <h2>Pocket</h2>
      <select
        id="pocketSelector"
        className="form-select"
        onChange={handleWalletChange}
      >
        {props.pockets.map((pocket, index) => (
          <option key={index} value={pocket}>
            {pocket}
          </option>
        ))}
      </select>
      Balance: 0
    </>
  );
}

export function DateSelector(props) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    props.onDateChange(date); // Llama a la función de actualización en el componente padre
  };

  const handleTomorrowDateButtonClick = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split("T")[0]);
    props.onDateChange(date.toISOString().split("T")[0]); // Llama a la función de actualización en el componente padre
  };

  const handleYesterdayDateButtonClick = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split("T")[0]);
    props.onDateChange(date.toISOString().split("T")[0]); // Llama a la función de actualización en el componente padre
  };

  return (
    <table>
      <tr>
        <td colSpan="2">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            id="dateSelector"
          />
        </td>
      </tr>
      <tr id="premadeButtonsContiner">
        <td>
          <button
            onClick={handleYesterdayDateButtonClick}
            id="premadeDateButton"
          >
            {yesterday.toISOString().split("-")[1]}/
            {yesterday.toISOString().split("-")[2].split("T")[0]} <br />
            Yesterday
          </button>
        </td>
        <td>
          <button
            onClick={handleTomorrowDateButtonClick}
            id="premadeDateButton"
          >
            {tomorrow.toISOString().split("-")[1]}/
            {tomorrow.toISOString().split("-")[2].split("T")[0]} <br />
            Tomorrow
          </button>
        </td>
      </tr>
    </table>
  );
}

export function OperationIncomeMenu(props) {
  const handleClick = () => {
    props.onClick(props.option);
  };
  return (
    <div id="incomeOrExpenseMenu">
      <Link to="/dashboard">
        <OperationButton option="Add Income" onClick={handleClick} />
      </Link>
    </div>
  );
}

export function OperationExpenseMenu(props) {
  const handleClick = () => {
    props.onClick(props.option);
  };
  return (
    <div id="incomeOrExpenseMenu">
      <Link to="/dashboard">
        <OperationButton option="Add Expense" onClick={handleClick} />
      </Link>
    </div>
  );
}

function OperationButton(props) {
  const handleClick = () => {
    props.onClick(props.option);
  };
  if (props.option === "Income" || props.option === "Add Income") {
    return (
      <button id="IncomeButton" onClick={handleClick}>
        {props.option}
      </button>
    );
  } else {
    return (
      <button id="ExpenseButton" onClick={handleClick}>
        {props.option}
      </button>
    );
  }
}
