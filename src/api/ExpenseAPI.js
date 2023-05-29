import url_back from "./config";
export async function MakeExpenseRequest(
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

export async function GetExpensesRequest() {
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

export async function DeleteExpenseRequest(expenseId) {
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