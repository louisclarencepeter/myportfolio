import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/me.jpg';

const menuItems = ['Home', 'About Me', 'My Projects', 'Contact'];

const useStickyNavbar = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (window.pageYOffset >= navbar.offsetTop) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

const NavbarItem = ({ item, handleMenuItemClick }) => (
  <li onClick={handleMenuItemClick}>
    <a href={`#${item.replace(/\s+/g, '').toLowerCase()}`}>{item}</a>
  </li>
);

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  useStickyNavbar();

  const handleMenuItemClick = useCallback(() => setIsChecked(false), []);

  return (
    <nav className="navbar">
      <div className="container nav-container">

        <div className="classicalmenu" >
          <div className="classicalmenu-logo">
            <img src={logo} alt="logo" />
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <NavbarItem key={index} item={item} handleMenuItemClick={handleMenuItemClick} />
            ))}
          </ul>
        </div>

        <input 
          className="checkbox" 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => setIsChecked(e.target.checked)} 
        />

        <div className="hamburger-lines" onClick={() => setIsChecked(!isChecked)}>
          {[1, 2, 3].map((line) => <span key={line} className={`line line${line}`} />)}
        </div>

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <ul className="menu-items">
          {menuItems.map((item, index) => (
            <NavbarItem key={index} item={item} handleMenuItemClick={handleMenuItemClick} />
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
