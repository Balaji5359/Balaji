import React from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [statusCode, setStatusCode] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [apiMessage, setApiMessage] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setSpinner(true);
        console.log(name,email,password);

        const userData = {
            body:{
                name: name,
                email: email,
                password: password
            }
        };
        
        const url = 'https://jaumunpkj2.execute-api.ap-south-1.amazonaws.com/dev/signup'

        const headers = {
            'Content-Type':'application/json'
        }

        try{
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            setStatusCode(data.statusCode);
            setMessage(data.body);
            
            // Parse the message if it's a string
            if (typeof data.body === 'string') {
                try {
                    const parsedBody = JSON.parse(data.body);
                    setApiMessage(parsedBody.message || '');
                } catch (e) {
                    setApiMessage(data.body);
                }
            } else if (data.body && data.body.message) {
                setApiMessage(data.body.message);
            }
            
            if (data.statusCode === 200) {
                navigate("/profilecreation");
                localStorage.setItem("email", email);
            }
        }
        catch(error){
            console.error("Error:", error);
        }finally{
            setSpinner(false);
        }
    }


    return(
        <div className="container">
        <div className="form-container">
            <form id="signupForm" action= '' onSubmit={handleSubmit}>
                <div className="form-header">
                    <h1>Welcome to Skill Route</h1>
                    <h2>Student Signup</h2>
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

                <div className="input-group">
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <i className="fas fa-user"></i>
                        <input 
                        type="text"
                        name="name"
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Full Name" 
                        required/>
                    </div>

                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" Enter Email Address" 
                        required/>
                    </div>

                    <div className="input-field">
                        
                        <input 
                        type="password" 
                        name="password"
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                        required/>
                        <i className="fas fa-eye-slash toggle-password"></i>
                    </div>
                </div>

                <button type="submit" id="submitBtn" className="signup-btn">
                    <span className="btn-text">{spinner ? 'Creating...' : 'Create Account'}</span>
                    {spinner && <div className="spinner"></div>}
                </button>
                {apiMessage && <p className="login-link" style={{ color: "green" }}>{apiMessage}</p>}
                <div id="messageBox" className="message"></div>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
            <center>
            <Link to="/" className="signup-btn">Close</Link>
            </center>
        </div>
    </div>

    )
}

export default SignUp;