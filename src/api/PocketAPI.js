import url_back from "./config";

export 
/**
 * The GetPocketsRequest function makes a GET request to the server,
 * and returns the response as JSON.
 * 
 *
 *
 * @return A promise
 *
 * @docauthor Leonardo
 */
async function GetPocketsRequest() {
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

export 
/**
 * The EditPocketsRequest function sends a request to the server to edit a pocket.
 * 
 *
 * @param total Validate that the value is not null or zero
 * @param icon Send the icon of the pocket that is being edited
 * @param name Search for the pocket to be modified
async function editpocket(name) {
  try {
    const data = await getpocketsrequest(); 
 * @param pocket Pass the data to the editpocketsrequest function
 *
 * @return A promise
 *
 * @docauthor Leonardo
 */
async function EditPocketsRequest(total, icon, name, pocket) {
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

export 
/**
 * The CreatePocketsRequest function sends a POST request to the server with the user's input data.
 * 
 *
 * @param name Create the pocket, but what is the other parameter used for?
async function createpocket(name) {
  const icon = document
 * @param icon Send the icon of the pocket to be created
 * @param goal Set the goal of the pocket
 *
 * @return A json object, so you can access the properties of that object
 *
 * @docauthor Leonardo
 */
async function CreatePocketsRequest(name, icon, goal) {
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

export 
/**
 * The DeletePocketsRequest function sends a request to the server to delete a pocket.
 * 
 *
 * @param pocket_id Identify the pocket to be deleted
 * @param new_pocket_id Specify the pocket that will receive the items from the deleted pocket
 *
 * @return An object with a message and code properties
 *
 * @docauthor Leonardo
 */
async function DeletePocketsRequest(pocket_id, new_pocket_id) {
    if (pocket_id.length !== 0 && new_pocket_id.length !== 0) {
      const url = new URL(url_back + "Pocket/DeletePocket");
      const queryParams = new URLSearchParams();
      queryParams.append("pocketid", pocket_id);
      queryParams.append("newPocket", new_pocket_id);
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