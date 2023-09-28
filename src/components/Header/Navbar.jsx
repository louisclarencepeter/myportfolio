import React, { useEffect } from 'react';
import './Navbar.scss';
import logo from '../../assets/images/me.jpg';

const Navbar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar && window.pageYOffset >= navbar.offsetTop) {
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

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <input className="checkbox" type="checkbox" />
        <div className="hamburger-lines">
          {[1, 2, 3].map((line) => (
            <span key={line} className={`line line${line}`} />
          ))}
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-items">
          {['Home', 'About Me', 'My Projects', 'Contact'].map((item, index) => (
            <li key={index}>
              <a href="#">{item}</a>
            </li>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
