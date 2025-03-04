import { useState } from "react";
import "../styles/ContactPage.css"
import authService from "../util/AuthService";
import Notification from "../components/Notification";

const ContactPage = () => {
  const name = authService.getUser()?.surname + " " + authService.getUser()?.firstname;
  const email = authService.getUser()?.email;
  const [content, setContent] = useState({ from: "", subject: "", body: "" });
  const [notification, setNorification] = useState(false);

  const handleSendEmail = async () => {
    try {
      const response = await fetch("http://localhost:8080/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        credentials: 'include',
        body: JSON.stringify({
          from: email,
          to: "ttesztdoga@gmail.com",  
          subject: content.subject!,
          body: content.body!
        })
      });
      if (response.ok){
        setNorification(true);
        setContent({ from: "", subject: "", body: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSubjectChange = (event:any) => {
    setContent({ ...content, subject: event.target.value });
  };
  
  const handleBodyChange = (event: any) => {
    setContent({ ...content, body: event.target.value });
  };

  return (
    <div className="contact-container">
      <h1>Vedd fel velünk a kapcsolatot</h1>
      <section>
        <div className="form-group">
          <label htmlFor="name">Név:</label>
          <input type="text" id="name" name="name" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Tárgy:</label>
          <input type="text" id="subject" value={content.subject} onChange={handleSubjectChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="body">Üzenet:</label>
          <textarea id="body" name="body" value={content.body} onChange={handleBodyChange}/>
        </div>
        <button onClick={handleSendEmail}>Üzenet küldése <i className="fa fa-paper-plane"></i></button>
      </section>
      <div className="contact-info">
        <h2>Információk</h2>
        <p>Cím: 3300 Eger, Magyarország</p>
        <p>Telefon: 555-555-5555</p>
        <p>Email: ttesztdoga@gmail.com</p>
      </div>

      {notification && <Notification message="Az email sikeresen el lett kuldve"/>}
    </div>
  )
}

export default ContactPage;