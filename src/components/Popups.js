import React from "react";
import "./Popups.css";
export function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export function DeleteWalletPopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        <h1 className="popup-title">Eliminar</h1>
        <p className="popup-text">Estas seguro de Eliminar tu billetera {props.walletName}</p>
        <div id="deleteButtons">
          <button id="yesButton">Sí</button>
          <button id="noButton" onClick={() => props.setTrigger(false)}>No</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
