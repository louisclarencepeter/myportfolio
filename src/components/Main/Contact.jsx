import './Contact.scss'

function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <h2 className="titles">Drop Me a Message</h2>
        <form className='form' method="post" action="send_message.php">
          <p>Please fill in the form below to send me a message</p>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required="" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required="" />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required="" defaultValue={""} />
          <input type="submit" defaultValue="Send" className="send" />
        </form>
        <div className="socials">
          <ul>
            <li>
              <a href="https://github.com/louisclarencepeter" target="_blank">
                <i className="fa-brands fa-github" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/louisclarencepeter/" target="_blank">
                <i className="fa-brands fa-linkedin" />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>

  )
}

export default Contact