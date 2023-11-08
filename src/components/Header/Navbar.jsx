import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/me.jpg';

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.pageYOffset >= navbar.offsetTop) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuItemClick = () => {
    // Uncheck the checkbox to close the menu
    setIsChecked(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <input className="checkbox" type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
        <div className="hamburger-lines" onClick={() => setIsChecked(!isChecked)}>
          {[1, 2, 3].map((line) => (
            <span key={line} className={`line line${line}`} />
          ))}
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="menu-items">
          {['Home', 'About Me', 'My Projects', 'Contact'].map((item, index) => (
            <li key={index} onClick={handleMenuItemClick}>
              <a href={`#${item.replace(/\s+/g, '').toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
