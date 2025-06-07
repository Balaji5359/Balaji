import React from "react";
import "./techList.css";
import { Link } from "react-router-dom";

class TechListPage extends React.Component {
    state = {
        techList: [
            { id: 1, name: "Full Stack Web Development", description: "Learn to build complete web applications from front to back." },
            { id: 2, name: "Artificial Intelligence", description: "Explore the world of AI and machine learning." },
            { id: 3, name: "Machine Learning", description: "Dive into algorithms and data analysis." },
            { id: 4, name: "Data Science", description: "Learn data analysis and visualization techniques." },
            { id: 5, name: "Cloud Computing", description: "Understand cloud services and deployment." },
            { id: 6, name: "Cybersecurity", description: "Learn to protect systems and networks." },
            { id: 7, name: "Blockchain Technology", description: "Explore decentralized applications and cryptocurrencies." },
            { id: 8, name: "Internet of Things (IoT)", description: "Connect devices and create smart solutions." },
            { id: 9, name: "Generative AI", description: "Learn about AI that can create content." },
        ],
        showNote: false,
    }
    render() {
        return (
            <div>
                <div className="tech-list">
                    <div className="tech-list-header">
                        <h1>Welcome to the Technologies Place of the world ruling Digital World!...</h1>
                        <p>Discover trending technologies and design your own path to success.</p>
                    </div>
                    <div className="tech-list-container">
                        {this.state.techList.map(tech => (
                            <div className="tech-list-item" key={tech.id}>
                                <h2>{tech.name}</h2>
                                <p>{tech.description}</p>
                                <Link to={`/tech-card`} state={{ techName: tech.name }}>
                                    <button className="tech-list-button">Explore</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="tech-list-footer">
                        {!this.state.showNote && (
                            <button onClick={() => this.setState({ showNote: true })}>
                                Ready for Next Step?
                            </button>
                        )}
                        {this.state.showNote && (
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
            </div>
        );
    }
}

export default TechListPage;
