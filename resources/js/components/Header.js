import React from 'react';
import { Link } from 'react-router-dom';
//import ReactDOM from 'react-dom';
//import Logo from ;
//import './orderRequest.css';

const Header = () => {
    return (
      <nav className="nav"> 
        <div className="logo">
          <a href="/"><img src={window.location.origin + '/img/Logo.png'} alt="logo" height={110} width={110} /></a>
        </div>
        <div className="navtext-1"><h1>Order Requests</h1></div>
        <div className="navtext-2"><a href="/help" className="navtext-2">Need Help?</a></div>
      </nav>
    )
}

export default Header;
