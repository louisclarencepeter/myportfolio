// Footer.js
import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer>
      {/* Footer content */}
      <div>
        <p>© 2023 Louis Peter</p> <a className='f-p' href="./impressum.html">Impressum</a>
      </div>
      <div className='f-icons'>
        <a href="https://github.com/louisclarencepeter" target="_blank">
          <i className="fa-brands fa-github" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
