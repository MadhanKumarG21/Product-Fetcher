import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">

        {/* Left Section */}
        <div className="footerSection">
          <img 
            src="/Image/e-commmerce_image1.png" 
            alt="logo" 
            className="footerLogo"
          />
          <p>
            Your one-stop shop for all products. 
            Fast delivery, best price, and trusted quality.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footerSection">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Checkout</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footerSection">
          <h3>Categories</h3>
          <ul>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Beauty</li>
            <li>Groceries</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footerSection">
          <h3>Contact Us</h3>
          <p>Email: support@myshop.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Puducherry, India</p>
        </div>

      </div>

 

      {/* Bottom */}
      <div className="footerBottom">
        <p>© 2026 MyShop | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;