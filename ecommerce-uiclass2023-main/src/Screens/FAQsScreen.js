import React from "react";
import Footer from "../Components/Footer";
import './ScreenCss/FAQs.css';
import { Link } from 'react-router-dom';
function FAQsScreen() {
  return (
    <div className="faq-container">
       <Link to='/LoginScreen'>
      <button className="faq-backButton">Back to Login</button>
      </Link>
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <div className="faq-section">
        <h2 className="faq-heading">Ordering</h2>
        <div className="faq-item">
          <p className="faq-question">1. How do I place an order on your website?</p>
          <p className="faq-answer">Browse our products, add your selections to the cart, proceed to checkout, enter your shipping details, choose a payment method, and confirm your order.</p>
        </div>
        <div className="faq-item">
          <p className="faq-question">2. What payment methods do you accept?</p>
          <p className="faq-answer">We accept major credit cards, debit cards and PayPal.</p>
        </div>
      </div>
      <div className="faq-section">
        <h2 className="faq-heading">Returns and Shipping</h2>
        <div className="faq-item">
          <p className="faq-question">3. What is your return and exchange policy?</p>
          <p className="faq-answer">We accept returns within 30 days of purchase. Products must be in their original condition. For exchanges, please place a new order.</p>
        </div>
        <div className="faq-item">
          <p className="faq-question">4. Can I track my order?</p>
          <p className="faq-answer">Yes, a tracking number will be provided via email once your order is shipped. You can use this number on our website to track your order.</p>
        </div>
        <div className="faq-item">
          <p className="faq-question">5. How long will it take to receive my order?</p>
          <p className="faq-answer">Domestic orders typically take 3-5 business days. International orders can take up to 14 days, depending on the destination.</p>
        </div>
      </div>

      <div className="faq-section">
        <h2 className="faq-heading">International Orders</h2>
        <div className="faq-item">
          <p className="faq-question">6. Do you offer international shipping?</p>
          <p className="faq-answer">Yes, we ship internationally. Shipping costs and times vary depending on the destination country.</p>
        </div>
      </div>
      <div className="faq-section">
        <h2 className="faq-heading">Warranty and Support</h2>
        <div className="faq-item">
          <p className="faq-question">7. Are your products covered by a warranty?</p>
          <p className="faq-answer">Yes, our products come with a one-year warranty against manufacturing defects.</p>
        </div>
        <div className="faq-item">
          <p className="faq-question">8. Do you offer technical support for the products you sell?</p>
          <p className="faq-answer">Yes, technical support is available via email at support@technotreasure.com or by phone at  +123-456-7890.</p>
        </div>
      </div>
      <div className="faq-section">
        <h2 className="faq-heading">Promotions and Discounts</h2>
        <div className="faq-item">
          <p className="faq-question">9. Are there any promotions or discounts available?</p>
          <p className="faq-answer">We frequently offer promotions and discounts. Please visit our Promotions page</p>
        </div>
      </div>

      <div className="faq-section">
        <h2 className="faq-heading">Contact Information</h2>
        <div className="faq-item">
          <p className="faq-question">10. How do I contact your customer support team?</p>
          <p className="faq-answer">Reach our customer support at support@technotreasure.com, call us at  +123-456-7890, or you can mail us your query to our mailing address provides at contact us section.</p>
        </div>
      </div>

      <div className="faq-section">
        <h2 className="faq-heading">Additional Information</h2>
        <div className="faq-item">
          <p className="faq-question">11. Are your products certified or compliant with industry standards?</p>
          <p className="faq-answer">Yes, our products are compliant with FCC, CE, and RoHS standards.</p>
        </div>
        <div className="faq-item">
          <p className="faq-question">12. Do you offer bulk or wholesale purchasing options?</p>
          <p className="faq-answer">Yes, we provide special pricing for bulk and wholesale purchases. Contact our sales department for more details.</p>
        </div>
      </div>
      <div className="faq-item">
        <p className="faq-question">13. What is your privacy policy?</p>
        <p className="faq-answer">Our privacy policy outlines how we handle and protect customer data. It's available for review on our Privacy Policy page.</p>
      </div>
    </div>

  );
}

export default FAQsScreen;
