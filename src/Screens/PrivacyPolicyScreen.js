import React from "react";
import './ScreenCss/PrivacyPolicy.css'
import { Link } from 'react-router-dom';
function PrivacyPolicyScreen() {
  const products = JSON.parse(localStorage.getItem('products-key-xxx'));
  console.log({ products });

  return (
    <div className="privacyPolicyContainer">
      <Link to='/LoginScreen'>
        <button className="privacy-backButton">Back to Login</button>
      </Link>
      <h1 className="privacyTitle">Privacy Statement for TechnoTreasure</h1>
      <p>Last updated: 10/18/2023</p>
      <p>At TechnoTreasure, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Statement explains how we collect, use, disclose, and safeguard your personal data. By using our website and services, you consent to the practices described in this statement.</p>

      <h2>1. Information We Collect:</h2>
      <ul>
        <li><strong>Personal Information:</strong> This may include your name, email address, phone number, billing and shipping addresses, and payment information.</li>
        <li><strong>Usage Information:</strong> We may collect information about your interactions with our website, such as your IP address, browser type, and operating system.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to collect data about your browsing activity on our website for analytics and advertising purposes. You can manage your cookie preferences through your browser settings.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information for the following purposes:</p>
      <ul>
        <li><strong>Order Fulfillment:</strong> To process your orders, send order confirmations, and provide customer support.</li>
        <li><strong>Account Maintenance:</strong> To manage your account, including providing access to your order history and personalized content.</li>
        <li><strong>Marketing:</strong> To send you promotional materials, updates, and information about our products and services. You can opt-out of marketing communications at any time.</li>
        <li><strong>Analytics:</strong> To analyze website traffic, monitor user behavior, and improve our website and services.</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We may share your information with third parties for specific purposes:</p>
      <ul>
        <li><strong>Service Providers:</strong> We may share your information with third-party service providers that help us deliver our services, such as payment processors and shipping companies.</li>
        <li><strong>Legal Compliance:</strong> We may disclose information in response to a legal request, if required by law, or to protect our rights and the rights of others.</li>
      </ul>

      <h2>4. Security</h2>
      <p>We take data security seriously and employ industry-standard measures to protect your personal information. However, no data transmission is completely secure, and we cannot guarantee the absolute security of your data.</p>

      <h2>5. Your Rights</h2>
      <p>You have certain rights regarding your personal information, including the right to access, correct, delete, or restrict the processing of your data. If you have any questions or requests related to your data, please contact us using the information below.</p>

      <h2>6. Changes to this Privacy Statement</h2>
      <p>We may update this Privacy Statement to reflect changes in our practices or for legal and regulatory reasons. Any changes will be posted on this page with an updated "last updated" date.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Statement or your personal information, please contact us at:</p>
      <p> <strong>Email:</strong> contact@example.com</p>
      <p><strong>Phone:</strong> +123-456-7890</p>
      <p><strong>Mailing Address:</strong> 123 Happy St, San Antonio, USA, 78249</p>


    </div>
  );
}

export default PrivacyPolicyScreen;
