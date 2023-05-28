import url_back from "./config";

export async function GetPocketsRequest() {
  const url =
    url_back + "Pocket/GetPockets?userid=" + localStorage.getItem("userId");
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

export async function EditPocketsRequest(total, icon, name, pocket) {
  if (total.length !== 0) {
    const url = new URL(url_back + "Pocket/ModifyPocket");
    const queryParams = new URLSearchParams();
    queryParams.append("total", total);
    queryParams.append("icon", icon);
    queryParams.append("name", name);
    url.search = queryParams.toString();

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pocket),
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

export async function CreatePocketsRequest(name, icon, goal) {
  if (goal.length !== 0 && icon.length !== 0) {
    const url = new URL(url_back + "Pocket/CreatePocket");
    const queryParams = new URLSearchParams();
    queryParams.append("goal", goal);
    queryParams.append("icon", icon);
    queryParams.append("name", name);
    queryParams.append("userid", localStorage.getItem("userId"));
    url.search = queryParams.toString();
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
