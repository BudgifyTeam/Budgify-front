import React, { useState } from "react";
import WalletImages from "../utils/Wallets";
import { Footer, Header } from "../components/AppComponents";
import "./Account.css";
import { Link } from "react-router-dom";
import { deleteAccountRequest } from "../api/AccountAPI";

function Account() {
  const [SelectedIcon, setSelectedIcon] = useState("");
  const handleButtonSelect = (buttonName) => {
    setSelectedIcon(buttonName); // Actualizar el estado 'selectedButton' con el botón seleccionado
  };
  const handleDeleteAccount = () => {
    console.log(localStorage.getItem("userId"));
    deleteAccountRequest()
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="dashboardContainer">
      <Header />
      <div className="AccountContainer">
        <ButtonTable onButtonSelect={handleButtonSelect} />
        <h1 id="edit-Title">Nombre</h1>
        <input id="edit-input"></input>
        <h1 id="edit-Title">Correo</h1>
        <input id="edit-input"></input>
        <h1 id="edit-Title">Contraseña</h1>
        <input id="edit-input" type="password"></input>
        <div id="typeAccountContainer">
          <button id="premadeDateButton">Publica</button>
          <button id="premadeDateButton">Privada</button>
        </div>
        <button id="roundButton">Añadir</button>
        <Link to="/Login">
          <button id="deleteAccountButton" onClick={handleDeleteAccount}>
            Eliminar Cuenta
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

const ButtonTable = (props) => {
  const [selectedButton, setSelectedButton] = useState("");
  const handleButtonClick = (name) => {
    setSelectedButton(name);
    props.onButtonSelect(name);
  };

  // Agrupar los elementos en filas de 6
  const rows = [];
  for (let i = 0; i < WalletImages.length; i += 6) {
    const rowItems = WalletImages.slice(i, i + 6);
    rows.push(rowItems);
  }

  return (
    <>
      <div className="WalletsSelectorContainer">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="RowContainer">
            {row.map((imagen, index) => (
              <IconButton
                key={index}
                onClick={() => handleButtonClick(imagen.url)}
                title={imagen.name}
                image={imagen.url}
                isSelected={selectedButton === imagen.url}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

function IconButton(props) {
  const buttonStyle = {
    width: "60px",
    height: "60px",

    backgroundImage: `url(${props.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: props.isSelected ? "1px solid black" : "none",
    cursor: "pointer",
  };

  return (
    <button
      onClick={props.onClick}
      style={buttonStyle}
      id="IconButton"
    ></button>
  );
}
export default Account;
