import url_back from "./config";

export 
/**
 * The GetHistoryRequest function makes a GET request to the server,
 * requesting the history of a user.
 * 
 *
 * @param selectedDate Pass the date selected by the user
 * @param time Determine which endpoint to use
 *
 * @return A json object with the following structure:
 *
 * @docauthor Leonardo
 */
async function GetHistoryRequest(selectedDate, time) {
  console.log(selectedDate);
  if (selectedDate.length !== 0) {
    let url = url_back + "History/Get";
    console.log(time);
    if (time === "Dia") {
      url += "DayHistory";
    } else if (time === "Semana") {
      url += "WeekHistory";
    } else if (time === "Mes") {
      url += "MonthHistory";
    } else {
      url += "YearHistory";
    }
    url = new URL(url);
    const queryParams = new URLSearchParams();
    queryParams.append("userid", localStorage.getItem("userId"));
    queryParams.append("date", selectedDate + "T00:00:00Z");
    url.search = queryParams.toString();
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
  } else {
    return {
      message: "El Valor es nulo o cero",
      code: false,
    };
  }
}

export 
/**
 * The GetCategoryStatsRequest function makes a GET request to the server,
 * requesting the expenses by category for a given month.
 * 
 *
 * @param selectedDate Pass the date to the getcategorystatsrequest function
async function getcategorystats(selecteddate) {
  try {
    const data = await getcategorystatsrequest(selecteddate);
    return data; 
 *
 * @return An object with the following structure
 *
 * @docauthor Leonardo
 */
async function GetCategoryStatsRequest(selectedDate) {
  if (selectedDate.length !== 0) {
    let url = url_back + "Stats/GetExpensesByCategoryMonth";
    url = new URL(url);
    const queryParams = new URLSearchParams();
    queryParams.append("categoryid", localStorage.getItem("userId"));
    queryParams.append("date", selectedDate + "T00:00:00Z");
    url.search = queryParams.toString();
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
  } else {
    return {
      message: "El Valor es nulo o cero",
      code: false,
    };
  }
}
