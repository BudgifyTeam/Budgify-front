import url_back from "./config";
export async function GetWalletsRequest() {
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

  export async function CreateWalletRequest(name, SelectedIcon) {
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

  export async function DeleteWalletRequest(walletid, newWallet) {
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

  export async function EditWalletRequest(total, icon, name, Wallet) {
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
  export async function CreatePocketsRequest(name, icon, goal) {
    
  }