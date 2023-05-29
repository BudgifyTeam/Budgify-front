import base64 from "react-native-base64"; 
//command to install base64 "npm install --save react-native-base64"

export 
/**
 * The GetToken function takes a username and password as input,
 * concatenates them together with some special characters,
 * then base64 encodes the result. 
 
 *
 * @param username Create the token
 * @param password Get the password of the user
 *
 * @return The token, but how do i use it to log in?
 *
 * @docauthor Leonardo
 */
function GetToken(username, password){
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

export 
/**
 * The FormatIntegerWithDecimals function takes a number and returns it as a string with commas separating the thousands.
 * 
 *
 * @param number Pass the number to be formatted
 *
 * @return A string
 *
 * @docauthor Leonardo
 */
function FormatIntegerWithDecimals(number) {
    return number.toLocaleString('en-US', { minimumFractionDigits: 0 });
}

  