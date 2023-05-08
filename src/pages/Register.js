import React, { useState } from "react";
import "./Register.css";
import { UserForm, CheckTerm, Header } from "../components/FormsComponents";
import { RegisterRequest } from "../api/RegisterApi";
import { GetToken } from "../utils/stringUtils";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  //Froms
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [mailConfirm, setmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //Alerts
  const [usernameAlert, setUsernameAlert] = useState("hidden");
  const [mailAlert, setMailAlert] = useState("hidden");
  const [mailConfirmAlert, setMailConfirmAlert] = useState("hidden");
  const [passwordAlert, setPasswordAlert] = useState("hidden");
  const [passwordConfirmAlert, setPasswordConfirmAlert] = useState("hidden");

  //Checkbox
  const [marketingMessagesAuth, setMarketingMessagesAuth] = useState(false);
  const [dataShareAuth, setDataShareAuth] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleMailChange = (event) => {
    setMail(event.target.value);
  };
  const handleMailConfirmChange = (event) => {
    setmailConfirm(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };
  function handleMarketingMessagesAuth(event) {
    setMarketingMessagesAuth(event.target.checked);
  }
  function handleDataShareAuth(event) {
    setDataShareAuth(event.target.checked);
  }

  async function handleSubmit() {
    //regex and user verification
    const usernamePattern = /^[a-zA-Z0-9_]{6,15}$/;
    setUsernameAlert(!usernamePattern.test(username) ? "noHidden" : "hidden");
    //regex and mail verification
    const mailaddressPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMailAlert(!mailaddressPattern.test(mail) ? "noHidden" : "hidden");
    setMailConfirmAlert(
      mail !== mailConfirm && mailConfirm !== "" ? "noHidden" : "hidden"
    );
    //regex and password verification
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    setPasswordAlert(!passwordPattern.test(password) ? "noHidden" : "hidden");
    setPasswordConfirmAlert(
      password !== passwordConfirm && passwordConfirm !== ""
        ? "noHidden"
        : "hidden"
    );
    //This check validates if all field alerts are hidden and that all fields have content.
    if (
      usernameAlert === "hidden" &&  mailAlert === "hidden" &&  mailConfirmAlert === "hidden" &&  passwordAlert === "hidden" &&
      passwordConfirmAlert === "hidden" &&   username !== "" &&   password !== "" &&  passwordConfirm !== "" &&
      mail !== "" &&  mailConfirm !== ""
    ) {
      console.log("request");
      handleRegister();
    }else{
      console.log("no request");
    }
  }

  async function handleRegister() {
    let token = GetToken(username, password);
    const data = await RegisterRequest(username, token, mail);
    if (data.code) {
      //llevar al usuario a la pagina de login exitoso
      console.log(data.code + " llevando al usuario a su sesión");
      navigate("/login");
    } else {
      //imprimir mensaje el data.message en una alerta
      console.log(data.code + " imprimiendo el mensaje de error");
      if (data.message === "username already exists") {
        console.log("nombre usuario ya esta en uso");
      } else if (data.message === "Email already exists") {
        console.log("nombre usuario ya esta en uso");
      } else {
        console.log("En este momento no se puede acceder al servicio");
      }
    }
  }

  return (
    <div>
      <Header />
      <h1 id="RegisterTitle">
        Sign up for free on <br />
        Budgify
      </h1>
      <div>
        <UserForm
          header={"Whats your username?"}
          onChange={handleUsernameChange}
          alert={
            "Enter valid a username (6 - 15 charts, only numbers, letters and underscores)"
          }
          alertStatus={usernameAlert}
        />
        <UserForm
          header={"Whats your email address?"}
          onChange={handleMailChange}
          alert={
            "Please enter a valid email address in format: yourname@example.com"
          }
          alertStatus={mailAlert}
        />
        <UserForm
          header={"Confirm your email address?"}
          onChange={handleMailConfirmChange}
          alert={"the email does not match the previous one"}
          alertStatus={mailConfirmAlert}
        />
        <UserForm
          header={"Create a password"}
          type={"password"}
          onChange={handlePasswordChange}
          alert={
            "Enter a valid password (8 - 16 charts, at least one number, uppercase letter, lower case letter, and special character)"
          }
          alertStatus={passwordAlert}
        />
        <UserForm
          header={"Confirm your password"}
          type={"password"}
          onChange={handlePasswordConfirmChange}
          alert={"the password does not match the previous one"}
          alertStatus={passwordConfirmAlert}
        />
        <br />
        <CheckTerm
          terms={"I want to receive marketing messages from Budgify"} 
          checked={marketingMessagesAuth}
          onChange={handleMarketingMessagesAuth}
        />
        <br />
        <CheckTerm
          terms={"Sharing my registration data with Budgify's content providers for marketing purposes."}
          checked={dataShareAuth}
          onChange={handleDataShareAuth}
        />
        <br />
        <p id="termsRegister">
          By clicking Sign Up, you agree to Budgify's{" "}
          <span style={{ color: "#BC00FF" }}>Terms and Conditions</span> and{" "}
          <span style={{ color: "#BC00FF" }}>Privacy Policy.</span>
        </p>
        <button id="roundButton" onClick={handleSubmit}>
          REGISTER
        </button>
        <br />
        <p id="lastLogin">
          Already have an account?{" "}
          <span style={{ color: "#BC00FF" }}>
            <a href="/login">Log in.</a>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
