import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile_pages.css";
import "./profile.css";

function ProfileData() {
    const [apiData, setApi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        Name: "",
        gender: "",
        dob: "",
        age: "",
        personalEmail: "",
        collegeEmail: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        collegeName: "",
        program: "",
        branch: "",
        yearOfStudy: "",
        hobbies: "",
        about: "",
        linkedIn: "",
        github: "",
        portfolio: "",
        resume: "",
    });

    useEffect(() => {
        setLoading(true);
        const url = 'https://jaumunpkj2.execute-api.ap-south-1.amazonaws.com/dev/signup/login/profile_data/send_data';
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
            setLoading(false);
            return;
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: storedEmail }),
        })
            .then((response) => response.json())
            .then((data) => {
                setApi(data);
                if (data && data.body) {
                    try {
                        const parsedData = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
                        setUserData({
                            Name: parsedData.name || "",
                            gender: parsedData.gender || "",
                            dob: parsedData.dob || "",
                            age: parsedData.age || "",
                            personalEmail: parsedData.email || "",
                            collegeEmail: parsedData.collegeemail || "",
                            phone: parsedData.phone || "",
                            address: parsedData.address || "",
                            city: parsedData.city || "",
                            state: parsedData.state_of_student || "",
                            collegeName: parsedData.collegename || "",
                            program: parsedData.program || "",
                            branch: parsedData.branch || "",
                            yearOfStudy: parsedData.year_of_study || "",
                            hobbies: parsedData.hobbies || "",
                            about: parsedData.about || "",
                            linkedIn: parsedData.linkedIn || "",
                            github: parsedData.github || "",
                            portfolio: parsedData.portfolio || "",
                            resume: parsedData.resume || "",
                        });
                    } catch (e) {
                        console.error('Error parsing API data body:', e);
                    }
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="loading">
                Loading profile data...
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar" style={{ backgroundColor: userData.Name ? "lightblue" : "lightgray", borderRadius: "50%", width: "100px", height: "100px"}}>
                    <i className="fa-solid fa-user user"></i>
                </div>
                <h2 style={{ color: userData.Name ? "purple" : "black", fontSize: "2.5rem" }}>{userData.Name || "Not provided"}</h2>
                <span className="profile-role" style={{ color: userData.program ? "blue" : "black",fontSize: "1.8rem" }}>{userData.program || "Student"}</span>
            </div>
            <div className="profile-section">
                <h6><strong>About:</strong> </h6>
                <div className="info-data"><span>{userData.about || "Not provided"}</span></div>
            </div>
            <div className="profile-columns">
                <div>
                    <div className="profile-section">
                        <h3 className="info-heading">Personal Information</h3>
                        <div className="info-data"><strong>Gender:</strong> <span>{userData.gender || "Not provided"}</span></div>
                        <div className="info-data"><strong>Date of Birth:</strong> <span>{userData.dob || "Not provided"}</span></div>
                        <div className="info-data"><strong>Age:</strong> <span>{userData.age || "Not provided"}</span></div>
                        <div className="info-data"><strong>Address:</strong> <span>{userData.address || "Not provided"}</span></div>
                        <div className="info-data"><strong>City:</strong> <span>{userData.city || "Not provided"}</span></div>
                        <div className="info-data"><strong>State:</strong> <span>{userData.state || "Not provided"}</span></div>
                    </div>
                    <div className="profile-section">
                        <h3 className="info-heading">Contact Information</h3>
                        <div className="info-data"><strong>Personal Email:</strong> <span>{userData.personalEmail || "Not provided"}</span></div>
                        <div className="info-data"><strong>College Email:</strong> <span>{userData.collegeEmail || "Not provided"}</span></div>
                        <div className="info-data"><strong>Phone Number:</strong> <span>{userData.phone || "Not provided"}</span></div>
                    </div>
                </div>
                <div>
                    <div className="profile-section">
                        <h3 className="info-heading">Academic Information</h3>
                        <div className="info-data"><strong>College Name:</strong> <span>{userData.collegeName || "Not provided"}</span></div>
                        <div className="info-data"><strong>Program:</strong> <span>{userData.program || "Not provided"}</span></div>
                        <div className="info-data"><strong>Branch:</strong> <span>{userData.branch || "Not provided"}</span></div>
                        <div className="info-data"><strong>Year of Study:</strong> <span>{userData.yearOfStudy || "Not provided"}</span></div>
                    </div>
                    <div className="profile-section">
                        <h3 className="info-heading">Additional Information</h3>
                        <div className="info-data"><strong>Hobbies:</strong> <span>{userData.hobbies || "Not provided"}</span></div>
                        <div className="info-data"><strong>LinkedIn:</strong> <span>{userData.linkedIn ? <a href={userData.linkedIn} target="_blank" rel="noopener noreferrer">{userData.linkedIn}</a> : "Not provided"}</span></div>
                        <div className="info-data"><strong>GitHub:</strong> <span>{userData.github ? <a href={userData.github} target="_blank" rel="noopener noreferrer">{userData.github}</a> : "Not provided"}</span></div>
                        <div className="info-data"><strong>Portfolio:</strong> <span>{userData.portfolio ? <a href={userData.portfolio} target="_blank" rel="noopener noreferrer">{userData.portfolio}</a> : "Not provided"}</span></div>
                    </div>
                </div>
            </div>
            <div className="profile-actions">
                <div>
                    <h3 className="info-heading">Interested Field</h3>
                    <Link to="/tech-list">
                        <button type="button" className="btn btn-primary">Click Here To Select</button>
                    </Link>
                </div>
                <div>
                    <h3 className="info-heading">Skills Status</h3>
                    <Link to="/skills-status">
                        <button type="button" className="btn btn-primary">Click Here To View</button>
                    </Link>
                </div>
                <div>
                    <h3 className="info-heading">Placement Probability</h3>
                    <Link to="/placement-probability">
                        <button type="button" className="btn btn-primary">Click Here To View</button>
                    </Link>
                </div>
                <div>
                    <h3 className="info-heading">Progress</h3>
                    <Link to="/progress">
                        <button type="button" className="btn btn-primary">Click Here To View</button>
                    </Link>
                </div>
                <div>
                    <h3 className="info-heading">Communication Activity</h3>
                    <Link to="/progress">
                        <button type="button" className="btn btn-primary">Click Here To View</button>
                    </Link>
                </div>
                <div>
                    <h3 className="info-heading">Skill Activity</h3>
                    <Link to="/progress">
                        <button type="button" className="btn btn-primary">Click Here To View</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileData;