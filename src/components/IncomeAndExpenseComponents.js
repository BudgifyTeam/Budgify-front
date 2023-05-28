import React, { useState } from "react";
import "./IncomeAndExpenseComponents.css";

export function IAEValueInput(props) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Remueve caracteres no numéricos
    setInputValue(numericValue);
    props.onInputChange(numericValue); // Llama a la función de actualización en el componente padre
    if (numericValue === "") {
      setInputValue(""); // Establece el valor vacío si no hay números ingresados
      props.onInputChange(""); // Llama a la función de actualización en el componente padre con el valor vacío
    }
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

export function OnlyCategorySelector(props) {
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    props.onWalletChange(selectedCategory);
  };
  console.log(props.categories);
  return (
    <>
      <select id="categorySelector" className="form-select" 
        onChange={handleCategoryChange}>
        {props.categories.map((category, index) =>
          category === props.categoryName ? null : (
            <option key={index} value={category}>
              {category}
            </option>
          )
        )}
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
        id="categorySelector"
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

export function OnlyPocketSelector(props) {
  const handleWalletChange = (event) => {
    props.onWalletChange(event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <select
        id="pocketSelector"
        className="form-select"
        onChange={handleWalletChange}
      >
        {props.pockets.map((pocket, index) =>
          pocket === props.pocket ? null : (
            <option key={index} value={pocket}>
              {pocket === "default" ? "Selecciona un pocket..." : pocket}
            </option>
          )
        )}
      </select>
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
        id="categorySelector"
        className="form-select"
        onChange={handleWalletChange}
      >
        {props.pockets.map((pocket, index) => (
          <option key={index} value={pocket}>
            {pocket === "default" ? "Selecciona un pocket..." : pocket}
          </option>
        ))}
      </select>
      Balance: 0
    </>
  );
}
export function DateSelector(props) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setSelectedButtonIndex(null); // Reinicia el índice del botón seleccionado
    props.onDateChange(date); // Llama a la función de actualización en el componente padre
  };

  const handleButtonClick = (index, date) => {
    setSelectedDate(date);
    setSelectedButtonIndex(index); // Actualiza el índice del botón seleccionado
    props.onDateChange(date); // Llama a la función de actualización en el componente padre
  };

  return (
    <table>
      <tbody>
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
              onClick={() =>
                handleButtonClick(0, yesterday.toISOString().split("T")[0])
              }
              id="premadeDateButton"
              style={{ borderWidth: selectedButtonIndex === 0 ? "2px" : "1px" }} // Resalta el botón si su índice coincide con selectedButtonIndex
            >
              {yesterday.toISOString().split("-")[1]}/
              {yesterday.toISOString().split("-")[2].split("T")[0]} <br />
              Yesterday
            </button>
          </td>
          <td>
            <button
              onClick={() =>
                handleButtonClick(1, tomorrow.toISOString().split("T")[0])
              }
              id="premadeDateButton"
              style={{ borderWidth: selectedButtonIndex === 1 ? "2px" : "1px" }} // Resalta el botón si su índice coincide con selectedButtonIndex
            >
              {tomorrow.toISOString().split("-")[1]}/
              {tomorrow.toISOString().split("-")[2].split("T")[0]} <br />
              Tomorrow
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function OperationIncomeMenu(props) {
  const handleClick = () => {
    props.onClick(props.option);
  };

  return (
    <div id="incomeOrExpenseMenu">
      <OperationButton option="Add Income" onClick={handleClick} />
    </div>
  );
}

export function OperationExpenseMenu(props) {
  const handleClick = () => {
    props.onClick(props.option);
  };
  return (
    <div id="incomeOrExpenseMenu">
      <OperationButton option="Add Expense" onClick={handleClick} />
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
