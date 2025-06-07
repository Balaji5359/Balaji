import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./techlist.css";

function TechSelection() {
    const [showNote, setShowNote] = useState(false);
    const navigate = useNavigate();
    const fieldList = [
        "Full Stack Web Development", "Machine Learning", "Artificial Intelligence","Data Science", "Cloud Computing",
        "Cybersecurity", "Blockchain Technology", "Internet of Things (IoT)", "Generative AI"
    ];
    const companyTypeList = [
        "Product-based", "Service-based", "Marketplace", "Startup", "Other"
    ];

    const [selectedFields, setSelectedFields] = useState({
        field1: "",
        field2: "",
        field3: "",
        jobRole: "",
        companyType: "",
        dreamCompany: "",
        agree: false,
        confirm: false
    });

    // Filter out already selected fields for next dropdowns
    const getFilteredFields = (excludeFields) =>
        fieldList.filter(f => !excludeFields.includes(f));

    function handleFieldChange(e) {
        const { name, value, type, checked } = e.target;
        setSelectedFields(prev => {
            let updated = {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            };
            // Reset next fields if previous changes
            if (name === "field1") {
                updated.field2 = "";
                updated.field3 = "";
            }
            if (name === "field2") {
                updated.field3 = "";
            }
            return updated;
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Form Data:", selectedFields);
        alert("Your selection has been submitted!");
        navigate("/placement-prediction1", { state: { selectedFields } });
        setSelectedFields({
            field1: "",
            field2: "",
            field3: "",
            jobRole: "",
            companyType: "",
            dreamCompany: "",
            agree: false,
            confirm: false
        });
    }

    return (
        <div className="tech-selection-card">
            <center>
                <Link to="/tech-list" className="back-button" style={{ marginBottom: "1em" }}>Back to Tech List</Link>
            </center>
            <br />
            <h1>Welcome to Tech Selection Page</h1>
            <form className="tech-selection-form" onSubmit={handleSubmit}>
                <ul className="tech-selection-notes">
                    <li><b>Note:</b></li>
                    <li>Select your preferred technology and domain.</li>
                    <li>Be alert and confident while selection; it's for your future <br />(can't be modified later).</li>
                    <li>You can select multiple domains or Technologies, if interested.</li>
                </ul>
                <div className="form-group">
                    <label>Field 1 selection</label>
                    <select
                        name="field1"
                        value={selectedFields.field1}
                        onChange={handleFieldChange}
                        required
                    >
                        <option value="">Select a field</option>
                        {fieldList.map((field, idx) => (
                            <option key={idx} value={field}>{field}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Field 2 selection</label>
                    <select
                        name="field2"
                        value={selectedFields.field2}
                        onChange={handleFieldChange}
                        disabled={!selectedFields.field1}
                    >
                        <option value="">Select a field</option>
                        {getFilteredFields([selectedFields.field1]).map((field, idx) => (
                            <option key={idx} value={field}>{field}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Field 3 selection</label>
                    <select
                        name="field3"
                        value={selectedFields.field3}
                        onChange={handleFieldChange}
                        disabled={!selectedFields.field2}
                    >
                        <option value="">Select a field</option>
                        {getFilteredFields([selectedFields.field1, selectedFields.field2]).map((field, idx) => (
                            <option key={idx} value={field}>{field}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Which Job Role you are passionate about? (optional)</label>
                    <input
                        type="text"
                        name="jobRole"
                        value={selectedFields.jobRole}
                        onChange={handleFieldChange}
                        placeholder="Enter your desired job role"
                    />
                </div>
                <div className="form-group">
                    <label>Which Type of company is your dream?</label>
                    <select
                        name="companyType"
                        value={selectedFields.companyType}
                        onChange={handleFieldChange}
                        required
                    >
                        <option value="">Select a company type</option>
                        {companyTypeList.map((type, idx) => (
                            <option key={idx} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Which is your dream company to work for? (Optional)</label>
                    <input
                        type="text"
                        name="dreamCompany"
                        value={selectedFields.dreamCompany}
                        onChange={handleFieldChange}
                        placeholder="Enter your dream company"
                    />
                </div>
                <div className="form-group checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={selectedFields.agree}
                            onChange={handleFieldChange}
                            required
                        /> I agree to the terms and conditions
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="confirm"
                            checked={selectedFields.confirm}
                            onChange={handleFieldChange}
                            required
                        /> I confirm my selection and I am ready to proceed
                    </label>
                </div>
                <button className="tech-list-button" type="submit">Submit</button>
            </form>
            <div className="tech-list-footer">
                
                {showNote && (
                    <ul id="note">
                        <li>Note: We hope you had a great exploration here</li>
                        <li>Now it's time to select your future plans,
                            domain, and the technology you want to learn and get a job
                            in that field.
                        </li>
                        <center>
                            <Link to="/tech-selection"><button>Click here if you are ready</button></Link>
                        </center>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TechSelection;