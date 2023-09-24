import React from 'react'
import logo from '../assets/images/me.jpg'
import '../styles/App.scss'

function Header() {
    return (
        < >
            <nav>
                <div class="navbar">
                    <div class="container nav-container">
                        <input class="checkbox" type="checkbox" name="" id="" />
                        <div class="hamburger-lines">
                            <span class="line line1"></span>
                            <span class="line line2"></span>
                            <span class="line line3"></span>
                        </div>
                        <div class="logo">
                            <img src={logo} alt="logo" srcset="" />
                        </div>
                        <div class="menu-items">
                            <li><a href="#">About Me</a></li>
                            <li><a href="#">My Projects</a></li>
                            <li><a href="#">Contact</a></li>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header