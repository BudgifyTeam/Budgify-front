import React, { useState } from "react";
import {UserForm, CheckTerm, Header, UserFormLogin} from "./components/FormsComponents";


function Login(){
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [passwordAlert, setPasswordAlert]= useState("hidden");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        const setUsernamePattern = /^[a-zA-Z0-9_]{6,15}$/;
        setPasswordAlert(!setUsernamePattern.test(username) ? "noHidden" : "hidden");
        const passwordPattern =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        setPasswordAlert(!passwordPattern.test(password) ? "noHidden" : "hidden");
        
        let valid = true;
        valid = passwordAlert === "hidden"?true:false;

        if (valid) {
            console.log("request");
      //Make request
        }
    };
    return(
        <div>
            <Header/>
            <h1 id="LoginTitle">To continue, log in to Budgify</h1>
            <UserForm
                header={"Username"}
                onChange={handleUsernameChange}
                alertStatus={"hidden"}/>
            <UserForm
                header={"Password"}
                type={"password"}
                onChange={handlePasswordChange}
                alert={
                    "The username or password is wrong"
                  }
                alertStatus={passwordAlert}
                />
                

            <p id="forgotYourPassword">Forgot your password?</p>
            <CheckTerm
                terms={"Remember me"}
            />
            <button id="roundButton" onClick={handleSubmit} >
                LOG IN
            </button>
            <p id="haveCount">Don't have an account?</p>
            <button id="loginToRegisterButton" >
                Sign up in budgify
            </button>
        </div>
        
    );
}

export default Login;
