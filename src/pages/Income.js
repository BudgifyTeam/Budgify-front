import React, { useState, useEffect } from "react";
import {
  IAEValueInput,
  WalletSelector,
  DateSelector,
  OperationIncomeMenu,
} from "../components/IncomeAndExpenseComponents";
import { Header, Footer } from "../components/AppComponents";
import "./Income.css";
import { MakeIncomeRequest } from "../api/IncomeAPI";
import {
  ErrorNotificationPopup,
  ValidTransactionPopup,
} from "../components/Popups";
import { GetWalletsRequest } from "../api/WalletAPI";

export default function Income() {
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [wallets, setWallets] = useState(null);
  const [walletNames, setWalletNames] = useState(null);
  const [walletId, setWalletId] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleInputChange = (value) => {
    setInputValue(value);
  };
  useEffect(() => {
    if (wallets !== null) {
      setWalletId(getWalletIdByName(wallets, selectedWallet));
    }
  }, [selectedWallet, wallets]);
  const handleWalletChange = (selectedValue) => {
    setSelectedWallet(selectedValue);
  };
  useEffect(() => {
    GetWalletsRequest()
      .then((responseData) => {
        setWallets(responseData);
        setWalletNames(responseData.data.map((obj) => obj.name));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (wallets === null) {
    return <div>Cargando Wallets</div>;
  } else {
    if (walletId === null) {
      setWalletId(wallets.data[0].wallet_id);
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleButtonClick = () => {
    console.log("Botón clickeado");
    console.log(walletId);
    console.log(inputValue);
    console.log(selectedDate);
    MakeIncomeRequest(walletId, inputValue, selectedDate)
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
  };

  return (
    <div className="dashboardContainer">
      <Header title="Income " />
      <div className="IncomeContainer">
        <IAEValueInput onInputChange={handleInputChange} />
        <hr />
        <WalletSelector
          wallets={walletNames}
          onWalletChange={handleWalletChange}
        />
        <DateSelector onDateChange={handleDateChange} />
        <OperationIncomeMenu onClick={handleButtonClick} />
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

function getWalletIdByName(data, walletName) {
  const wallet = data.data.find((wallet) => wallet.name === walletName);
  if (wallet) {
    return wallet.wallet_id;
  }
  return null; // Si no se encuentra la cartera, retorna null o un valor indicativo de que no se encontró
}
