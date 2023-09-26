import React from 'react'
import './Navbar.scss'
import logo from '../../assets/images/me.jpg'

function Navbar() {
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1" />
              <span className="line line2" />
              <span className="line line3" />
            </div>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="menu-items">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Me</a>
              </li>
              <li>
                <a href="#">My Projects</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar