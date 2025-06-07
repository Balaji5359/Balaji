import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const skills = [
    "FrontEnd Technologies (HTML,CSS,Bootstrap)",
    "BackEnd Technologies (NodeJS, ExpressJS, MongoDB)",
    "Database Management System (MySQL)",
    "Programming Languages (Java, JavaScript)",
    "Operating Systems (Linux)",
    "Data Structures and Algorithms",
    "Object Oriented Programming",
    "Version Control (Git, GitHub)",
    "AI Tools (ChatGPT/GitHub Copilot/BlackBox.ai etc.)",
    "Cloud Computing (AWS/Azure/GCP)",
    "Web Application Development"
];

function PlacementRatingForm() {
    const { field } = useParams();
    const navigate = useNavigate();
    const [ratings, setRatings] = useState(Array(skills.length).fill(3));

    const handleRatingChange = (idx, value) => {
        setRatings(ratings => ratings.map((r, i) => i === idx ? Number(value) : r));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save to localStorage to freeze button on main page
        const ratedFields = JSON.parse(localStorage.getItem("placementRated") || "{}");
        ratedFields[field] = true;
        localStorage.setItem("placementRated", JSON.stringify(ratedFields));
        // Optionally, save ratings as well
        localStorage.setItem(`placementRatings_${field}`, JSON.stringify(ratings));
        navigate("/placement-prediction1");
    };

    return (
        <div className="placement-rating-bg">
            <div className="placement-rating-card">
                <h2>Rate Your Skills for {field.replace("field", "Field ")}</h2>
                <form onSubmit={handleSubmit}>
                    {skills.map((skill, idx) => (
                        <div key={idx} className="rating-row">
                            <label>{skill}</label>
                            <select
                                value={ratings[idx]}
                                onChange={e => handleRatingChange(idx, e.target.value)}
                                required
                            >
                                {[1, 2, 3, 4, 5].map(val => (
                                    <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button className="tech-list-button" type="submit">Submit Ratings</button>
                </form>
            </div>
        </div>
    );
}

export default PlacementRatingForm;