import React from "react";
import "./techList.css";
import techvideo from "./Mycalculator.mp4";
import photo from "./profile-logo.webp";

class TechListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_stack_techList: [
                { 
                    id: 1,
                    intro: "Full Stack Web Development", 
                    description: "Learn to build complete web applications from front to back.",
                    video: <video src={techvideo} controls width="100%" style={{borderRadius: "12px"}} />,
                    skills_list: [
                        {"Frontend Development": ["HTML, CSS, JavaScript", "React.js, Angular, Vue.js", "Responsive Design"]},
                        {"Backend Development": ["Node.js", "Express.js", "MongoDB, SQL", "Authentication"]},
                        {"DevOps": ["CI/CD", "Docker", "Cloud Providers (AWS, Heroku)"]},
                        {"Version Control": ["Git", "Branching", "Collaboration"]},
                        {"Soft Skills": ["Communication", "Teamwork", "Adaptability"]}
                    ]
                }
            ],
            full_stack_jobs: { 
                intro: "Available Job Roles", 
                Entry_Level_Roles: [
                    { "Junior Web Developer": {
                        Responsibilities: ["Assist in developing web applications", "Collaborate with senior developers", "Learn and apply new technologies"],
                        Skills: ["HTML, CSS, JavaScript", "Framework basics", "Git"]
                    }},
                    { "Front-End Developer": {
                        Responsibilities: ["Develop user interfaces", "Implement responsive designs", "Collaborate with designers"],
                        Skills: ["React, Angular", "CSS", "Git"]
                    }},
                    { "Back-End Developer": {
                        Responsibilities: ["Build server-side applications", "Manage databases", "Implement APIs"],
                        Skills: ["Node.js", "Express.js", "SQL/NoSQL"]
                    }}
                ]
            },
            Companies: {
                ServiceBased: ["TCS", "Wipro", "Cognizant", "Accenture", "Infosys"],
                ProductBased: ["Google", "Microsoft", "Amazon", "Facebook", "Apple"],
                Startups: ["Zomato", "Swiggy", "Ola", "Paytm", "Flipkart"]
            },
            Profiles: [
                { 
                    Photo: <img src={photo} alt="John Doe" />, 
                    Name: "John Doe", 
                    Address: "Bangalore, India",
                    LinkedIn: "https://linkedin.com/in/johndoe",
                    Website: "https://johndoe.dev",
                    WorkSamples: [
                        { label: "Portfolio", url: "https://johndoe.dev/portfolio" },
                        { label: "GitHub", url: "https://github.com/johndoe" }
                    ],
                    Experience: "5 years", 
                    Skills: ["React", "Node.js"], 
                    Salary: "₹10,00,000"
                },
                { 
                    Photo: <img src={photo} alt="Jane Smith" />, 
                    Name: "Jane Smith", 
                    Address: "Hyderabad, India",
                    LinkedIn: "https://linkedin.com/in/janesmith",
                    Website: "https://janesmith.com",
                    WorkSamples: [
                        { label: "Blog", url: "https://janesmith.com/blog" }
                    ],
                    Experience: "3 years", 
                    Skills: ["Angular", "Express.js"], 
                    Salary: "₹8,00,000"
                },
                { 
                    Photo: <img src={photo} alt="Alice Johnson" />, 
                    Name: "Alice Johnson", 
                    Address: "Pune, India",
                    LinkedIn: "https://linkedin.com/in/alicejohnson",
                    Website: "https://alicejohnson.dev",
                    WorkSamples: [
                        { label: "Website", url: "https://alicejohnson.dev" }
                    ],
                    Experience: "2 years", 
                    Skills: ["Vue.js", "MongoDB"], 
                    Salary: "₹6,00,000"
                }
            ]
        };
    }
    //const [Field_Array, setField_Array] = useState(["Blockchain Technology","Data Science","Generative AI","Cloud Computing","Internet of Things (IoT)",
    //   "Cybersecurity","Artificial Intelligence","Full Stack Web Development"]);

    render() {
        const { full_stack_techList, full_stack_jobs, Companies, Profiles } = this.state;
        return (
            <div className="tech-list">
                <h1>Full Stack Web Development</h1>
                <center>
                    <p>Explore each topic, gain knowledge, and design your own path to success.</p>
                    <button onClick={() => window.history.back()} className="back-button">Back</button>
                </center>
                <br />
                <div className="tech-list-container-content">
                    {full_stack_techList.map(tech => (
                        <div className="tech-list-item" key={tech.id}>
                            <h2>{tech.intro}</h2>
                            <p>{tech.description}</p>
                            <div className="video-container">
                                {tech.video}
                            </div>
                            <br />
                            {/* Skills Grid */}
                            <div>
                                <h3>Skills Required</h3>
                                <div className="skills-grid">
                                    {tech.skills_list.map((skillGroup, idx) => {
                                        const key = Object.keys(skillGroup)[0];
                                        return (
                                            <div className="skill-card" key={idx}>
                                                <strong>{key}</strong>
                                                <ul>
                                                    {skillGroup[key].map((skill, subIdx) => (
                                                        <li key={subIdx}>{skill}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <br />
                            {/* Job Roles Grid */}
                            <div>
                                <h3>Job Roles</h3>
                                <div className="jobs-grid">
                                    {full_stack_jobs.Entry_Level_Roles.map((job, idx) => {
                                        const key = Object.keys(job)[0];
                                        const value = job[key];
                                        return (
                                            <div className="job-card" key={idx}>
                                                <strong>{key}</strong>
                                                <ul>
                                                    {value.Responsibilities.map((resp, i) => (
                                                        <li key={i}>{resp}</li>
                                                    ))}
                                                </ul>
                                                <p><strong>Skills:</strong> {value.Skills.join(", ")}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <br />
                            {/* Companies Grid */}
                            <div className="companies-grid">
                                <h3>Top Companies Hiring</h3>
                                <div className="companies-grid">
                                    <div>
                                        <strong>Service Based</strong>
                                        <ul>
                                            {Companies.ServiceBased.map((company, idx) => (
                                                <li key={idx}>{company}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <strong>Product Based</strong>
                                        <ul>
                                            {Companies.ProductBased.map((company, idx) => (
                                                <li key={idx}>{company}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <strong>Startups</strong>
                                        <ul>
                                            {Companies.Startups.map((company, idx) => (
                                                <li key={idx}>{company}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <br />
                            {/* Profile Cards Row */}
                            <div>
                                <h3>Alumni & Employee Profiles</h3>
                                <div className="profiles-row">
                                    {Profiles.map((profile, idx) => (
                                        <div className="profile-card" key={idx}>
                                            <div className="profile-photo">{profile.Photo}</div>
                                            <h4>{profile.Name}</h4>
                                            <p className="profile-address">{profile.Address}</p>
                                            <p>Experience: {profile.Experience}</p>
                                            <p>Skills: {profile.Skills.join(", ")}</p>
                                            <p>Salary: {profile.Salary}</p>
                                            <a href={profile.LinkedIn} target="_blank" rel="noopener noreferrer" className="profile-link">LinkedIn</a>
                                            <a href={profile.Website} target="_blank" rel="noopener noreferrer" className="profile-link">Website</a>
                                            <div className="work-samples">
                                                {profile.WorkSamples.map((ws, i) => (
                                                    <a key={i} href={ws.url} target="_blank" rel="noopener noreferrer" className="profile-link">{ws.label}</a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TechListPage;