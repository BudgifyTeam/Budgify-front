import url_back from "./config.js";
// ... use the API_URL constant in your API calls

export async function LoginRequest(username, token) {
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

