import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-auto shadow-lg">
      <div className="container">
        <div className="row text-center align-items-center">
          <div className="col-md-4 mb-3">
            <h6 className="mb-0 fw-bold">
              <span className="text-primary">Campus</span>Connect.vnrvjiet
            </h6>
          </div>
          <div className="col-md-4 mb-3">
            <p className="mb-0">
              Connect with us: 
              <a href="#" className="text-decoration-none text-white mx-2 hover-bright">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              |
              <a href="#" className="text-decoration-none text-white mx-2 hover-bright">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <p className="mb-0 text-muted">© 2024 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
