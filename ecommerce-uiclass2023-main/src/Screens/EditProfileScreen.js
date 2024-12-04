// EditProfileScreen.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from '../Components/NavigationBar';
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from '../Components/SuccessModal';
import './ScreenCss/EditProfile.css';


function EditProfileScreen(props) {
  // Getting the data through props 

  const activeUserID = localStorage.getItem('activeUser');

  let data = useLocation();
  // Check if data and data.state are not null or undefined before accessing testid
  console.log(data && data.state && data.state.testid);

  const [userTest, setUserTest] = useState([]);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  // Add a state variable to track the field with an error
  const [errorField, setErrorField] = useState("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    // Check if data and data.state are not null or undefined before making the API call
    if (activeUserID) {
      function getUserTest() {
        axios.get("http://localhost:3001/users/"+activeUserID).then((res) => {
          setUserTest(res.data);
        });
      }
      getUserTest();
      }
    }, [data]);
  
  useEffect(() => {
    console.log(userTest);
  }, [userTest]);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [shippingaddress, setShippingAddress] = useState("");
  const [billingaddress, setBillingAddress] = useState("");
  const [password, setPassword] = useState("");

  console.log(userTest.password)
  
  //check if all the fields have values
  const handleSave = (e) => {  
    e.preventDefault(); // Prevent the default form submission behavior

    if (!firstname){
      setErrorField("firstname");
      setError("Please fill in the First Name");
      return;
    }

    if (!lastname){
      setErrorField("lastname");
      setError("Please fill in the Lirst Name");
      return;
    }

    if (!phonenumber){
      setErrorField("phonenumber");  
      setError("Please fill in the Phone Number");
      return;
    }

    if (!shippingaddress){ 
      setErrorField("shippingaddress"); 
      setError("Please fill in the Shipping Address");
      return;
   }

    if (!billingaddress){ 
      setErrorField("billingaddress"); 
      setError("Please fill in the Billing Address");
      return;
    }

    if (!password){ 
      setErrorField("password"); 
      setError("Please fill in the Password");
      return;
    }

    // If no errors, reset errorField
    setErrorField("");

    // Validate first name (should not contain digits)
    if (/\d/.test(firstname)) {
      setErrorField("firstname")
      setError("First name should not contain digits");
      return;
    }

    // Validate last name (should not contain digits)
    if (/\d/.test(lastname)) {
      setErrorField("lastname")
      setError("Last name should not contain digits");
      return;
    }

    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setErrorField("email")
      setError("Invalid email format");
      return;
    }

    // Validate phone
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phonenumber)) {
      setErrorField("phonenumber")
      setError("Invalid phone format. Use ###-###-####");
      return;
    }

    // Validate if the new password and confirm password match
    if (password === userTest.password) {
      // Prepare the data to send to the server
      const userDataToUpdate = {
        ...userTest,
        firstname: firstname || userTest.firstname, 
        lastname: lastname || userTest.lastname, 
        email: email || userTest.email, 
        phonenumber: phonenumber || userTest.phonenumber,
        shippingaddress: shippingaddress || userTest.shippingaddress, 
        billingaddress: billingaddress || userTest.billingaddress, 
        password: password || userTest.password,
      };

      console.log(userDataToUpdate);
    
      // Make an API request to update the user's data
      axios
        .post("http://localhost:3001/users/update/"+activeUserID, userDataToUpdate)
        .then((res) => {
          // Handle success - e.g., show a success message
          console.log("User updated!");
          // Open the success modal
          setIsSuccessModalOpen(true);
         // navigate("/MyProfileScreen", {state:{testid: "654b15bceb65eab62c7897fe" }});
        })
        .catch((err) => {
          // Handle errors - e.g., show an error message
          console.error("Error: " + err);
          setError("An error occurred while updating the profile. Please try again.");
        });
      }else{
        setError("Incorrect Password");
        setErrorField("password")
        return;
      }
  };

  const handleModalClose = () => {
    // Close the success modal
    setIsSuccessModalOpen(false);
    // Redirect to MyProfileScreen
    navigate("/MyProfileScreen", { state: { testid: "654b15bceb65eab62c7897fe" } });
  };
  

  const handleCancel = () => {
    // Reset the form fields to their initial values
    setFirstName(userTest.firstname || "");
    setLastName(userTest.lastname || "");
    setEmail(userTest.email || "");
    setPhoneNumber(userTest.phonenumber || "");
    setShippingAddress(userTest.shippingaddress || "");
    setBillingAddress(userTest.billingaddress || "");
    setPassword("");
  };

  return (
    <div className="MainContainerForEditProfileScreen">
    <NavBar /> 
      <div className="WelcomeSection">
        <h3>Welcome {userTest.firstname} {userTest.lastname}!</h3>
      </div>
      <div className="ContentContainer">
        <div className="LeftSection">
          <div className="ManageAccountSectionEdit">
            <h2>Manage My Account</h2>
            <ul className="CenteredButtons">
              <li>
              <Link to={'/MyProfileScreen'}
                  state= {{ userFirstName: "Musquan", userLastName: "Karovalia", userEmail: "MusquanKarovalia@gmail.com", userShippingAddress: "UTSA - Shipping", userBillingAddress: "UTSA - Billing", testid: "654b15bceb65eab62c7897fe"}}
                  >
                  <button className="EditProfileButtons">My Profile</button>
                </Link>
              </li>
              <li>
                <Link to="/WishlistScreen">
                  <button className="EditProfileButtons">My Wishlist</button>
                </Link>
              </li>
              <li>
                <Link to="/CartScreen">
                  <button className="EditProfileButtons">My Cart</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>   
        <div className="RightSection"> 
          <div className="EditProfileSection">
            <h2>Edit Profile</h2>
              <form>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={firstname}
                    placeholder = {userTest.firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                   {errorField === "firstname" && <div className="error-message">{error}</div>}
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={lastname}
                    placeholder = {userTest.lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                    {errorField === "lastname" && <div className="error-message">{error}</div>}
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    placeholder = {userTest.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errorField === "email" && <div className="error-message">{error}</div>}
                </div>
                <div className="form-group">
                  <label>Phone Number:</label>
                  <input
                    type="tel"
                    value={phonenumber}
                    placeholder = {userTest.phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errorField === "phonenumber" && <div className="error-message">{error}</div>}
                </div>                
                <div className="form-group">
                  <label>Shipping Address:</label>
                  <input
                    type="text"
                    value={shippingaddress}
                    placeholder = {userTest.shippingaddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                  {errorField === "shippingaddress" && <div className="error-message">{error}</div>}
                </div>
                <div className="form-group">
                  <label>Billing Address:</label>
                  <input
                    type="text"
                    placeholder = {userTest.billingaddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                  />
                  {errorField === "billingaddress" && <div className="error-message">{error}</div>}
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    placeholder="*******"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errorField === "password" && <div className="error-message">{error}</div>}
                </div>
                <div className="button-group">
                  <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  <button className="save-button" onClick={handleSave}>Save Changes</button>
                </div>
              </form>
          </div>    
        </div>
      </div>
      {/* Include the SuccessModal component */}
      <SuccessModal
      isOpen={isSuccessModalOpen}
      message="Changes saved successfully!"
      onClose={handleModalClose}
     />
    </div>
  );
}

export default EditProfileScreen;
