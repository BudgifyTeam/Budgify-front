import url_back from "./config";

export 
/**
 * The MakeIncomeRequest function makes a POST request to the backend API
 * and returns the response data.
 * 
 *
 * @param walletId Identify the wallet that will be updated
async function updatewallet(walletid, newbudget) {
  const baseurl = url_back + &quot;wallet/updatebudget&quot;;
  var queryparams = new urlsearchparams({
    id: parseint(walletid), 
 * @param inputValue Pass the value of the input to this function
async function addincome(inputvalue) {
  const walletid = localstorage
 * @param selectedDate Pass the selected date to the function
async function makeexpenserequest(walletid, inputvalue, selecteddate) {
  if (inputvalue
 *
 * @return A promise that resolves to an object
 *
 * @docauthor Leonardo
 */
async function MakeIncomeRequest(walletId, inputValue, selectedDate) {
  if (inputValue.length !== 0) {
    const baseUrl = url_back + "Income/CreateIncome";
    var queryParams = new URLSearchParams({
      userid: parseInt(localStorage.getItem("userId")),
      value: parseFloat(inputValue),
      date: selectedDate + "T00:00:00Z",
      wallet_id: parseInt(walletId),
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
 * The GetIncomesRequest function makes a GET request to the server,
 * and returns an array of income objects.
 * 
 *
 *
 * @return A promise
 *
 * @docauthor Leonardo
 */
async function GetIncomesRequest() {
  const url =
    url_back +
    "Income/GetIncomes?userid=" +
    localStorage.getItem("userId") +
    "&range=all";
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
 * The DeleteIncomeRequest function makes a GET request to the server,
 * passing in an incomeid parameter. The response is then parsed as JSON and returned.
 * 
 *
 * @param incomeid Pass the id of the income to be deleted
async function deleteincome(incomeid) {
  try {
    const data = await deleteincomerequest(incomeid); 
 *
 * @return This:
 *
 * @docauthor Leonardo
 */
async function DeleteIncomeRequest(incomeid) {
  const url = url_back + "Income/DeleteIncome?incomeid=" + incomeid;
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
