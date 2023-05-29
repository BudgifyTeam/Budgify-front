import React, {useState, useEffect} from 'react'
import { DeleteExpensePopup } from '../components/Popups';
import { FormatIntegerWithDecimals } from '../utils/stringUtils';
import { Link } from 'react-router-dom';
import { GetExpensesRequest } from '../api/ExpenseAPI';
import { Header, Footer } from "../components/AppComponents";


function ExpenseHistory() {
    const [incomes, setIncomes] = useState([]);
    useEffect(() => {
      GetExpensesRequest()
        .then((responseData) => {
          setIncomes(responseData.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    if (incomes.length === 0) {
      return (
        <div className="popup">
          <img
            className="loadingGif"
            src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/Loading.gif?alt=media&token=0d3075d1-5568-43d8-952d-0fb19567037c"
            alt=""
          ></img>
        </div>
      );
    }
    return (
      <div className="dashboardContainer">
        <Header />
        <div className="IncomesContainer">
          {incomes.map((income) => (
            <ExpenseButton value={income} />
          ))}
        </div>
        <Footer />
      </div>
    );
}

function ExpenseButton(props) {
    const date = props.value.date.split("T")[0].split("-");
    const [showOptions, setShowOptions] = useState(false);
    const handleClick = () => {
      setShowOptions(!showOptions);
    };
  
    return (
      <>
        <button className="ExpenseMovmentButton" onClick={handleClick}>
          <span>
            {date[1]}/{date[2]}
            <br />
            {date[0]}
          </span>
          <h2>-${FormatIntegerWithDecimals(props.value.value)}</h2>
        </button>
        {showOptions && <ExpenseMovmentPanel expenseId={props.value.expense_id} />}
      </>
    );
  }
  
  function ExpenseMovmentPanel(props) {
    const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);
    return (
      <div className="editButtonsContainer">
        <button id="optionButtonleft" onClick={() => setDeleteConfirmPopup(true)}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/budgify-ed7a9.appspot.com/o/delete.png?alt=media&token=1f6bb387-67c5-47f2-a15d-7da3c63d3971"
            alt="Delete Icon"
            className="optionIcon"
          />
        </button>
        <DeleteExpensePopup
          trigger={deleteConfirmPopup}
          setTrigger={setDeleteConfirmPopup}
          expenseId={props.expenseId}
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

export default ExpenseHistory
