import React, { useState } from "react";
import {UserForm, CheckTerm, Header, UserFormLogin} from "./components/FormsComponents";


function Login(){
    const [login, setLogin]= useState("hidden");
    const [username, setUsername]= useState("hidden")

    const handleloginChange = (event) => {
        setLogin(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = () => {
        const setLoginPattern = /^[a-zA-Z0-9_]{6,15}$/;
        setLogin(!setLoginPattern.test(login) ? "noHidden" : "hidden");
        const setUsernamePattern = /^[a-zA-Z0-9_]{6,15}$/;
        setUsername(!setUsernamePattern.test(login) ? "noHidden" : "hidden");
        
        let valid = true;

        if (
            login === "noHidden" ||
            username === "noHidden"
        ) {
            valid = false;
            console.log("No request");
        }

        if (valid) {
            console.log("request");
      //Make request
        }
    };
    return(
        <div>
            <Header/>
            <h1 id="LoginTitle">To continue, log in to Budgify</h1>
            <UserFormLogin
                header={"Username"}
                onChange={handleUsernameChange}/>
            <UserForm
                header={"Password"}
                type={"password"}
                onChange={handleloginChange}
                alert={
                    "The username or password is wrong"
                  }
                alertStatus={login}
                />
                

            <p id="forgotYourPassword">Forgot your password?</p>
            <CheckTerm
                terms={"Remember me"}
            />
            <button id="roundButton" onClick={handleSubmit} >
                LOG IN
            </button>
            <p id="haveCount">Don’t have an account?</p>
            <button id="loginToRegisterButton" >
                Sign up in budgify
            </button>
        </div>
        
    );
}

export default Login;