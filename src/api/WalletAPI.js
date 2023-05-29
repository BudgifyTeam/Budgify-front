import url_back from "./config";
export 
/**
 * The GetWalletsRequest function makes a GET request to the server,
 * and returns the response as JSON.
 
 *
 *
 * @return An array of objects, and the data is displayed in a table
 *
 * @docauthor Leonardo
 */
async function GetWalletsRequest() {
    const url =
      url_back + "Wallet/GetWallets?userid=" + localStorage.getItem("userId");
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
   * The CreateWalletRequest function sends a POST request to the server with the name and icon of a new wallet.
   * 
   *
   * @param name Set the name of the wallet, and selectedicon is used to set the icon
   * @param SelectedIcon Pass the icon that is selected by the user
   *
   * @return This object:
   *
   * @docauthor Leonardo
   */
  async function CreateWalletRequest(name, SelectedIcon) {
      if (name.length !== 0 && SelectedIcon.length !== 0) {
        const url = new URL( url_back + "Wallet/CreateWallet");
        const queryParams = new URLSearchParams();
        queryParams.append("icon", SelectedIcon);
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
   * The DeleteWalletRequest function is used to delete a wallet from the database.
   * 
   *
   * @param walletid Identify the wallet to be deleted
   * @param newWallet Indicate the wallet to which you want to transfer the balance of the deleted wallet
   *
   * @return A json object, so you can use it like this:
   *
   * @docauthor Leonardo
   */
  async function DeleteWalletRequest(walletid, newWallet) {
    if (walletid.length !== 0 && newWallet.length !== 0) {
      const url = new URL(url_back + "Wallet/Deletewallet");
      const queryParams = new URLSearchParams();
      queryParams.append("walletid", walletid);
      queryParams.append("newWallet", newWallet);
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
   * The EditWalletRequest function sends a request to the server with the data of the wallet that is going to be modified.
   * 
   *
   * @param total Send the total value of the wallet to be modified
   * @param icon Send the icon of the wallet to be modified
  async function editwallet(total, icon, name) {
      const wallet = json
   * @param name Set the name of the wallet
  async function editwallet(name) {
      try {
        const data = await editwalletrequest(total, icon, name, wallet);
        if (data
   * @param Wallet Send the data to the server
   *
   * @return A promise, so you have to use await
   *
   * @docauthor Leonardo
   */
  async function EditWalletRequest(total, icon, name, Wallet) {
    if (total.length !== 0) {
      const url = new URL(url_back + "Wallet/Modifywallet");
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
          body: JSON.stringify(Wallet),
        });
  
        if (!response.ok) {
          throw new Error(
            "Error en la solicitud. Código de respuesta: " + response.status
          );
        }
        const data = await response.json();
        localStorage.setItem("budgetValue", data.budget);
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