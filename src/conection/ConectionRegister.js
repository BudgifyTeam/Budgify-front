import base64 from "react-native-base64"; 
import url_back from "../config";
//command to install base64 "npm install --save react-native-base64"


export function ConnectRegisterBackend(username, token, mail){
    let newText = "";

    for (let i = 0; i < username.length; i++) {
        newText += username[i] + "+";
    }
    newText += "|"
    for (let i = 0; i < token.length; i++) {
        newText += token[i] + "-";
    }
    var encode = base64.encode(newText)
    var user =({
        username:username,
        token:encode,
        email: mail
   })
    return user

}

export async function RegisterRequest(username, token, mail){
    let uri = url_back+"Users/Register";
    var user =({
        username:username,
        token:token,
        email: mail
   })
   try{
    const res = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    const data = await res.json();
    console.warn(data.message);
    return data;
   }catch (error) {
    console.warn(error.message);
    throw error;
}

}
    