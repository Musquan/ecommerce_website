import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './ScreenCss/ForgotPassword.css';

function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">TechnoTreasure</h1>
      <h2 className="forgot-password-subtitle">
        Forgot Password ? <FontAwesomeIcon icon={faUserLock} />
      </h2>
      <p className="forgot-password-description">
        If you've forgotten your password, please check our{' '}
        <Link to="/FAQsScreen" className="forgot-password-faq-link">
          FAQ page
        </Link>{' '}
        for assistance.
      </p>
      <Link to="/LoginScreen" className="forgot-password-go-back-button">
        <FontAwesomeIcon icon={faArrowCircleLeft} /> back
      </Link>
    </div>
  );
}

export default ForgotPassword;
