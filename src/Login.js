import React, { useState } from "react";
import {UserForm,CheckTerm, Header} from "./components/FormsComponents";
import { GetToken } from "./utils/stringUtils";
import { LoginRequest } from "./conection/ConnectionLogin"
import { Link, Navigate,  useNavigate } from "react-router-dom";


function Login(){
    //user is not logged in
    const navigate = useNavigate();
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [passwordAlert, setPasswordAlert]= useState("hidden");
    const [rememberMe, setRememberMe] = useState(false);


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    function handleRemember(event) {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = () => {
        let validUsername = true;
        const setUsernamePattern = /^[a-zA-Z0-9_]{6,15}$/;
        validUsername = !setUsernamePattern.test(username) ? false : true;
        
        let validPassword = true;
        const passwordPattern =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        validPassword = !passwordPattern.test(password) ? false : true;
        

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
            if(rememberMe) {
                localStorage.setItem("token", token);
            }
            console.log(data.code + " llevando al usuario a su sesión");
            navigate("/dashboard");
        }else {
            //imprimir mensaje el data.message en una alerta
            console.log(data.code + " imprimiendo el mensaje de error");
        }
    }
    if(localStorage.getItem("token") != null) {
        //user is already logged in
        return <Navigate to="/dashboard" replace/>
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
            <CheckTerm terms="Remember me" checked={rememberMe} onChange={handleRemember} />
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
