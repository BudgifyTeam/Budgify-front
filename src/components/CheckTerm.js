import React from "react";

function CheckTerm(props) {
  return (
    <div style={{marginLeft: "5%", display: "flex", alignItems: "flex-end", flexWrap: "nowrap" }}>
      <div>
        <input type="checkbox" id="myCheckbox" />
      </div>
      <div id="Term">{props.terms}</div>
    </div>
  );
}

export default CheckTerm;
