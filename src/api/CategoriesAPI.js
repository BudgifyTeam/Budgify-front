import url_back from "./config.js";

export async function GetCategoriesRequest() {
  const url =
    url_back +
    "Category/GetCategories?userid=" +
    localStorage.getItem("userId");
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

export async function EditPocketsRequest(category_id, name) {
  if (name.length !== 0) {
    const url = new URL(url_back + "Category/ModifyCategory");
    const body = {
      category_id:parseInt(category_id),
      name:name
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

export async function DeleteCategoryRequest(categoryid, newCategoryId) {
  if (categoryid.length !== 0 && newCategoryId.length !== 0) {
    const url = new URL(url_back + "Category/DeleteCategory");
    const queryParams = new URLSearchParams();
    queryParams.append("categoryid", categoryid);
    queryParams.append("newCategoryId", newCategoryId);
    url.search = queryParams.toString();
    try {
      const response = await fetch(url, {
        method: "GET",
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