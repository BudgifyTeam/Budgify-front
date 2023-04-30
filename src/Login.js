import React, { useState } from "react";
import {UserForm, CheckTerm, Header} from "./components/FormsComponents";
import { GetToken } from "./utils/stringUtils";
import { LoginRequest } from "./conection/ConnectionLogin"
import { Link } from "react-router-dom";



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
        let validUsername = true;
        //const setUsernamePattern = /^[a-zA-Z0-9_]{6,15}$/;
        //validUsername = !setUsernamePattern.test(username) ? false : true;
        
        let validPassword = true;
        //const passwordPattern =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        //validPassword = !passwordPattern.test(password) ? false : true;
        

        if (validUsername && validPassword) {
            setPasswordAlert("hidden")
            handleLogin();
        }else{
            setPasswordAlert("noHidden")
        }
    };
    async function handleLogin() {
        let token = GetToken(username, password);
        const data = await LoginRequest(username, token);
        if (data.code) {
            //llevar al usuario a la pagina principal _login exitoso_
            console.log(data.code + " llevando al usuario a su sesión");
        }else {
            //imprimir mensaje el data.message en una alerta
            console.log(data.code + " imprimiendo el mensaje de error");
        }
    }
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
            <Link to ="/Register">
                <button  id="loginToRegisterButton">
                    Sign up in budgify
                </button>
            </Link>
            
        </div>
        
    );
}

export default Login;
