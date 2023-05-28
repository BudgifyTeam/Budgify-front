import React, { useState } from "react";

import { DeletePocketPopup } from "./Popups";
import { Link } from "react-router-dom";
import "./PocketsComponents.css";

export function PocketButton(props) {
  const name = props.value.name;
  const total = props.value.total;
  const icon = props.value.icon;
  const goal = props.value.goal;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <button className="walletButton" onClick={handleClick}>
        <img src={icon} alt={name} className="walletIcon" />
        <h2 id="WalletInfo" className="walletName">
          {name}
        </h2>
        <h2 id="valuesData">${total}</h2>
      </button>
      {isClicked && (
        <ModifyWalletButtons name={name} goal={goal} total={total} icon={icon} pocket={props.value} />
      )}
    </>
  );
}

function ModifyWalletButtons(props) {
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  return (
    <div className="editButtonsContainer">
      <div id="goalContainer">Goal: ${props.goal}</div>
      <div>
        <Link to={"/dashboard/pockets/edit"} state={{ walletName: props.name, icon: props.icon, pocket: props.pocket}}>
          <button id="optionButtonleft">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/addMoney.png?alt=media&token=08a6b89f-4d6a-4132-83fc-391f7ea65378"
              alt="Edit Icon"
              className="optionIcon"
            />
          </button>
        </Link>
        <button
          id="optionButtonRigth"
          onClick={() => setDeleteConfirmPopup(true)}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/delete.png?alt=media&token=1f6bb387-67c5-47f2-a15d-7da3c63d3971"
            alt="Delete Icon"
            className="optionIcon"
          />
        </button>
      </div>

      <DeletePocketPopup
        trigger={deleteConfirmPopup}
        setTrigger={setDeleteConfirmPopup}
        walletName={props.name}
      />
    </div>
  );
}


export function AddPocketButton() {
  return (
    <Link to="/dashboard/pockets/create">
      <button id="AddButton">
        +
      </button>
    </Link>
  );
}