import "./login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileData from "../StudentProfileFiles/ProfileData";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [statusCode, setStatusCode] = useState("");
    const [message, setMessage] = useState("");
    const [apimessage, setApiMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // console.log(email,password)
    const loginUser = async (e) => {
        e.preventDefault();
        const url = "https://jaumunpkj2.execute-api.ap-south-1.amazonaws.com/dev/signup/login";
        const userdata = {
            email: email,
            password: password,
        };
        const headers = {
            "Content-Type": "application/json",
        };

        try{
            const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(userdata),
        })
        const data = await response.json();
        // console.log("Response", data);
        setStatusCode(data.statusCode);
        setMessage(data.body)        
        // console.log("Message", message);
        setApiMessage(JSON.parse(data.body).message)
        // console.log("APIMessage", apimessage);
        // console.log("Status Code", statusCode);
        if (statusCode === 200)
        {
            navigate("/profiledata");
            localStorage.setItem("email", email);
        }
    }
    catch (error){
        console.log("Error", error);
        setError(error);
    }
}
    return (
        <>
            <div className="container">
                <div className="form-container">
                    <form id="signupForm" onSubmit={loginUser}>
                        <div className="form-header">
                            <h1>Welcome Back</h1>
                            <h2>Student Login</h2>
                        </div>

                        <div className="social-signup">
                            <button type="button" className="social-btn google">
                                <i className="fab fa-google"></i> Sign up with Google
                            </button>
                            <button type="button" className="social-btn github">
                                <i className="fab fa-github"></i> Sign up with GitHub
                            </button>
                        </div>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <button type="submit" id="submitBtn" className="signup-btn">
                            <span className="btn-text">Login</span>
                            <div id="spinner" className="spinner"></div>
                        </button>
                        <br />

                        <div className="message-box">
                            {<p className="login-link" style={{color:"green"}}>{apimessage}</p>}
                        </div>

                        <p className="login-link">
                            Don't have an account? <Link to="/signup">Create one</Link>
                        </p>
                    </form>
                    <center>
                        <Link to="/" className="signup-btn">
                            Close
                        </Link>
                    </center>
                </div>
            </div>
        </>
    );
}

export default Login;
