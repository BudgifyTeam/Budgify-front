import React, { useState, useEffect } from "react";
import "./Popups.css";
import { useNavigate } from "react-router-dom";
import {
  OnlyCategorySelector,
  OnlyPocketSelector,
} from "./IncomeAndExpenseComponents";
import { DeletePocketsRequest, GetPocketsRequest } from "../api/PocketAPI";
import { GetWalletsRequest } from "../api/WalletAPI";
import { DeleteWalletRequest } from "../api/WalletAPI";
import { GetCategoriesRequest } from "../api/CategoriesAPI";
import { DeleteIncomeRequest } from "../api/IncomeAPI";
import {
  DeleteCategoryRequest,
  CreateCategoryRequest,
} from "../api/CategoriesAPI";
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

export function LoadingPopup(props) {
  return props.trigger ? (
    <div className="popup">
        <img className="loadingGif" src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Loading.gif?alt=media&token=0d3075d1-5568-43d8-952d-0fb19567037c" alt=""></img>
    </div>
  ) : (
    ""
  );
}

export function DeleteIncomePopup(props) {
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [icomeId] = useState(props.incomeId);

  const handleClick = () => {
    DeleteIncomeRequest(icomeId)
      .then((responseData) => {
        if (responseData.code) {
          setValidPopup(true);
          localStorage.setItem("budgetValue", responseData.newBudget);
        } else {
          setErrorPopup(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        <h1 className="popup-title">Eliminar</h1>
        <p className="popup-text">
          Estas seguro de Eliminar tu Ingreso? {props.walletName}
        </p>
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

export function DeleteWalletPopup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [walletsArray, setPocketsArray] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const handleWalletChange = (selectedValue) => {
    setSelectedWallet(selectedValue);
  };
  useEffect(() => {
    GetWalletsRequest()
      .then((responseData) => {
        setPocketsArray(responseData.data);
        setWallets(responseData.data.map((obj) => obj.name));
        console.log(responseData.data.map((obj) => obj.name)[0]);
        setSelectedWallet(responseData.data.map((obj) => obj.name)[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (wallets === null) {
    return <div>Cargando Wallets</div>;
  }

  const handleClick = () => {
    setIsLoading(true);
    DeleteWalletRequest(
      getWalletIdByName(walletsArray, props.walletName),
      getWalletIdByName(walletsArray, selectedWallet)
    )
      .then((responseData) => {
        if (responseData.code) {
          setValidPopup(true);
          setIsLoading(false);
        } else {
          setErrorPopup(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(getWalletIdByName(walletsArray, selectedWallet));
  };
  return props.trigger ? (
    <div className="popup">
      <LoadingPopup trigger={isLoading} setTrigger={setIsLoading} />
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
          pockets={wallets}
          pocket={props.walletName}
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
          error={"No se elimino el wallet, valida la informacion"}
        />
        <ValidTransactionPopup
          trigger={validPopup}
          setTrigger={setValidPopup}
          message={"Se elimino el wallet correctamente"}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

function getWalletIdByName(wallets, name) {
  const wallet = wallets.find((wallet) => wallet.name === name);
  return wallet ? wallet.wallet_id : null;
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

export function CreateCategoryPopup(props) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [inputName, setInputName] = useState("");
  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };
  const handleCreateClick = () => {
    
    setIsLoading(true);
    CreateCategoryRequest(inputName)
      .then((responseData) => {
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
  };
  return props.trigger ? (
    <div className="popup">
      <LoadingPopup trigger={isLoading} setTrigger={setIsLoading} />
      <div className="popup-inner">
        <h1 className="popup-title">Crear Categoria</h1>
        <p className="popup-text">nombre</p>
        <input
          id="NewNameInput"
          value={inputName}
          onChange={handleInputChange}
        />
        <button id="onlyButton" onClick={handleCreateClick}>
          Crear
        </button>
        <ErrorNotificationPopup
          trigger={errorPopup}
          setTrigger={setErrorPopup}
          error={"No se creo la categoria, valida la informacion"}
        />
        <ValidTransactionPopup
          trigger={validPopup}
          setTrigger={setValidPopup}
          message={"Se creo la categoria correctamente"}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
function getCategoryIdByName(categories, name) {
  const category = categories.find((category) => category.name === name);
  return category ? category.category_id : null;
}

export function DeleteCategoryPopup(props) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [categories, setPockets] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleWalletChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };
  useEffect(() => {
    setIsLoading(true);
    GetCategoriesRequest()
      .then((responseData) => {
        setIsLoading(false);
        setCategoriesArray(responseData.data);
        setPockets(responseData.data.map((obj) => obj.name));
        setSelectedCategory(responseData.data.map((obj) => obj.name)[0]);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  if (categories === null) {
    return <div>Cargando Categorias</div>;
  }

  const handleClick = () => {
    DeleteCategoryRequest(
      getCategoryIdByName(categoriesArray, props.categoryName),
      getCategoryIdByName(categoriesArray, selectedCategory)
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
  };
  return props.trigger ? (
    <div className="popup">
      <LoadingPopup trigger={isLoading} setTrigger={setIsLoading} />
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        <h1 className="popup-title">Eliminar</h1>
        <p className="popup-text">
          Estas seguro de Eliminar tu categoria {props.categoryName}
        </p>
        <OnlyCategorySelector
          onWalletChange={handleWalletChange}
          categories={categories}
          categoryName={props.categoryName}
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
