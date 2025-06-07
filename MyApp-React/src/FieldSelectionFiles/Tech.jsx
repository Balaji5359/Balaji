import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./techlist.css"; // Assuming you have a CSS file for styling

function Tech() {
    const location = useLocation();
    const field = location.state?.techName || "Unknown";

    // State to hold parsed API data
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const url = "https://3fdpsseodc.execute-api.ap-south-1.amazonaws.com/dev/field_data";
        const field_data = {
            "queryStringParameters": {
                "field": field
            }
        };

        const headers = {
            "Content-Type": "application/json",
        };

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(field_data),
        })
        .then(response => response.json())
        .then(data => {
            // Parse the JSON string in data.body
            let parsed = {};
            try {
                parsed = typeof data.body === "string" ? JSON.parse(data.body) : data.body;
            } catch (e) {
                console.error("Error parsing API response:", e);
            }
            setApiData(parsed);
        })
        .catch(error => {
            console.log("Error", error);
        });
    }, [field]);

    return (
        <div className="tech-data">
            {apiData ? (
                <div>
                    <h3>{apiData.field}</h3>
                    <p>{apiData.description}</p>
                    <h4>Skills Required</h4>
                    <ul>
                        {apiData["Skills Required"] &&
                            Object.entries(apiData["Skills Required"]).map(([category, skills]) => (
                                <li key={category}>
                                    <strong>{category}:</strong>
                                    <ul>
                                        {skills.map((skill, idx) => (
                                            <li key={idx}>{skill}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                    <h4>Job Roles</h4>
                    <ul>
                        {apiData["Job Roles"]?.Entry_Level_Roles?.map((roleObj, idx) => {
                            const roleName = Object.keys(roleObj)[0];
                            const role = roleObj[roleName];
                            return (
                                <li key={idx}>
                                    <strong>{roleName}</strong>
                                    <div>
                                        <b>Responsibilities:</b>
                                        <ul>
                                            {role.Responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                        </ul>
                                        <b>Skills:</b> {role.Skills.join(", ")}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <h4>Top Companies Hiring</h4>
                    <div className="company-list" style={{display: "flex", gap: "2em"}}>
                        {apiData["Top Companies Hiring"] && Object.entries(apiData["Top Companies Hiring"]).map(([type, companies]) => (
                            <div key={type}>
                                <b>{type}</b>
                                <ul>
                                    {companies.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <h4>Alumni & Employee Profiles</h4>
                    <div className="profiles-list" style={{display: "flex", gap: "1.5em", flexWrap: "wrap"}}>
                        {apiData["Alumni & Employee Profiles"] && apiData["Alumni & Employee Profiles"].map((profile, idx) => {
                            // Inject class and style into the <img> tag
                            let photoHtml = profile.Photo
                                ? profile.Photo.replace(
                                    /<img /,
                                    '<img class="profile-photo-img" style="width:60px;height:60px;object-fit:cover;border-radius:50%;margin-bottom:0.5em;" '
                                )
                                : "";

                            return (
                                <div key={idx} className="profile-card" style={{
                                    background: "#f5f7fa",
                                    borderRadius: "10px",
                                    padding: "1em",
                                    minWidth: "220px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}>
                                    <div dangerouslySetInnerHTML={{ __html: photoHtml }} />
                                    <b>{profile.Name}</b>
                                    <div>{profile.Address}</div>
                                    <div>Experience: {profile.Experience}</div>
                                    <div>Salary: {profile.Salary}</div>
                                    <div>Skills: {profile.Skills.join(", ")}</div>
                                    <a href={profile.LinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a><br />
                                    <a href={profile.Website} target="_blank" rel="noopener noreferrer">Website</a>
                                    <div>
                                        {profile.WorkSamples && profile.WorkSamples.map((ws, i) => (
                                            <a key={i} href={ws.url} target="_blank" rel="noopener noreferrer" style={{ marginRight: "0.5em" }}>{ws.label}</a>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default Tech;
