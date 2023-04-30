import url_back from "../config";
//command to install base64 "npm install --save react-native-base64"

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
    