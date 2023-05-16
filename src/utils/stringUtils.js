import base64 from "react-native-base64"; 
//command to install base64 "npm install --save react-native-base64"

export function GetToken(username, password){
    let newText = "";

    for (let i = 0; i < username.length; i++) {
        newText += username[i] + "+";
    }
    newText += "|"
    for (let i = 0; i < password.length; i++) {
        newText += password[i] + "-";
    }
    var encode = base64.encode(newText)
    return encode;
}
export function FormatIntegerWithDecimals(number) {
    return number.toLocaleString('en-US', { minimumFractionDigits: 0 });
}