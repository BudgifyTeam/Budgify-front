import React, { useState } from "react";
import "./WalletsComponents.css";
export function WalletButton(props) {
  const name = props.value.name;
  const total = props.value.total;
  const icon = props.value.icon;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <button className="walletButton" onClick={handleClick}>
        <img src={icon} alt={name} className="walletIcon" />
        <h2 id="WalletInfo" className="walletName">{name}</h2>
        <h2 id="valuesData">${total}</h2>
      </button>
      {isClicked && <ModifyWalletButtons />}
    </>
  );
}
function ModifyWalletButtons() {
  return (
    <div className="editButtonsContainer">
      <button id="optionButtonleft">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/delete.png?alt=media&token=1f6bb387-67c5-47f2-a15d-7da3c63d3971"
          alt="Delete Icon"
          className="optionIcon"
        />
      </button>
      <button id="optionButtonRigth">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Edit.png?alt=media&token=8c1d1707-2325-45de-ad06-e45a10e750be"
          alt="Edit Icon"
          className="optionIcon"
        />
      </button>
    </div>
  );
}
