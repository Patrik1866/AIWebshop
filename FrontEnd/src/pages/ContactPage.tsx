import "../styles/ContactPage.css"

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h1>Vedd fel velünk a kapcsolatot</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Név:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Üzenet:</label>
          <textarea id="message" name="message" />
        </div>
        <button type="submit">Üzenet küldése <i className="fa fa-paper-plane"></i></button>
      </form>
      <div className="contact-info">
        <h2>Információk</h2>
        <p>Cím: 3300 Eger, Magyarország</p>
        <p>Telefon: 555-555-5555</p>
        <p>Email: [info@example.com](mailto:info@example.com)</p>
      </div>
    </div>
  )
}

export default ContactPage;