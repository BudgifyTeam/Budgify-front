import React from "react";

function UserForm(props) {
  return (
    <>
      <h1 id="formHeader">{props.header}</h1>
      <input type="text" id="formInput" />
    </>
  );
}

export default UserForm;
