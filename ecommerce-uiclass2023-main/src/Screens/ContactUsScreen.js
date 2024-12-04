import React, { useState } from "react";
import './ScreenCss/ContactUs.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


function ContactUsScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!email.trim() || !message.trim()) {
      alert("Please fill in both email and message fields.");
      return;
    }

    console.log("Sending message:", { name, email, message });
    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contactUsPage">
      <Link to='/LoginScreen'>
      <button className="contactUs-backButton">Back to Login</button>
      </Link>
      <div className="contactUs-welcomeSection">
        <p>Contact Us</p>
      </div>
      <div className="contactUs-contentContainer">
        <div className="contactUs-contactInfoSection">
          <h2>Contact Information</h2>
          <p><span><FontAwesomeIcon icon={faEnvelope} /> </span>  Email: support@technotreasure.com</p>
          <p><span><FontAwesomeIcon icon={faPhone} /></span>  Phone: +123-456-7890</p>
          <p><span><FontAwesomeIcon icon={faMapMarkerAlt} /> </span>  Address: 123 Happy St, San Antonio, USA, 78249</p>
        </div>
        <div className="contactUs-contactFormSection">
          <h1>Get in Touch !</h1>
          <p>(Our team will respond within 24 hours)</p>
          <form>
            <div className="contactUs-form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="contactUs-form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="contactUs-form-group">
              <label>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
              ></textarea>
            </div>
            <button type="button" className="contactUs-sendButton" onClick={handleSend}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsScreen;
