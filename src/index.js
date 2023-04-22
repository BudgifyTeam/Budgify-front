import React from "react";
import ReactDom from "react-dom/client"; 
import "./styles.css";

const root = ReactDom.createRoot(document.getElementById("root"));

function App() {
  return (
    <div className="container">
      <header>
        <div className="header-left">
          <img src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/logo.jpg?alt=media&token=4c0cc5e3-a0b1-420b-a8c6-5307ab19ba14" alt="" id="logo" />
          <h1 id="budgifyTitle">| BUDGIFY</h1>
        </div>
        <div className="header-right">
          <a href="/">
            <img id="expandButton" src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/expandButton.png?alt=media&token=acb8fb23-d2a6-44d3-ac58-dd221c47d31c" alt="" />
          </a>
        </div>
      </header>
      <hr />
      <div>
        <h2 id="headerText">Welcome to Budgify</h2>
        <h2 id="bodyText">Your personal finances in one place.</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/BudgetHome.jpg?alt=media&token=0923bca5-5871-4d7e-96f7-9014d1ecaffb" alt="" id="homeImage" />
      </div>

      <footer>
        <div id="footerButtons">
          <button id="footerButton">Try Budgify</button>
          <button id="footerButton">About Us</button>
        </div>
        <p id="footerDescription">
          Track your personal finances easily and efficiently, keep track of
          your income and savings, plan your budget effectively and take control
          of your personal finances to achieve the financial stability you so
          desire.
        </p>
      </footer>
    </div>
  );
}


root.render(
  <>
    <App/>
  </>
); 