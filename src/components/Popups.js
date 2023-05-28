import React, { useState, useEffect } from "react";
import "./Popups.css";
import { useNavigate } from "react-router-dom";
import { OnlyPocketSelector } from "./IncomeAndExpenseComponents";
import { DeletePocketsRequest, GetPocketsRequest } from "../api/PocketAPI";
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
        <p className="popup-text">
          Estas seguro de Eliminar tu billetera {props.walletName}
        </p>
        <div id="deleteButtons">
          <button id="yesButton">Sí</button>
          <button id="noButton" onClick={() => props.setTrigger(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export function DeletePocketPopup(props) {
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [pockets, setPockets] = useState([]);
  const [pocketsArray, setPocketsArray] = useState([]);
  const [selectedPocket, setSelectedPocket] = useState(null);
  const handleWalletChange = (selectedValue) => {
    setSelectedPocket(selectedValue);
  };
  useEffect(() => {
    GetPocketsRequest()
      .then((responseData) => {
        setPocketsArray(responseData.data);
        setPockets(responseData.data.map((obj) => obj.name));
        console.log(responseData.data.map((obj) => obj.name)[0]);
        setSelectedPocket(responseData.data.map((obj) => obj.name)[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (pockets === null) {
    return <div>Cargando Pockets</div>;
  }

  const handleClick = () => {
    DeletePocketsRequest(
      getPocketIdByName(pocketsArray, props.pocket),
      getPocketIdByName(pocketsArray, selectedPocket)
    )
      .then((responseData) => {
        if (responseData.code) {
          setValidPopup(true);
        } else {
          setErrorPopup(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(getPocketIdByName(pocketsArray, selectedPocket));
  };
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        <h1 className="popup-title">Eliminar</h1>
        <p className="popup-text">
          Estas seguro de Eliminar tu bolsillo {props.walletName}
        </p>
        <OnlyPocketSelector
          onWalletChange={handleWalletChange}
          pockets={pockets}
          pocket={props.pocket}
        />
        <div id="deleteButtons">
          <button id="yesButton" onClick={handleClick}>
            Sí
          </button>
          <button id="noButton" onClick={() => props.setTrigger(false)}>
            No
          </button>
        </div>
        <ErrorNotificationPopup
          trigger={errorPopup}
          setTrigger={setErrorPopup}
          error={"No se creo el pocket, valida la informacion"}
        />
        <ValidTransactionPopup
          trigger={validPopup}
          setTrigger={setValidPopup}
          message={"Se creo el pocket correctamente"}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

function getPocketIdByName(pockets, name) {
  const pocket = pockets.find((pocket) => pocket.name === name);
  return pocket ? pocket.pocket_id : null;
}

export function ErrorNotificationPopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        <h1 className="popup-title">Error</h1>
        <p className="popup-text">{props.error}</p>
        <button id="onlyButton" onClick={() => props.setTrigger(false)}>
          Okey
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export function ValidTransactionPopup(props) {
  const navigate = useNavigate();
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h1 className="popup-title">Valido</h1>
        <p className="popup-text">{props.message}</p>
        <button
          id="onlyButton"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
