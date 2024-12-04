import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from '../Components/NavigationBar';
import './ScreenCss/MyProfile.css';
import {Link} from 'react-router-dom';

import { useEffect } from 'react';
import axios from "axios";

function MyProfileScreen(props) {

  let data = useLocation();
  console.log(data.state)
  console.log(data.state.userFirstName)
  console.log(data.state.testid)

  
  console.log("MyProfile");
  console.log(localStorage.getItem('activeUser'));
  const activeUserID = localStorage.getItem('activeUser');

  const [userTest, setUserTest] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  useEffect(() => {
    // Fetch user data
    axios.get("http://localhost:3001/users/" + activeUserID).then((res) => {
      setUserTest(res.data);
    });

    // Retrieve and filter orders from localStorage
    const orders = Object.keys(localStorage)
      .filter(key => key.includes(`UserId-${activeUserID}`))
      .map(key => JSON.parse(localStorage.getItem(key)));

    setUserOrders(orders);
  }, [activeUserID]);

  useEffect(() => {
    console.log(userTest);
    console.log(userOrders);
  }, [userTest, userOrders]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

   // Handler to prevent editing of uneditable fields
   const preventEdit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="MainContainerForMyProfileScreen">
    <NavBar /> 
      <div className="WelcomeSection">
      <h3>Welcome {userTest.firstname} {userTest.lastname}!</h3>
      </div>
      <div className="ContentContainer">
        <div className="LeftSection">
          <div className="ManageAccountSection">
            <h2>Manage My Account</h2>
            <ul className="CenteredButtons">
              <li>
                <Link to={'/EditProfileScreen'}
                  state= {{ userFirstName: "Musquan", userLastName: "Karovalia", userEmail: "MusquanKarovalia@gmail.com", userShippingAddress: "UTSA - Shipping", userBillingAddress: "UTSA - Billing", testid: "654b15bceb65eab62c7897fe"}}
                  >
                  <button aria-label="Edit My Profile Button" className="MyProfileButtons">Edit My Profile</button>
                </Link>
              </li>
              <li>
                <Link to="/WishlistScreen">
                  <button className="MyProfileButtons">My Wishlist</button>
                </Link>
              </li>
              <li>
                <Link to="/ProductCartScreen">
                  <button className="MyProfileButtons">My Cart</button>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button className="MyProfileButtons"> Logout </button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="MyOrderDetailsSection">
            <h2>My Order Details</h2>
            {userOrders.map((order, index) => (
              <div key={index} className="OrderItem" onClick={() => handleOrderClick(order)}>
                <p>Order ID: <span>{order.orderId}</span></p>
              </div>
            ))}
          </div>  
        </div>   
        <div className="RightSection"> 
          <div className="MyProfileSection">
            <h2>My Profile</h2>
              <form>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={userTest.firstname}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={userTest.lastname}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={userTest.email}
                  />
                </div>
                <div className="form-group">
                  <label>Shipping Address:</label>
                  <input
                    type="text"
                    value={userTest.shippingaddress}
                  />
                </div>
                <div className="form-group">
                  <label>Billing Address:</label>
                  <input
                    type="text"
                    value={userTest.billingaddress}
                  />
                </div>
              </form>
          </div>    
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Order Details</h3>
            <div className="order-details">
              {selectedOrder && (
                <div className="OrderItem">
 
                  <p><strong>Order ID:</strong> <span>{selectedOrder.orderId}</span></p>
                  <p><strong>Order Total:</strong> <span>${selectedOrder.orderTotal}</span></p>
                  <p><strong>Order PhoneNumber:</strong> <span>{selectedOrder.phoneNumber}</span></p>
                  <p><strong>Order Email:</strong> <span>{selectedOrder.emailAddressUsed}</span></p>
                  <p><strong>Order Payment Method:</strong> <span>{selectedOrder.paymentMethod}</span></p>
                  <p><strong>Card Number:</strong> <span>{selectedOrder.creditCardNumber}</span></p>
                  <p><strong>Order Shipping Address:</strong> <span>{selectedOrder.shippingAddress}</span></p>
                  <p><strong>Order Billing Address:</strong> <span>{selectedOrder.billingAddress}</span></p>
            
                  <h3>Products in the order:</h3>

                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="ProductItem">
                      <p><strong>Product Number:</strong> {index+1}</p>
                      <p><strong>Name:</strong> {product.productName}</p>
                      <p><strong>Price: </strong>{product.productPrice}</p>
                      {index < selectedOrder.products.length - 1 && (
                        <hr style={{ borderTop: '1px solid #FFFFF7', width: '30%', margin: '5px 0' }} />
                      )}  
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    
    
    </div>
  );
}

export default MyProfileScreen;
