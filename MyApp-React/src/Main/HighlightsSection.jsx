import Navbar from "./Navbar";
import "./main.css";
function HighlightsSection() {
    return (
        <>
        <div>
        <Navbar/>
        <section className="highlights-section" >
            <div className="highlights-content" >
                <h1>
                    <a className="header1" href="#">
                        Highlights of Skill Route
                    </a>
                </h1>
                <ul className="list-style">
                    <li>Guiding Students in selecting Field for career</li>
                    <li>Analyzing the knowledge of the Student in the Field</li>
                    <li>Conducting Self-assessment for Evaluation</li>
                    <li>Provide Road-Map to expertise in the Field</li>
                    <li>Analyzing and Self-assessment monthly</li>
                    <li>Providing Job opportunities in the Field</li>
                </ul>
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
                className="about-image"
            />
        </section>
        </div>
        </>
    );
}

export default HighlightsSection;
