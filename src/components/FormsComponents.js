import React from "react";
import "./FormsComponents.css"


export function CheckTerm(props) {
  return (
    <div style={{marginLeft: "5%", display: "flex", alignItems: "flex-end", flexWrap: "nowrap" }}>
      <div>
        <input type="checkbox" id="myCheckbox" checked={props.checked} onChange={props.onChange}/>
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
    return (
      <>
        <h1 id="formHeader">{props.header}</h1>
        <input type={props.type} id="formInput" onChange={props.onChange} />
        <div className={`alert alert-danger p-1 ${props.alertStatus === 'hidden' ? 'd-none' : ''}`} role="alert">
          {props.alert}
        </div>
      </>
    );
}



  