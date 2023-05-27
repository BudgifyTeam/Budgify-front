import React, { useState } from "react";
import { Header, Footer } from "../components/AppComponents";
import WalletImages from "../utils/Wallets";
import "./EditWallet.css";

function EditWallet() {
  return (
    <div>
      <Header title="EditWallet" />
      <div className="EditWalletContainer">
        <h1 id="edit-Title">Icono</h1>
        <ButtonTable />
        <h1 id="edit-Title">Titulo</h1>
        <input id="edit-input"></input>
        <h1 id="edit-Title">Valor</h1>
        <input id="edit-input" type="number"></input>
        <button id="roundButton">Guardar</button>
      </div>
      <Footer />
    </div>
  );
}

const ButtonTable = () => {
    const [selectedButton, setSelectedButton] = useState("");
  
    const handleButtonClick = (name) => {
      setSelectedButton(name);
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
                  onClick={() => handleButtonClick(imagen.name)}
                  title={imagen.name}
                  image={imagen.url}
                  isSelected={selectedButton === imagen.name}
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
