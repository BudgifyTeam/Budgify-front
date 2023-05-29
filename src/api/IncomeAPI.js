import url_back from "./config";

export async function MakeIncomeRequest(walletId, inputValue, selectedDate) {
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

export async function GetIncomesRequest() {
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

export async function DeleteIncomeRequest(incomeid) {
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
