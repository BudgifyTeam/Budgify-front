import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="homeContainer">
      <div id="homeHeader">
        <div className="header-left">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/LogoApp.png?alt=media&token=8a20bda2-e83e-47fb-8d23-bc0288957307"
            alt=""
            id="logo"
          />
          <h1 id="budgifyTitle">| BUDGIFY</h1>
        </div>
        <div className="header-right">
          <a href="/">
            <img
              id="expandButton"
              src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/expandButton.png?alt=media&token=acb8fb23-d2a6-44d3-ac58-dd221c47d31c"
              alt=""
            />
          </a>
        </div>
      </div>
      <hr />
      <div id="homeBody">
        <h2 id="headerText">Welcome to Budgify</h2>
        <h2 id="bodyText">Your personal finances in one place.</h2>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/BudgetHome.jpg?alt=media&token=0923bca5-5871-4d7e-96f7-9014d1ecaffb"
          alt=""
          id="homeImage"
        />
      </div>
      <div className="homeFooter">
        <div id="footerButtons">
          <Link to="/Login">
            <button id="footerButton">Try Budgify</button>
          </Link>
          <Link>
            <button id="footerButton">About Us</button>
          </Link>
        </div>
        <p id="footerDescription">
          Track your personal finances easily and efficiently, keep track of
          your income and savings, plan your budget effectively and take control
          of your personal finances to achieve the financial stability you so
          desire.
        </p>
      </div>
    </div>
  );
}

export default App;
