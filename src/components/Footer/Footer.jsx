import React from 'react';
import './Footer.scss';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div>
        <p>© {currentYear} Louis Peter</p> 
        <a className='f-p' href="./impressum.html">Impressum</a>
      </div>
      <div className='f-icons'>
        <a href="https://github.com/louisclarencepeter" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
