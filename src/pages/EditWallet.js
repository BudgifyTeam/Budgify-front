import React, { useState } from "react";
import { Header, Footer } from "../components/AppComponents";
import { useLocation } from "react-router-dom";
import WalletImages from "../utils/Wallets";
import "./EditWallet.css";
import { EditWalletRequest } from "../api/WalletAPI";
import { ErrorNotificationPopup, ValidTransactionPopup } from "../components/Popups";

function EditWallet() {
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const location = useLocation();
  const wallet = location.state && location.state.pocket;
  const [SelectedIcon, setSelectedIcon] = useState(wallet.icon);
  const [title, setTitle] = useState(wallet.name);
  const [value, setValue] = useState(wallet.total);
  const handleButtonSelect = (buttonName) => {
    setSelectedIcon(buttonName); // Actualizar el estado 'selectedButton' con el botón seleccionado
  };
  const handleTitleInputChange = (event) => {
    setTitle(event.target.value); // Actualizar el estado con el valor del input
  };
  const handleInputChange = (event) => {
    setValue(event.target.value); // Actualizar el estado con el valor del input
  };

  const handleClick = () => {
    console.log(SelectedIcon);
    console.log(title);
    console.log(value);
    console.log(wallet);
    EditWalletRequest(value, SelectedIcon, title, wallet)
      .then((responseData) => {
        console.log(responseData.code);
        if (responseData.code) {
          console.log("shi");
          setValidPopup(true);
        } else {
          setErrorPopup(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Botón 'Añadir' clickeado");
  };
  return (
    <div>
      <Header title="EditWallet" />
      <div className="EditWalletContainer">
        <h1 id="edit-Title">Icono</h1>
        <ButtonTable onButtonSelect={handleButtonSelect}/>
        <h1 id="edit-Title">Titulo</h1>
        <input id="edit-input" value={title} onChange={handleTitleInputChange} placeholder={title}></input>
        <h1 id="edit-Title">Valor</h1>
        <input id="edit-input" type="number" value={value} onChange={handleInputChange} placeholder={value}></input>
        <button id="roundButton" onClick={handleClick}>Guardar</button>
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

  return <button onClick={props.onClick} style={buttonStyle} id="IconButton"></button>;
}

export default EditWallet;
