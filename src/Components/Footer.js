import React from 'react';
import "./ComponentCss/Footer.css";
import {Link} from 'react-router-dom';

function Footer(){
    return (
        <div className='footerAllContainer'>
            <ul className='FooterList'>
                <Link to='ContactUsScreen' className='FooterLinks'> <li> Contact Us </li> </Link>
                <Link to='FAQsScreen' className='FooterLinks'> <li> FAQs </li> </Link>
                <Link to='PrivacyPolicyScreen' className='FooterLinks'> <li> Privacy Policy </li> </Link>
                <li> © TechnoTreasure 2023. </li>
            </ul>
        </div>
    )
}
export default Footer;

