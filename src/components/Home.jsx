import React from 'react';
import myLogo from '../assets/images/me.jpg';
import '../styles/home.scss';

const Home = () => {
    return (
        <div className="home-container">

            {/* Header */}
            <header>
                <div>
                    <a href="./aboutme.html" aria-label="About Louis Peter">
                        <img src={myLogo} alt="Louis Peter Logo" />
                    </a>
                </div>
                <nav>
                    <ul>
                        <li><a href="./aboutme.html">About Me</a></li>
                        <li><a href="./myprojects.html">My Projects</a></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                {/* About Me Section */}
                <section>
                    <a href="./aboutme.html">
                        <h1>Louis Peter</h1>
                    </a>
                    <p>Aspiring Full Stack</p>
                    <h2><span className="highlight">Web</span> Developer</h2>
                </section>

                {/* Skills Section */}
                <section className="icons">
                    <a href="https://en.wikipedia.org/wiki/HTML" target="_blank" rel="noopener noreferrer" className="icon" aria-label="Learn more about HTML on Wikipedia">
                        <i className="fa-brands fa-html5"></i>
                        <p>HTML</p>
                    </a>
                    <a href="https://en.wikipedia.org/wiki/CSS" target="_blank" rel="noopener noreferrer" className="icon" aria-label="Learn more about CSS on Wikipedia">
                        <i className="fa-brands fa-css3-alt"></i>
                        <p>CSS</p>
                    </a>
                    <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" rel="noopener noreferrer" className="icon" aria-label="Learn more about JavaScript on Wikipedia">
                        <i className="fa-brands fa-js-square"></i>
                        <p>JavaScript</p>
                    </a>
                </section>
            </main>

            {/* Footer */}
            <footer>
                <div>
                    <p>© 2023 Louis Peter</p> <a href="./impressum.html">Impressum</a>
                </div>
                <div>
                    <a href="https://github.com/louisclarencepeter" target="_blank" rel="noopener noreferrer" aria-label="Visit Louis Peter's GitHub profile">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/louisclarencepeter/" target="_blank" rel="noopener noreferrer" aria-label="Visit Louis Peter's LinkedIn profile">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Home;
