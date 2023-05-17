import React from "react";
import { Link } from "react-router-dom";
import "./LogoutButton.css"

function LogoutButton() {
  async function logoutSubmit() {
    await localStorage.removeItem("budgetValue");
    if (localStorage.getItem("token") != null) {
      await localStorage.removeItem("token");
    }
    console.log("Log Out");
  }

  return (
    <>
      <Link to="/Login">
        <button onClick={logoutSubmit} id="logoutButton">Log Out</button>
      </Link>
    </>
  );
}

export default LogoutButton;
