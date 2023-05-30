import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton() {
  const navigate = useNavigate();
  async function logoutSubmit() {
    await localStorage.removeItem("budgetValue");
    await localStorage.removeItem("userId");
    if (localStorage.getItem("token") != null) {
      await localStorage.removeItem("token");
    }
    setTimeout(function () {
      navigate("/login");
    }, 100);
    console.log("Log Out");
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="buttonsContainer">
          <Link to="/Account">
            <button id="logoutButton">
              Cuenta
            </button>
          </Link>
          <hr />
          <Link to="/Categories">
            <button id="logoutButton">Categorias</button>
          </Link>
          <hr />
          <button onClick={logoutSubmit} id="logoutButton">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutButton;
