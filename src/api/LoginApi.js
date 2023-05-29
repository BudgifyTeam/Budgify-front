import url_back from "./config.js";
// ... use the API_URL constant in your API calls

export 
/**
 * The LoginRequest function sends a POST request to the server with the username and token.
 * 
 *
 * @param username Send the username to the server
 * @param token Authenticate the user
 *
 * @return A promise, so you need to use await
 *
 * @docauthor Leonardo
 */
async function LoginRequest(username, token) {
  var body = {
    username: username,
    token: token,
  };

  try {
    const response = await fetch(url_back + 'Users/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

