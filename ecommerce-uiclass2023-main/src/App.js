import logo from './logo.svg';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import Navbar from './Components/NavigationBar'
import Footer from './Components/Footer'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import TestScreen from './Screens/TestScreen'

import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'
import MainScreen from './Screens/MainScreen'
// import ProductDetailScreen from './Screens/ProductDetailScreen'
import EditProfileScreen from './Screens/EditProfileScreen'
import ContactUsScreen from './Screens/ContactUsScreen'
import PrivacyPolicyScreen from './Screens/PrivacyPolicyScreen'
import FAQsScreen from './Screens/FAQsScreen'
import CartScreen from './Screens/CartScreen'
import WishlistScreen from './Screens/WishlistScreen';
import ForgotPassword from './Screens/ForgotPassword';
import CheckoutScreen from './Screens/CheckoutScreen';
import MyProfileScreen from './Screens/MyProfileScreen';
import ProductInformationScreen from './Screens/ProductInformationScreen';

import ProductCartScreen from './Screens/ProductCartScreen';
//import TotalCheckoutScreen from '../src/Screens/TotalCheckoutScreen';

import React from 'react';



const AppStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const MainContentStyle = {
  flex: 1,
};

function App() {
  return (
    <Router>
      <div style={AppStyle}>
        { /*<Navbar /> */}
        <div style={MainContentStyle}>
          <Routes>
            {/* Comment for testing */}
            <Route path="/TestScreen" element={<TestScreen />} />

            <Route path="/" element={<LoginScreen />} />
            <Route path="/MainScreen" element={<MainScreen />} />
            <Route path="/SignupScreen" element={<SignupScreen />} />
            <Route path="/LoginScreen" element={<LoginScreen />} />
            <Route path="/EditProfileScreen" element={<EditProfileScreen />} />
            {/* <Route path="/ProductDetailScreen" element={<ProductDetailScreen />} /> */}
            <Route path="/ContactUsScreen" element={<ContactUsScreen />} />
            <Route path="/PrivacyPolicyScreen" element={<PrivacyPolicyScreen />} />
            <Route path="/FAQsScreen" element={<FAQsScreen />} />
            <Route path="/CartScreen" element={<CartScreen cart={undefined} removeFromCart={undefined} />} />
            <Route path="/WishlistScreen" element={<WishlistScreen />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            {/* <Route path="/CheckoutScreen" element={<CheckoutScreen />} /> */}
            <Route path="/MyProfileScreen" element={<MyProfileScreen />} />
            <Route path='/ProductCartScreen' element={<ProductCartScreen />} />

            <Route path='/ProductInformationScreen' element={<ProductInformationScreen />} />
            <Route path='/CheckoutScreen' element={<CheckoutScreen />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
