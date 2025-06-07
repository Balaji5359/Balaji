import React from 'react';
import "./main.css";
function MapSection() {
    return (
        <section className="color-light" id="map-sec">
        <iframe
            className="cnt"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999841.293321206!2d-75.80920404999999!3d42.75594204999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew+York!5e0!3m2!1sen!2s!4v1395313088825"
            allowFullScreen
            loading="lazy"
            title="Location Map"
        ></iframe>
        </section>
    );
}

export default MapSection;
