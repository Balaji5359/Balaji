import Navbar from "./Navbar";
import "./main.css"
function ContactSection() {
    return (
        <>
        <Navbar />
        <section className="color-light" id="contact-sec">
        <div className="highlights-section">
            <div className="highlights-content">
            <div className="col-md-8 col-md-offset-2">
                <h1>Locate Us here</h1>
                <h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec nisl odio. Mauris vehicula at nunc id posuere.
                </h4>
            </div>
            </div>

            <div className="row">
            <div className="col-md-5 contact-cls">
                <h1>Our Address</h1>
                <div>
                <span>
                    <i className="fa fa-home"></i> Address: MITS, MPL
                </span>
                <br />
                <span>
                    <i className="fa fa-phone"></i> Phone: 9398350217
                </span>
                </div>
            </div>
            <div className="col-md-7">
                <br />
                <div id="social-icon">
                <a href="#">
                    <i className="fab fa-facebook fa-2x"></i>
                </a>
                <a href="#">
                    <i className="fab fa-twitter fa-2x"></i>
                </a>
                <a href="#">
                    <i className="fab fa-linkedin fa-2x"></i>
                </a>
                <a href="#">
                    <i className="fab fa-google-plus fa-2x"></i>
                </a>
                <a href="#">
                    <i className="fab fa-pinterest fa-2x"></i>
                </a>
                </div>
            </div>
            </div>
        </div>
        </section>
        </>
    );
}

export default ContactSection;
