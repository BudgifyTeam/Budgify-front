import base64 from "react-native-base64"; 
//command to install base64 "npm install --save react-native-base64"

export function GetToken(username, token){
    let newText = "";

    for (let i = 0; i < username.length; i++) {
        newText += username[i] + "+";
    }
    newText += "|"
    for (let i = 0; i < token.length; i++) {
        newText += token[i] + "-";
    }
    var encode = base64.encode(newText)
    return encode;
}