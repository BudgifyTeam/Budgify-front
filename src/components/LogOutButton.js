import React from "react";
import {Link} from "react-router-dom";

function LogoutButton() {
  async function logoutSubmit() {
    if (localStorage.getItem("token") != null) {
      await localStorage.removeItem("token");
    }
    console.log("Log Out");
  }

  return (
    <>
      <Link to="/Login">
        <button onClick={logoutSubmit}>Log Out</button>
      </Link>
    </>
  );
}

export default LogoutButton;
