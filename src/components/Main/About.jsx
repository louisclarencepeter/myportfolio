import React from 'react'

function About() {
  return (
    <>
      {/* Main Content */}
  <main>
    {/* My Picture and Small Info */}
    <section>
      <div className="info bounce-top one">
        <img src="./images/IMG_8327.JPG" alt="my picture" />
        <h2>Louis Peter</h2>
        <p>
          Living in Frankfrurt am Main with passion of Technolgy and Web
          Development
        </p>
        <a href="https://github.com/louisclarencepeter" target="_blank">
          <i className="fa-brands fa-github" />
        </a>
        <a
          href="https://www.linkedin.com/in/louisclarencepeter/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin" />
        </a>
      </div>
    </section>
    {/* School*/}
    <section>
      <div className="info bounce-top two">
        <img
          src="./images/DCI_COLORS_June24_logo_wordmark_blue.svg"
          alt="my school"
        />
        <h2>Education</h2>
        <p>2022 - Present</p>
        <p>Full Stack Web Development</p>
        <p>Digital Career Institute</p>
      </div>
    </section>
    {/* My Progress */}
    <section>
      <div className="info bounce-top three">
        <img src="./images/image01.jpg" alt="my Progress" />
        <h2>My Skills</h2>
        <p>HTML</p>
        <p>CSS</p>
        <p>JavaScript</p>
        <p>Bootstrap</p>
        <p>Git</p>
        <p>React</p>
        <p>Node.js</p>
      </div>
    </section>
  </main>
    </>
  )
}

export default About