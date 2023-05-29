import url_back from "./config";
export 
/**
 * The MakeExpenseRequest function makes a POST request to the server,
 * sending the userId, value, date and wallet_id as query parameters.
 * The response is parsed into JSON format and returned.
 
 *
 * @param walletId Identify the wallet that is being used to make the expense
 * @param inputValue Pass the value of the expense to be created
async function makeincomerequest(inputvalue, selecteddate, walletid) {
  console
 * @param selectedDate Pass the date to the api
async function makeincomerequest(walletid, inputvalue, selecteddate) {
  console
 * @param pocket_id Identify the pocket where the expense will be added
 * @param category_id Specify the category of the expense
 *
 * @return An object with the message and code properties
 *
 * @docauthor Leonardo
 */
async function MakeExpenseRequest(
  walletId,
  inputValue,
  selectedDate,
  pocket_id,
  category_id
) {
  console.log("EXPENSE");
  if (inputValue.length !== 0) {
    const baseUrl = url_back + "Expense/CreateExpense";
    var queryParams = new URLSearchParams({
      userid: parseInt(localStorage.getItem("userId")),
      value: parseFloat(inputValue),
      date: selectedDate + "T00:00:00Z",
      wallet_id: walletId,
      pocket_id: pocket_id,
      category_id: category_id,
    });
    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "text/plain",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Error en la solicitud. Código de respuesta: " + response.status
        );
      }
      const responseData = await response.json();
      const { newBudget } = responseData; // Extract the newBudget value from the response
      console.log(newBudget);
      // Update the budgetValue in localStorage
      localStorage.setItem("budgetValue", newBudget);
      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    return {
      message: "El Valor es nulo o cero",
      code: false,
    };
  }
}

export 
/**
 * The GetExpensesRequest function makes a GET request to the server,
 * and returns an array of expenses.
 
 *
 *
 * @return A promise
 *
 * @docauthor Leonardo
 */
async function GetExpensesRequest() {
  const url =
    url_back + "Expense/GetExpenses?userid=" + localStorage.getItem("userId")+"&range=all";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error en la solicitud. Código de respuesta: " + response.status
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export 
/**
 * The DeleteExpenseRequest function makes a GET request to the server,
 * passing in an expenseId parameter. The server then deletes the expense with that id from its database.
 * 
 *
 * @param expenseId Delete the expense from the database
 *
 * @return An object with a property called newbudget
 *
 * @docauthor Leonardo
 */
async function DeleteExpenseRequest(expenseId) {
  const url =
    url_back + "Expense/DeleteExpense?expenseId=" + expenseId;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "Error en la solicitud. Código de respuesta: " + response.status
      );
    }
    const data = await response.json();
    
    localStorage.setItem("budgetValue", data.newBudget);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}