import url_back from '../config.js';
// ... use the API_URL constant in your API calls

export async function LoginRequest(username, token){
    let uri = url_back+"Users/Login";
    var user =({
        username:username,
        token:token
   })
    fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => {
        console.warn(response);
      })
      .catch(error => {
        console.warn(error);
      });
}