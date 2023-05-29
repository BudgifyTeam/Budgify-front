import React, { useState } from "react";
import { Header, Footer } from "../components/AppComponents";
import { useLocation } from "react-router-dom";
import { EditPocketsRequest } from "../api/PocketAPI";
import {
  ErrorNotificationPopup,
  ValidTransactionPopup,
  LoadingPopup
} from "../components/Popups";
import "./EditPocket.css";

function EditPocket() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const location = useLocation();
  const name = location.state && location.state.walletName;
  const pocket = location.state && location.state.pocket;
  const [total, setTotal] = useState(pocket.total);
  const icon = location.state && location.state.icon;
  //const icon = "https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Davivienda.jpg?alt=media&token=bd5ab0d5-7362-4836-8c7e-c43921c5988e";
  const handleClick = () => {
    setIsLoading(true);
    EditPocketsRequest(total, icon, name, pocket)
      .then((responseData) => {
        console.log(responseData.code);
        setIsLoading(false);
        if (responseData.code) {
          setValidPopup(true);
        } else {
          setErrorPopup(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    console.log("Botón 'Añadir' clickeado");
  };

  const handleInputChange = (event) => {
    setTotal(event.target.value); // Actualizar el estado con el valor del input
  };

  return (
    <div className="dashboardContainer">
      <Header />
      <LoadingPopup trigger={isLoading} setTrigger={setIsLoading} />
      <div className="EditPocketContainer">
        <h1 id="edit-Title">{name}</h1>
        <img src={icon} alt="Pocket Icon" id="EditPocketImage"></img>
        <h1 id="edit-Title">Valor</h1>
        <input
          id="edit-input"
          type="number"
          value={total}
          onChange={handleInputChange}
          placeholder={total}
        ></input>
        <button id="roundButton" onClick={handleClick}>
          Añadir
        </button>
      </div>
      <ErrorNotificationPopup
        trigger={errorPopup}
        setTrigger={setErrorPopup}
        error={"No se realizo el ingreso, valida la informacion"}
      />
      <ValidTransactionPopup
        trigger={validPopup}
        setTrigger={setValidPopup}
        message={"Se realizo el ingreso correctamente"}
      />
      <Footer />
    </div>
  );
}

export default EditPocket;
