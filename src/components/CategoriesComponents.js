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


/**
 * The EditCategoryButton function is a component that renders an edit button.
 * 
 *
 * @param props Pass data from the parent component to the child component
 *
 * @return A button
 *
 * @docauthor Leonardo
 */
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

/**
 * The DeleteCategoryButton function is a component that renders a button which, when clicked,
 * triggers the DeleteCategoryPopup component. The DeleteCategoryButton function takes in one prop:
 * categoryName (string). This prop is passed to the DeleteCategoryPopup component as well.
 
 *
 * @param props Pass data from the parent component to the child component
 *
 * @return A button and a deletecategorypopup component
 *
 * @docauthor Leonardo
 */
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


/**
 * The RenameCategory function is a component that allows the user to rename an existing category.
 * 
 *
 * @param props Pass data from the parent component to the child component
 *
 * @return A div with a button and an input
 *
 * @docauthor Leonardo
 */
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

export 
/**
 * The AddCategoryButton function is a React component that renders a button with the &quot;+&quot; symbol.
 * When clicked, it triggers the CreateCategoryPopup component to render.
 
 *
 *
 * @return A button and a createcategorypopup component
 *
 * @docauthor Leonardo
 */
function AddCategoryButton() {
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
