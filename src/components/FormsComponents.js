import React, { useState } from "react";
import "./FormsComponents.css";

export function CheckTerm(props) {
  return (
    <div
      style={{
        marginLeft: "5%",
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <div>
        <input
          type="checkbox"
          id="myCheckbox"
          checked={props.checked}
          onChange={props.onChange}
        />
      </div>
      <div id="Term">{props.terms}</div>
    </div>
  );
}

export function Header() {
  return (
    <div className="LoginAndRegisterHeader">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/LogoBlack.png?alt=media&token=203a5607-2e84-47bd-8417-49e7c5c93fd5"
        id="headerImage"
        alt=""
      />
      <hr />
    </div>
  );
}

export function UserForm(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h1 id="formHeader">{props.header}</h1>
      <div>
        <input
          type={
            props.type === 'password' && !showPassword ? 'password' : 'text'
          }
          id={props.type === 'password' ? 'formPasswordInput' : 'formInput'}
          onChange={props.onChange}
        />
        {props.type === 'password' && (
          <button onClick={handleTogglePassword} id="showPassButton">
            <img id="eyeImage" src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/ojo.png?alt=media&token=4f27b8b6-97b1-400e-9752-44c2ddb2a003"
            alt=""></img>
          </button>
        )}
      </div>

      <div
        className={`alert alert-danger p-1 ${
          props.alertStatus === 'hidden' ? 'd-none' : ''
        }`}
        role="alert"
      >
        {props.alert}
      </div>
    </>
  );
}
