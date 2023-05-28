import React from "react";
import { Link } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton() {
  async function logoutSubmit() {
    await localStorage.removeItem("budgetValue");
    await localStorage.removeItem("userId");
    if (localStorage.getItem("token") != null) {
      await localStorage.removeItem("token");
    }
    console.log("Log Out");
  }

  return (
    <div id="profilePanel">
      <Link to="/Login">
        <button onClick={logoutSubmit} id="logoutButton">
          Log Out
        </button>
      </Link>
      <Link to="/Categories">
        <button id="logoutButton">Categorias</button>
      </Link>
    </div>
  );
}

export default LogoutButton;
