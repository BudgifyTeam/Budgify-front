import React, { useState, useEffect } from "react";
import { Header, Footer } from "../components/AppComponents";
import {
  IAEValueInput,
  CategorySelector,
  WalletSelector,
  DateSelector,
  OperationExpenseMenu,
  PocketSelector,
} from "../components/IncomeAndExpenseComponents";
import { GetWalletsRequest, GetCategoriesRequest, GetPocketsRequest } from "../api/DashboardAPI";
import { MakeExpenseRequest } from "../api/ExpenseAPI";

export default function Expense() {
  const [pockets, setPockets] = useState(null);
  const [pocketNames, setPocketNames] = useState(null);
  const [pocketId, setPocketId] = useState(null);
  const [selectedPocket, setSelectedPocket] = useState("");
  const handlePocketChange = (selectedValue) => {
    setSelectedPocket(selectedValue);
  };

  useEffect(() => {
    if (pockets !== null) {
        setPocketId(getPocketIdByName(pockets, selectedPocket));
    }
  }, [selectedPocket, pockets]);

  useEffect(() => {
    GetPocketsRequest()
      .then((responseData) => {
        setPockets(responseData);
        setPocketNames(responseData.data.map((obj) => obj.name));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //=========================================================
  
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  //=============================================================
  const [categories, setCategories] = useState(null);
  const [categoriesNames, setCategoriesNames] = useState(null);
  const [categoryId, setCategoryID] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  useEffect(() => {
    if (categories !== null) {
      setCategoryID(getCategoryIdByName(categories, selectedCategory));
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    GetCategoriesRequest()
      .then((responseData) => {
        setCategories(responseData);
        setCategoriesNames(responseData.data.map((obj) => obj.name));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //=================================================================================
  const [wallets, setWallets] = useState(null);
  const [walletNames, setWalletNames] = useState(null);
  const [walletId, setWalletId] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState("");
  const handleWalletChange = (selectedValue) => {
    setSelectedWallet(selectedValue);
  };
  useEffect(() => {
    if (wallets !== null) {
      setWalletId(getWalletIdByName(wallets, selectedWallet));
    }
  }, [selectedWallet, wallets]);
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
  if (wallets === null || categories === null || pockets === null) {
    return <div>Cargando Wallets, Pockets y categorias</div>;
  } else {
    if (walletId === null) {
      setWalletId(wallets.data[0].wallet_id);
    }
    if (categoryId === null) {
      setCategoryID(categories.data[0].category_id);
    }
    if (pocketId === null) {
        setPocketId(pockets.data[0].pocket_id);
      }
  }

  //=================================================================================

  //=================================================================================
  const handleButtonClick = () => {
    console.log("Botón clickeado");
    console.log(walletId);
    console.log(inputValue);
    console.log(selectedDate);
    console.log(pocketId);
    console.log(categoryId);
    if(inputValue !== null){
        MakeExpenseRequest(walletId, inputValue, selectedDate, pocketId, categoryId)
        .then((responseData) => {
          console.log(responseData);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    
  };

  return (
    <div className="dashboardContainer">
      <Header title="Expense " />
      <div className="ExpenseContainer">
        <IAEValueInput onInputChange={handleInputChange} />
        <hr />
        <CategorySelector
          categories={categoriesNames}
          onWalletChange={handleCategoryChange}
        />
        <WalletSelector
          wallets={walletNames}
          onWalletChange={handleWalletChange}
        />
        <PocketSelector pockets={pocketNames}
        onWalletChange={handlePocketChange}/>
        <DateSelector onDateChange={handleDateChange} />
        <OperationExpenseMenu onClick={handleButtonClick} />
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

function getCategoryIdByName(data, categoryName) {
  const category = data.data.find((category) => category.name === categoryName);
  if (category) {
    return category.category_id;
  }
  return null; // Si no se encuentra la cartera, retorna null o un valor indicativo de que no se encontró
}

function getPocketIdByName(data, pocketName) {
    const pocket = data.data.find((pocket) => pocket.name === pocketName);
    if (pocket) {
      return pocket.pocket_id;
    }
    return null; // Si no se encuentra la cartera, retorna null o un valor indicativo de que no se encontró
  }
