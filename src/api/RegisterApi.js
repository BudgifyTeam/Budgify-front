import url_back from "./config";
//command to install base64 "npm install --save react-native-base64"

export 
/**
 * The RegisterRequest function sends a POST request to the server with the user's username, token and email.
 * 
 *
 * @param username Get the user's username
async function getuser(username) {
  let uri = url_back + &quot;users/getuser/&quot; + username;
  try {
    const res = await fetch(uri, { method: &quot;get&quot; }); 
 * @param token Identify the user
 * @param mail Send the mail to the user
 *
 * @return A promise, so you can use async/await or 
 *
 * @docauthor Leonardo
 */
async function RegisterRequest(username, token, mail) {
  let uri = url_back + "Users/Register";
  var user = {
    username: username,
    token: token,
    email: mail,
  };
  try {
    const res = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.warn(data.message);
    return data;
  } catch (error) {
    console.warn(error.message);
    throw error;
  }
}
