import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./placement_prediction.css";

function PlacementPrediction1() {
    const location = useLocation();
    const navigate = useNavigate();
    const fields = location.state?.selectedFields || {};
    const field1 = fields.field1;
    const field2 = fields.field2 || "Not Selected";
    const field3 = fields.field3 || "Not Selected";

    const [apiData, setApiData] = useState({});
    const [showSkillPage, setShowSkillPage] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
    const [skillRatings, setSkillRatings] = useState({});
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState({});

    const mainCategories = [
        "Mathematics and Statistics",
        "Programming",
        "ML Tools and Libraries",
        "Machine Learning",
        "Frontend Development",
        "Backend Development",
        "Version Control",
        "DevOps",
        "Problem Solving",
        "Soft Skills"
    ];

    const fetchFieldData = async (field) => {
        if (!field || field === "Not Selected") return null;
        const url = "https://3fdpsseodc.execute-api.ap-south-1.amazonaws.com/dev/field_data";
        const field_data = {
            "queryStringParameters": { "field": field }
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(field_data)
            });
            const data = await response.json();
            return typeof data.body === "string" ? JSON.parse(data.body) : data.body;
        } catch (error) {
            console.error("Fetch error:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            const data1 = await fetchFieldData(field1);
            const data2 = await fetchFieldData(field2);
            const data3 = await fetchFieldData(field3);
            setApiData({ field1: data1, field2: data2, field3: data3 });
        };
        fetchAll();
    }, [field1, field2, field3]);

    const handleRating = (skill, ratingValue) => {
        setSkillRatings(prev => ({ ...prev, [skill]: ratingValue }));
        setHoveredRating(0);
    };

    const handleStartSkillRating = (fieldKey) => {
        setCurrentField(fieldKey);
        setShowSkillPage(true);
        setCurrentCategory(null);
    };

    const handleSelectCategory = (category) => {
        setCurrentCategory(category);
        setCurrentSkillIndex(0);
    };

    const handleBackToCategories = () => {
        setCurrentCategory(null);
    };

    const handleBackToFields = () => {
        setShowSkillPage(false);
        setCurrentField(null);
        setCurrentCategory(null);
        setCurrentSkillIndex(0);
    };

    const handleNextSkill = () => {
        const skills = apiData[currentField]?.["Skills Required"]?.[currentCategory] || [];
        if (currentSkillIndex < skills.length - 1) {
            setCurrentSkillIndex(currentSkillIndex + 1);
        } else {
            // Mark this category as completed
            setIsCompleted(prev => ({
                ...prev,
                [`${currentField}-${currentCategory}`]: true
            }));
            setCurrentCategory(null);
        }
    };

    const handlePrevSkill = () => {
        if (currentSkillIndex > 0) {
            setCurrentSkillIndex(currentSkillIndex - 1);
        }
    };

    const getCurrentSkill = () => {
        if (!currentCategory) return null;
        const skills = apiData[currentField]?.["Skills Required"]?.[currentCategory] || [];
        return skills[currentSkillIndex];
    };

    const isAllCategoriesCompleted = (fieldKey) => {
        const skills = apiData[fieldKey]?.["Skills Required"] || {};
        const categories = Object.keys(skills).filter(cat => mainCategories.includes(cat));
        return categories.every(cat => isCompleted[`${fieldKey}-${cat}`]);
    };

    const submitRatings = async () => {
        setIsSubmitting(true);
        const url = "https://jaumunpkj2.execute-api.ap-south-1.amazonaws.com/dev/post_field_data";
        const data = {
            email: localStorage.getItem("email") || "test@example.com",
            data: {
                field1,
                field2,
                field3,
                ratings: skillRatings
            }
        };

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            alert("Ratings submitted successfully!");
            navigate("/profiledata");
        } catch (error) {
            alert("Submission failed. Please try again.");
            console.error("Error submitting ratings:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderCategoryButtons = () => {
        const skills = apiData[currentField]?.["Skills Required"] || {};
        return (
            <div className="skills-category-container">
                <h3>Select a Skill Category for {currentField === "field1" ? field1 : currentField === "field2" ? field2 : field3}</h3>
                <div className="category-buttons">
                    {mainCategories.map(cat => (
                        skills[cat] && (
                            <button 
                                key={cat} 
                                className={`category-btn ${isCompleted[`${currentField}-${cat}`] ? 'completed' : ''}`}
                                onClick={() => handleSelectCategory(cat)}
                            >
                                {cat}
                                {isCompleted[`${currentField}-${cat}`] && <span className="check-icon">✓</span>}
                            </button>
                        )
                    ))}
                </div>
                <button className="back-button" onClick={handleBackToFields}>
                    <i className="fas fa-arrow-left"></i> Back to Fields
                </button>
                {isAllCategoriesCompleted(currentField) && (
                    <div className="completion-message">
                        <p>All categories for this field are completed!</p>
                    </div>
                )}
            </div>
        );
    };

    const renderSkillRating = () => {
        const currentSkill = getCurrentSkill();
        if (!currentSkill) return null;

        const skillKey = `${currentField}-${currentSkill}`;
        const currentRating = skillRatings[skillKey] || 0;
        const skills = apiData[currentField]?.["Skills Required"]?.[currentCategory] || [];

        return (
            <div className="skill-rating-container">
                <div className="skill-header">
                    <h3>{currentCategory}</h3>
                    <div className="skill-progress">
                        Skill {currentSkillIndex + 1} of {skills.length}
                    </div>
                </div>
                
                <div className="skill-card">
                    <h4>{currentSkill}</h4>
                    <div className="star-rating">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className="star"
                                color={i < (hoveredRating || currentRating) ? "#ffc107" : "#e4e5e9"}
                                size={32}
                                onMouseEnter={() => setHoveredRating(i + 1)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => handleRating(skillKey, i + 1)}
                            />
                        ))}
                        <span className="rating-value">{currentRating || hoveredRating || 0}/5</span>
                    </div>
                </div>
                
                <div className="navigation-buttons">
                    {currentSkillIndex > 0 && (
                        <button className="nav-btn prev-btn" onClick={handlePrevSkill}>
                            <i className="fas fa-arrow-left"></i> Previous
                        </button>
                    )}
                    
                    <button 
                        className="nav-btn next-btn" 
                        onClick={handleNextSkill}
                        disabled={!currentRating}
                    >
                        {currentSkillIndex < skills.length - 1 ? 'Next' : 'Finish'} <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
                
                <button className="back-button" onClick={handleBackToCategories}>
                    <i className="fas fa-arrow-left"></i> Back to Categories
                </button>
            </div>
        );
    };

    const renderFieldCards = () => {
        const fieldData = [
            { key: "field1", label: "Field 1", value: field1 },
            { key: "field2", label: "Field 2", value: field2 },
            { key: "field3", label: "Field 3", value: field3 }
        ].filter(f => f.value && f.value !== "Not Selected");

        return (
            <div className="field-cards-container">
                {fieldData.map(field => (
                    <div key={field.key} className="field-card">
                        <h3>{field.label}: {field.value}</h3>
                        <p>Rate your skills in this field to get placement predictions</p>
                        <button 
                            className="start-btn"
                            onClick={() => handleStartSkillRating(field.key)}
                        >
                            {isAllCategoriesCompleted(field.key) ? 'Review Ratings' : 'Start Rating'}
                        </button>
                        {isAllCategoriesCompleted(field.key) && (
                            <div className="completion-badge">
                                <i className="fas fa-check-circle"></i> Completed
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderRatingSummary = () => {
        const ratingsByField = {};
        
        Object.entries(skillRatings).forEach(([key, rating]) => {
            const [fieldKey, ...skillParts] = key.split('-');
            const skill = skillParts.join('-');
            
            if (!ratingsByField[fieldKey]) {
                ratingsByField[fieldKey] = [];
            }
            
            ratingsByField[fieldKey].push({ skill, rating });
        });
        
        return (
            <div className="ratings-summary">
                <h3>Your Skill Ratings Summary</h3>
                
                {Object.entries(ratingsByField).map(([fieldKey, ratings]) => {
                    const fieldValue = fieldKey === "field1" ? field1 : 
                                    fieldKey === "field2" ? field2 : field3;
                    
                    return (
                        <div key={fieldKey} className="field-ratings">
                            <h4>{fieldValue}</h4>
                            <ul className="ratings-list">
                                {ratings.map(({ skill, rating }) => (
                                    <li key={skill}>
                                        <span className="skill-name">{skill}</span>
                                        <span className="skill-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    size={16}
                                                    color={i < rating ? "#ffc107" : "#e4e5e9"}
                                                />
                                            ))}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
                
                <button 
                    className="submit-btn"
                    onClick={submitRatings}
                    disabled={isSubmitting || Object.keys(skillRatings).length === 0}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit All Ratings'}
                </button>
            </div>
        );
    };

    return (
        <div className="placement-prediction-container">
            <h1>Placement Prediction</h1>
            <p className="instruction-text">
                Rate your skills in each selected field to get personalized placement predictions
            </p>
            
            {!showSkillPage ? (
                <>
                    {renderFieldCards()}
                    {Object.keys(skillRatings).length > 0 && renderRatingSummary()}
                </>
            ) : !currentCategory ? (
                renderCategoryButtons()
            ) : (
                renderSkillRating()
            )}
        </div>
    );
}

export default PlacementPrediction1;