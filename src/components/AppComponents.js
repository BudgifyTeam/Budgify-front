import React, { useState } from "react";
import { FormatIntegerWithDecimals } from "../utils/stringUtils";
import "./AppComponents.css";
import { Link } from "react-router-dom";
import LogoutButton from "./LogOutButton";

export function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [budgetValue] = useState(() => {
    const storedValue = localStorage.getItem("budgetValue");
    return storedValue ? parseInt(storedValue) : 0;
  });
  const [image] = useState(
    "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/userimage.jpg?alt=media&token=df5dc86a-c48e-4786-9501-565b2ad15134"
  );

  function handleImageClick() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <header>
      <img
        id="userImage"
        src={image}
        alt="Descripción de la imagen"
        onClick={handleImageClick}
      />
      <span className="numero">${FormatIntegerWithDecimals(budgetValue)}</span>
      {isMenuOpen && (
        <div className="menu">
          <LogoutButton />
        </div>
      )}
    </header>
  );
}
export function BudgetValue(props) {
  const [budgetValue] = useState(() => {
    const storedValue = localStorage.getItem("budgetValue");
    return storedValue ? parseInt(storedValue) : 0;
  });
  return (
    <div id="budgetCounter">
      <table>
        <tr>
          <td rowSpan="2">
            <img
              id="bagImage"
              src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Bag.png?alt=media&token=6d6e42ba-6a10-4c8a-9001-a0dc8e6b0bdf"
              alt="Descripción de la imagen"
            />
          </td>
          <td>
            <span id="budgetValue">
              ${FormatIntegerWithDecimals(budgetValue)}
            </span>
          </td>
        </tr>
        <tr>
          <td colSpan="2" id="budgetSubtitle">
            Budget
          </td>
        </tr>
      </table>
    </div>
  );
}

export function WeekReview() {
  return (
    <div className="weekReviewContainer">
      <h3 id="weekReviewTitle">Week Review</h3>
      <hr />
      Insertar la grafica
    </div>
  );
}

export function OperationMenu() {
  return (
    <div id="operationMenu">
      <OperationButton option="Income" />
      <OperationButton option="Expense" />
    </div>
  );
}

function OperationButton(props) {
  if (props.option === "Income" || props.option === "Add Expense") {
    return <button id="IncomeButton">{props.option}</button>;
  } else {
    return <button id="ExpenseButton">{props.option}</button>;
  }
}

export function Footer() {
  return (
    <footer>
      <Link to="/dashboard/history">
        <NavBarButton option="history" />
      </Link>
      <Link to="/dashboard/wallets">
        <NavBarButton option="wallets" />
      </Link>
      <Link to="/dashboard">
        <NavBarButton option="home" />
      </Link>
      <Link to="/dashboard/pockets">
        <NavBarButton option="pockets" />
      </Link>
      <Link to="/dashboard/stats">
        <NavBarButton option="stats" />
      </Link>
    </footer>
  );
}

function NavBarButton(props) {
  let path = "";
  let name = "";
  switch (props.option) {
    case "home":
      path =
        "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Home.png?alt=media&token=73998746-ca1d-45f9-9e83-3453632f4e39";
      name = "Home";
      break;
    case "wallets":
      path =
        "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Wallets.png?alt=media&token=cca353ff-39e1-4d5e-a0ce-3f2cb93f977c";
      name = "Wallets";
      break;
    case "pockets":
      path =
        "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Pockets.png?alt=media&token=4b1082de-2868-4226-be07-79927fe74266";
      name = "Pockets";
      break;
    case "history":
      path =
        "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/History.png?alt=media&token=82b842a3-d4a2-4725-9a8c-e45ac0be2591";
      name = "History";
      break;
    case "stats":
      path =
        "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Stats.png?alt=media&token=8dfd0e4f-2d22-4871-9717-a81bed53367e";
      name = "Stats";
      break;
    default:
      break;
  }

  return (
    <table id="navbarButtonTable">
      <tr>
        <td>
          <img src={path} alt="Descripción de la imagen" />
        </td>
      </tr>
      <tr>
        <td>
          <span id="navbarButtonTitle">{name}</span>
        </td>
      </tr>
    </table>
  );
}
