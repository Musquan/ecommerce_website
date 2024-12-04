import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './ScreenCss/Login.css';

import waveImage from '../Images/bg_wave.png';
import bgImage from '../Images/bg.png';
import avatarImage from '../Images/avatar.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

function LoginScreen() {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // this is the array that will store all the user's information that is pulled using the API
  const [users, setUsers] = useState([]);

  // how to access the users?
  // we can map the users .. since users is a list and then you can use it as a loop 
  // user has attributes -> id, firstname, lastname, billingaddress, shippingaddress, password, email
  /*
  {users.map((user) => (
    <div>
      <span>{user.email}</span><br></br>
      <span>{user.lastname}</span>
      <br></br>
      <br></br>
      <br></br>
    </div>
  ))}
  */

  useEffect(() => {
    function getUsers() {
      axios.get("http://localhost:3001/users/").then((res) => {
        setUsers(res.data);
      });
    }
      getUsers();
    }, []);
  
  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function addFocus() {
      this.parentNode.parentNode.classList.add("focus");
    }

    function removeFocus() {
      const parent = this.parentNode.parentNode;
      if (this.value === "") parent.classList.remove("focus");
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addFocus);
      input.addEventListener("blur", removeFocus);
    });
  }, []);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const userFound = users.find(user => user.email === email && user.password === password);
  
    if (userFound) {
      console.log("Login successful");
      console.log(userFound);
      console.log(userFound._id);
      localStorage.setItem('activeUser', userFound._id);
      //navigate("/TestScreen", {state:{user: userFound } });
      navigate("/TestScreen");
    } else {
      setError("Invalid email or password !!");
    }
  };
  

  return (
    <div className="MainContainerForLoginScreen">
      <img className="login-wave" src={waveImage} alt="Wave" />
      <h2 className="login-title">Welcome to TechnoTreasure</h2>
      <div className="login-container">
        <div className="login-img">
          <img src={bgImage} alt="Background" />
        </div>
        <div className="login-content">
          <form className="login-form" action="index.html">
            <img src={avatarImage} alt="Avatar" />
            <h2>Sign In</h2>
            <div className="input-div">
              <div className="i">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="div">
                <h5>Email</h5>
                <input aria-label="Enter your email"
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div">
              <div className="i">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div className="div">
                <h5>Password</h5>
                <input aria-label="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="login-show-password-button"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>
            <p className="error-message">{error}</p>
            <Link to="/ForgotPassword" className="login-links">Forgot Password?</Link>
            <button type="button" onClick={handleLogin} className="login-btn">
              Login
            </button>
            <p className="login-text">Don't have an account? <Link to="/SignupScreen" className="login-links">Sign Up here!</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <LoginScreen />
    </div>
  );
}
