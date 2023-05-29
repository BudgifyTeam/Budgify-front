import url_back from "./config";

export async function GetHistoryRequest(selectedDate, time) {
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
