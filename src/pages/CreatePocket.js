import React, { useState } from "react";
import { PocketsImages } from "../utils/Wallets";
import { Header, Footer } from "../components/AppComponents";
import { CreatePocketsRequest } from "../api/PocketAPI";
import { ErrorNotificationPopup, ValidTransactionPopup } from "../components/Popups";

function CreatePocket() {
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(""); // Estado para almacenar el valor del input de goal
  const [SelectedIcon, setSelectedIcon] = useState(""); // Estado para almacenar el valor seleccionado del botón

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value); // Actualizar el estado 'goal' con el valor del input
  };
  const handleButtonSelect = (buttonName) => {
    setSelectedIcon(buttonName); // Actualizar el estado 'selectedButton' con el botón seleccionado
  };

  const handleClick = () => {
    console.log(SelectedIcon);
    CreatePocketsRequest(name, SelectedIcon, goal)
      .then((responseData) => {
        console.log(responseData.code);
        if (responseData.code) {
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
        <h1 id="edit-Title">Nombre</h1>
        <input id="edit-input" value={name} onChange={handleNameChange} />
        <h1 id="edit-Title">Goal</h1>
        <input
          id="edit-input"
          type="number"
          value={goal}
          onChange={handleGoalChange}
        />
        <button id="roundButton" onClick={handleClick}>
          Crear
        </button>
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
  for (let i = 0; i < PocketsImages.length; i += 6) {
    const rowItems = PocketsImages.slice(i, i + 6);
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
export default CreatePocket;
