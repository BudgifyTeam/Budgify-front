import React, { useEffect, useState } from "react";
import { GetIncomesRequest } from "../api/IncomeAPI";
import { FormatIntegerWithDecimals } from "../utils/stringUtils";
import { Header, Footer } from "../components/AppComponents";
import { DeleteIncomePopup } from "../components/Popups";
import { Link } from "react-router-dom";
function IncomesHistory() {
  const [incomes, setIncomes] = useState([]);
  useEffect(() => {
    GetIncomesRequest()
      .then((responseData) => {
        setIncomes(responseData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (incomes[0] === null) {
    return <div>Cargando incomes</div>;
  }
  return (
    <div className="dashboardContainer">
      <Header />
      <div>
        {incomes.map((income) => (
          <IncomeButton value={income} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

function IncomeButton(props) {
  const date = props.value.date.split("T")[0].split("-");
  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      <button className="IncomeMovmentButton" onClick={handleClick}>
        <span>
          {date[1]}/{date[2]}
          <br />
          {date[0]}
        </span>
        <h2>+${FormatIntegerWithDecimals(props.value.value)}</h2>
      </button>
      {showOptions && <IncomeMovmentPanel incomeId={props.value.income_id}/>}
    </>
  );
}

function IncomeMovmentPanel(props) {
  const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
  return (
    <div className="editButtonsContainer">
      <button id="optionButtonleft" onClick={()=>setDeleteConfirmPopup(true)}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/delete.png?alt=media&token=1f6bb387-67c5-47f2-a15d-7da3c63d3971"
          alt="Delete Icon"
          className="optionIcon"
        />
      </button>
      <DeleteIncomePopup
        trigger={deleteConfirmPopup}
        setTrigger={setDeleteConfirmPopup}
        incomeId= {props.incomeId}
      />
      <Link
        to={"/dashboard/wallets/edit"}
        state={{ walletName: props.name, pocket: props.pocket }}
      >
        <button id="optionButtonRigth">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Edit.png?alt=media&token=8c1d1707-2325-45de-ad06-e45a10e750be"
            alt="Edit Icon"
            className="optionIcon"
          />
        </button>
      </Link>
    </div>
  );
}

export default IncomesHistory;
