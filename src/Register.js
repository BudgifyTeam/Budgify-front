import React from "react";
import UserForm from "./components/UserForm";
import CheckTerm from "./components/CheckTerm";
import Header from "./components/Header";

function Register() {
  return (
    <div>
      <Header/>
      <h1 id="RegisterTitle">Sign up for free on <br/>Budgify</h1>
      <div>
        <UserForm header={"Whats your username?"} />
        <UserForm header={"Whats your email address?"} />
        <UserForm header={"Confirm your email address?"} />
        <UserForm header={"Create a password"} />
        <UserForm header={"Confirm your password"} />
        <br/>
        <CheckTerm terms={"I want to receive marketing messages from Budgify"}/>
        <br/>
        <CheckTerm terms={"Sharing my registration data with Budgify's content providers for marketing purposes."}/>
        <br/>
        <p id="termsRegister">
            By clicking Sign Up, you agree to Budgify's <span style={{ color: "#BC00FF" }}>Terms and Conditions</span> and <span style={{ color: "#BC00FF" }}>Privacy Policy.</span>
        </p>
        <button id="roundButton">REGISTER</button> 
        <br/>
        <p id="lastLogin">Already have an account? <span style={{ color: "#BC00FF" }}>Log in.</span></p>
      </div>
    </div>
  );
}

export default Register;
