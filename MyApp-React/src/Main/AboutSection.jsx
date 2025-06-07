import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./main.css";
function AboutSection() {
return (
    <>
    <Navbar />
    <section className="about-section">
        <div className="about-content">
            <h1>
                <a className="header1" href="#">
                    About Us
                </a>
            </h1>
            <p className="about-paragraph">
                Skill Route is an online platform designed to help individuals navigate their career paths in Engineering. It provides guidance in choosing a Field, offering insights into all engineering disciplines and future paths. Users can explore various fields, assess their expected knowledge, and take tests that reveal their actual knowledge status. The platform encourages continuous learning, growth, and self-assessment to improve job prospects over time. Additionally, Skill Route emphasizes motivation, consistency, and patience as key factors for career success.
            </p>
            <button
                className="register-button"
                onClick={() => (window.location.href = "#")}
            >
                <i className="fas fa-user-plus"></i> Register now and explore our platform
            </button>
        </div>
        <img
            src="#"
            alt="About Skill Route"
            className="about-image" />
    </section>
    </>
);
}

export default AboutSection;
