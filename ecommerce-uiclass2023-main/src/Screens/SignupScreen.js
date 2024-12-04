import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './ScreenCss/SignUp.css';

import waveImage from '../Images/bg_wave.png';
import avatarImage from '../Images/avatar.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUpScreen() {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phone) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const isPasswordValid = (password) => {
    // You can add your own password validation criteria here
    return password.length >= 8; // Minimum 8 characters for example
  };

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    const newErrorMessages = {
      email: !isEmailValid(userCredentials.email)
        ? "Please enter a valid email address."
        : "",
      phone: !isPhoneValid(userCredentials.phone)
        ? "Please enter a valid phone number in the format: 123-456-7890."
        : "",
      password: !isPasswordValid(userCredentials.password)
        ? "Password must be at least 8 characters long."
        : "",
      confirmPassword:
        userCredentials.password !== userCredentials.confirmPassword
          ? "Passwords do not match. Please try again."
          : "",
    };

    setErrorMessages(newErrorMessages);

    // Check if there are any error messages, and if not, continue with signup
    if (Object.values(newErrorMessages).every((msg) => msg === "")) {
      try {
        // Make an HTTP POST request to your server's /users/add endpoint
        const response = await axios.post("http://localhost:3001/users/add", {
          firstname: userCredentials.firstName,
          lastname: userCredentials.lastName,
          phonenumber: userCredentials.phone,
          email: userCredentials.email,
          password: userCredentials.password,
          billingaddress: "", // Add your billing address logic here
          shippingaddress: "", // Add your shipping address logic here
        });

        console.log(response.data); // Log the response from the server

        // After successful registration, you can navigate to the login screen or any other page
        navigate("/LoginScreen");
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setUserCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="MainContainerForSignUpScreen">
      <h1>Welcome to TechnoTreasure</h1>
      <img className="signup-wave" src={waveImage} alt="Wave" />
      <h2>Sign Up</h2>
      <div className="signup-avatar">
        <img src={avatarImage} alt="Avatar" />
      </div>
      <div className="signup-name">
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            id="first-name"
            placeholder="John"
            value={userCredentials.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            id="last-name"
            placeholder="Doe"
            value={userCredentials.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </div>
      </div>
      <div className="signup-email">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            value={userCredentials.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {errorMessages.email && (
            <div className="error-message">
              <span className="error-icon">⚠️</span> {errorMessages.email}
            </div>
          )}
        </div>
      </div>
      <div className="signup-other">
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            placeholder="123-456-7890"
            value={userCredentials.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          {errorMessages.phone && (
            <div className="error-message">
              <span className="error-icon">⚠️</span> {errorMessages.phone}
            </div>
          )}
        </div>
      </div>
      <div className="signup-other">
        <div>
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="********"
            value={userCredentials.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <span onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <FontAwesomeIcon icon={faEyeSlash} className="faicon" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="faicon" />
            )}
          </span>

          {errorMessages.password && (
            <div className="error-message">
              <span className="error-icon">⚠️</span> {errorMessages.password}
            </div>
          )}
        </div>
      </div>
      <div className="signup-other">
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>

          <input
            id="confirm-password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="********"
            value={userCredentials.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          />
          <span onClick={toggleConfirmPasswordVisibility}>
            {isConfirmPasswordVisible ? (
              <FontAwesomeIcon icon={faEyeSlash} className="faicon" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="faicon" />
            )}
          </span>

          <div className="error-message">{errorMessages.confirmPassword}</div>
        </div>
      </div>
      <div className="signup-button-container">
        <button className="signup-button" onClick={handleSignUp}>
          Signup
        </button>
      </div>

      <p className="signup-text" onClick={() => navigate("/LoginScreen")}>
        Login to an existing account ?
      </p>
    </div>
  );
}

export default SignUpScreen;