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

  export async function CreatePocketsRequest(name, icon, goal) {
    
  }