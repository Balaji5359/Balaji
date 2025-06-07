import Navbar from "./Main/Navbar.jsx"  
import WelcomeSection from "./Main/WelcomeSection.jsx"
import AboutSection from "./Main/AboutSection.jsx"
import HighlightsSection from "./Main/HighlightsSection.jsx"
import SelfAssessment from "./Main/SelfAssessment.jsx"
import MotivationSection from "./Main/MotivationSession.jsx"
import ResourceSection from "./Main/ResourceSection.jsx"
import ContactSection from "./Main/ContactSection.jsx"
import MapSection from "./Main/MapSection.jsx"
import Login from "./RegisterFiles/Login.jsx"
import React from "react"
import Signup from "./RegisterFiles/Signup.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Services from "./Main/Services.jsx"
import ProfileCreation from "./StudentProfileFiles/ProfileCreation.jsx"
import ProfileData from "./StudentProfileFiles/ProfileData.jsx"
import Login_Navbar from "./RegisterFiles/Login_Navbar.jsx"
import TechList_page from "./FieldSelectionFiles/TechList.jsx"
import Tech_Card from "./FieldSelectionFiles/Tech-Card.jsx"
import Tech from "./FieldSelectionFiles/Tech.jsx"
import Tech_Selection from "./FieldSelectionFiles/TechSelection.jsx"
import PlacementPrediction1 from "./FieldSelectionFiles/Placement_Prediction1.jsx"
import PlacementRatingForm from "./FieldSelectionFiles/PlacementRatingForm.jsx"

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Navbar/>
                            <WelcomeSection/>
                            <AboutSection/>
                            <HighlightsSection/>
                            <SelfAssessment/>
                            <MotivationSection/>
                            <ResourceSection/>
                            <ContactSection/>
                            <MapSection/>
                        </>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/about" element={
                        <>
                            <Navbar/>
                            <AboutSection/>
                        </>
                    }/>
                    <Route path="/contact" element={
                        <>
                            <Navbar/>
                            <ContactSection/>
                        </>
                    }/>
                    <Route path="/services" element={
                        <>
                            <Navbar/>
                            <Services/>
                        </>
                    }/>
                    <Route path="/highlights" element={
                        <>
                            <Navbar/>
                            <HighlightsSection/>
                        </>
                    }/>
                    <Route path="/profilecreation" element={<ProfileCreation/>}/>

                    <Route path="/profiledata" element={
                        <>
                            <Login_Navbar/>
                            <ProfileData/>
                        </>
                    }/>
                    <Route path="/tech-list" element={
                        <>
                            <Login_Navbar/>
                            <TechList_page/>
                        </>
                    }/>
                    <Route path="/tech-card" element={
                        <>
                            <Login_Navbar/>
                            <Tech/>
                        </>
                    }/>
                    <Route path="/tech-selection" element={
                        <>
                            <Login_Navbar/>
                            <Tech_Selection/>
                        </>
                    }/>
                    <Route path="/placement-prediction1" element={
                        <>
                            <Login_Navbar/>
                            <PlacementPrediction1/>
                        </>
                    }/>
                    <Route path="/placement-prediction1/:field" element={
                        <>
                            <Login_Navbar/>
                            <PlacementRatingForm/>
                        </>
                    }/>

                   
                </Routes>
            </Router>
        </>
    );
}

export default App