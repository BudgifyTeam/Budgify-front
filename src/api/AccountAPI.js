import url_back from "./config";
export 
/**
 * The deleteAccountRequest function sends a GET request to the server,
 * asking it to delete the user's account.
 * 
 *
 * @param userid Delete the account of the logged user
 *
 * @return A promise
 *
 * @docauthor Leonardo
 */
async function deleteAccountRequest(userid) {
  let url = url_back + "Users/DeleteUser";
  url = new URL(url);
  const queryParams = new URLSearchParams();
  queryParams.append("userId", userid);
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
    localStorage.removeItem("budgetValue");
    localStorage.removeItem("userId");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
