import url_back from '../config.js';
// ... use the API_URL constant in your API calls

export async function LoginRequest(username, token){
    let uri = url_back+"Users/Login";
    var user =({
        username:username,
        token:token
   })
    try {
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
    } catch (error) {
        console.warn(error.message);
        throw error;
    }
}