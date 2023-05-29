import url_back from "./config.js";

export 
/**
 * The GetCategoriesRequest function makes a GET request to the server,
 * and returns the response as JSON.
 * 
 *
 *
 * @return A promise
 *
 * @docauthor Leonardo
 */
async function GetCategoriesRequest() {
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

export 
/**
 * The EditPocketsRequest function sends a request to the server to edit a pocket.
 * 
 *
 * @param category_id Identify the category to be modified
 * @param name Update the name of the category
async function editpockets(category_id, name) {
  try {
    const data = await editpocketsrequest(category_id, name); 
 *
 * @return An object with a message property and a code property
 *
 * @docauthor Leonardo
 */
async function EditPocketsRequest(category_id, name) {
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

export 
/**
 * The DeleteCategoryRequest function sends a request to the server to delete a category.
 * 
 *
 * @param categoryid Delete the category
 * @param newCategoryId Move the products to another category
 *
 * @return A promise, so you need to use async/await or 
 *
 * @docauthor Leonardo
 */
async function DeleteCategoryRequest(categoryid, newCategoryId) {
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

export 
/**
 * The CreateCategoryRequest function sends a POST request to the server with the name of a new category.
 * 
 *
 * @param name Create a new category
 *
 * @return An object {message: &quot;&quot;, code: true}
 *
 * @docauthor Leonardo
 */
async function CreateCategoryRequest(name) {
  if (name.length !== 0) {
    const url = new URL(url_back + "Category/CreateCategory");
    const queryParams = new URLSearchParams();
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