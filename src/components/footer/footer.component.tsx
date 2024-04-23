import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faXTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons"

import './footer.styles.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="footer-left">        
          <span>Privacy Policy</span>
          <span>Terms and Conditions</span>
          <span>About Us</span>  
          <span>Support</span>          
        </div>
        <div className="footer-right">
          <a 
            href="" 
            target="_blank" 
            rel="noopener noreferrer">
            <FontAwesomeIcon className="fa-instagram" icon={faInstagram} /></a>    
            <a 
            href="" 
            target="_blank" 
            rel="noopener noreferrer">
            <FontAwesomeIcon className="fa-x-twitter" icon={faXTwitter} /></a>    
            <a 
            href="" 
            target="_blank" 
            rel="noopener noreferrer">
            <FontAwesomeIcon className="fa-facebook" icon={faFacebook} /></a>    

        </div>
      </div>
      <span>@2024</span>
    </footer>
  );
};

export default Footer;