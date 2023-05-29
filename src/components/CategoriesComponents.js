import React, { useState } from "react";
import "./CategoriesComponents.css";
import { EditPocketsRequest } from "../api/CategoriesAPI";
import { DeleteCategoryPopup, CreateCategoryPopup } from "../components/Popups";
import {
  ErrorNotificationPopup,
  ValidTransactionPopup,
  LoadingPopup,
} from "../components/Popups";

export default function CategoryComponent(props) {
  const [showRenameCategory, setShowRenameCategory] = useState(false);

  const handleEditClick = () => {
    setShowRenameCategory(!showRenameCategory);
  };
  return (
    <>
      <div className="CategoryContainer">
        <h2 id="CategoryName">{props.value.name}</h2>
        <div>
          <EditCategoryButton onClick={handleEditClick} />
          <DeleteCategoryButton categoryName={props.value.name} />
        </div>
      </div>
      {showRenameCategory && <RenameCategory value={props.value} />}
    </>
  );
}

function EditCategoryButton(props) {
  return (
    <button id="editCategoryButton" onClick={props.onClick}>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Edit.png?alt=media&token=8c1d1707-2325-45de-ad06-e45a10e750be"
        alt=""
      />
    </button>
  );
}
function DeleteCategoryButton(props) {
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  return (
    <>
      <button id="editCategoryButton" onClick={() => setShowDeletePopUp(true)}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/delete.png?alt=media&token=1f6bb387-67c5-47f2-a15d-7da3c63d3971"
          alt=""
        />
      </button>
      <DeleteCategoryPopup
        categoryName={props.categoryName}
        trigger={showDeletePopUp}
        setTrigger={setShowDeletePopUp}
      />
    </>
  );
}

function RenameCategory(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [validPopup, setValidPopup] = useState(false);
  const [inputName, setInputName] = useState(props.value.name);
  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const handleClik = () => {
    setIsLoading(true);
    EditPocketsRequest(props.value.category_id, inputName)
      .then((responseData) => {
        console.log(responseData);
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
    console.log(props.value);
    console.log(inputName);
  };
  return (
    <div className="RenameContainer">
      <LoadingPopup trigger={isLoading} setTrigger={setIsLoading} />
      <input id="NewNameInput" value={inputName} onChange={handleInputChange} />
      <button id="editCategoryButton" onClick={handleClik}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Check.png?alt=media&token=6a68fb18-9899-4638-ab78-89f2645ad0df"
          alt=""
        />
      </button>
      <ErrorNotificationPopup
        trigger={errorPopup}
        setTrigger={setErrorPopup}
        error={"No se modifico la categoria, valida la informacion"}
      />
      <ValidTransactionPopup
        trigger={validPopup}
        setTrigger={setValidPopup}
        message={"Se modifico la categoria correctamente"}
      />
    </div>
  );
}

export function AddCategoryButton() {
  const [addCategoryPopUp, setAddCategoryPopUp] = useState(false);
  return (
    <>
      <button id="AddButton" onClick={() => setAddCategoryPopUp(true)}>
        +
      </button>
      <CreateCategoryPopup
        trigger={addCategoryPopUp}
        setTrigger={setAddCategoryPopUp}
      />
    </>
  );
}
