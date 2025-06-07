import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login_Navbar() {
    return (
        <div className="header-div1">
            <label htmlFor="nav-toggle1" className="nav-button1" style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-bars"></i>
            </label>
            <input
                type="checkbox"
                id="nav-toggle1"
                name="nav-toggle1"
                style={{ display: "none" }}
            />
            <Link to="/" className="nav-link1">Home</Link>
            <Link to="/" className="nav-link1">Your Progress</Link>
            <Link to="/profiledata" className="nav-link1">Your Profile</Link>
            <Link to="/login" className="nav-link1">Logout</Link>
        </div>
    );
}

export default Login_Navbar;
