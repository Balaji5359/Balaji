import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile_pages.css";
function ProfileCreation() {
    const navigate = useNavigate();
    const [statusCode,setStatusCode] = useState(0)
    const [message,setMessage] = useState("")
    const user_email = localStorage.getItem("email");
    const [form, setForm] = useState({
        username: "",
        name: "",
        surname: "",
        gender: "",
        dob: "",
        age: "",
        email: "",
        college_email: "",
        phone: "",
        college: "",
        program: "",
        branch: "",
        year: "",
        state: "",
        city: "",
        hobbies: "",
        bio: "",
    });

    // Calculate age from dob
    const calculateAge = (dob) => {
        if (!dob) return "";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "dob") {
            setForm((prev) => ({
                ...prev,
                dob: value,
                age: calculateAge(value),
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'https://jaumunpkj2.execute-api.ap-south-1.amazonaws.com/dev/signup/login/profile_data';

        const data = {
            username: form.username,
            firstname: form.name,
            lastname: form.surname,
            gender: form.gender,
            dob: form.dob,
            personalemail: user_email || form.email,
            collegeemail: form.college_email,
            phone: form.phone,
            age: form.age,
            collegename: form.college,
            program: form.program,
            branch: form.branch,
            year_of_study: form.year,
            state_of_student: form.state,
            city: form.city,
            hobbies: form.hobbies,
            about: form.bio,
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            console.log(response)
            setStatusCode(response.status)
            if (statusCode === 200){
                setMessage("Profile Created Successfully")
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h1>Student Profile</h1>
            <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="profile-section">
                    <h2 className="section-title">Personal Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={form.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="surname">Last Name</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                required
                                value={form.surname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                className="gender-select"
                                required
                                value={form.gender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                required
                                value={form.dob}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={form.age}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="profile-section">
                    <h2 className="section-title">Contact Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">
                                Personal Email (Give gmail used while Register)
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="college_email">College Email</label>
                            <input
                                type="email"
                                id="college_email"
                                name="college_email"
                                required
                                value={form.college_email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Academic Information Section */}
                <div className="profile-section">
                    <h2 className="section-title">Academic Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="college">College Name</label>
                            <input
                                type="text"
                                id="college"
                                name="college"
                                required
                                value={form.college}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="program">Program</label>
                            <select
                                id="program"
                                name="program"
                                required
                                value={form.program}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Program
                                </option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="M.Tech">M.Tech</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="branch">Branch</label>
                            <select
                                id="branch"
                                name="branch"
                                required
                                value={form.branch}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Branch
                                </option>
                                <option value="CSE">Computer Science</option>
                                <option value="ECE">Electronics</option>
                                <option value="ME">Mechanical</option>
                                <option value="CE">Civil</option>
                                <option value="EE">Electrical</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <select
                                id="year"
                                name="year"
                                required
                                value={form.year}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Year
                                </option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <select
                                id="state"
                                name="state"
                                required
                                value={form.state}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select State
                                </option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Bihar">Bihar</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={form.city}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="profile-section">
                    <h2 className="section-title">Additional Information</h2>
                    <div className="form-group">
                        <label htmlFor="hobbies">Hobbies</label>
                        <input
                            type="text"
                            id="hobbies"
                            name="hobbies"
                            value={form.hobbies}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">About Me (optional)</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="4"
                            value={form.bio}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit">Create Profile</button>
                <div>
                    <p className="login-link" style={{ color: "green" }}>{message}</p>
                </div>
            </form>
        </div>
    );
}

export default ProfileCreation;
