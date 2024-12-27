import React from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <section id="footer">
      <div className="container-footer">
        <footer className="home-footer">
          <div className="footer-content">
            <Link to="https://www.instagram.com/seems_fit/profilecard/?igsh=MnFjMWpkb3BoY2Q=" target="_blank">
              <FaInstagram className="instagram-icon" />
            </Link>
            <p className="footer-text">Made in 2024</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;

