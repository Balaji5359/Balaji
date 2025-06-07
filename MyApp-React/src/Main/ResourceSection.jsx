import React from 'react';
import "./main.css";
function ResourcesSection() {
    return (
        <section className="highlights-section">
        <div className="highlights-content">
            <h1>
            <a className="header1" href="services.html">
                Who are all here to help Students?
            </a>
            </h1>
            <ul className="list-style">
            <li>
                Skill Route Team{" "}
                <button className="arrow-button">
                <i className="fas fa-arrow-right"></i>
                </button>
            </li>
            <li>
                Professors and Placement Team of College{" "}
                <button className="arrow-button">
                <i className="fas fa-arrow-right"></i>
                </button>
            </li>
            <li>
                Alumni Students of college{" "}
                <button className="arrow-button">
                <i className="fas fa-arrow-right"></i>
                </button>
            </li>
            <li>
                Different Companies (Product, Service, StartUp){" "}
                <button className="arrow-button">
                <i className="fas fa-arrow-right"></i>
                </button>
            </li>
            <li>
                Employees, HR's and Mentors of different Companies{" "}
                <button className="arrow-button">
                <i className="fas fa-arrow-right"></i>
                </button>
            </li>
            </ul>
        </div>
        </section>
    );
}

export default ResourcesSection;
