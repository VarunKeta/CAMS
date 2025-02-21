import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  return (
    <header className="header bg-dark text-white py-4 shadow">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center">
          {/* <img src="https://i.imgur.com/bqAB7QJ.png" alt="Logo" className="logo" /> */}
          <h2 className="m-0 fw-bold">
            <span className="text-primary">Campus</span>Connect
          </h2>
        </div>
        <nav className="mt-3 mt-md-0">
          <ul className="nav flex-column flex-md-row gap-2">
            <li className="nav-item">
              <Link 
                className="btn btn-outline-light px-4 fw-semibold hover-scale me-5" 
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="btn btn-outline-light px-4 fw-semibold hover-scale" 
                to="/admin/login"
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
