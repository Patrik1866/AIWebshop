import { useState } from "react";
import authService from "../util/AuthService";
import Notification from "../components/Notification";
import emailsending from "../assets/email.svg";

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
      if (response.ok) {
        setNorification(true);
        setContent({ from: "", subject: "", body: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubjectChange = (event: any) => {
    setContent({ ...content, subject: event.target.value });
  };

  const handleBodyChange = (event: any) => {
    setContent({ ...content, body: event.target.value });
  };

  return (<>
    <div className="max-w-5xl flex flex-row items-center justify-center  p-6 rounded-lg  mx-auto">
      <div className="flex flex-col p-3 w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-main-green-title">Vedd fel velünk a kapcsolatot</h1>

        <section className="mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-main-green-title mb-1">Név:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              disabled
              className="w-full px-3 py-2 border border-main-green-title rounded-lg shadow-lg text-main-green"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-main-green-title mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border border-main-green-title rounded-lg shadow-lg text-main-green"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-main-green-title mb-1">Tárgy:</label>
            <input
              type="text"
              id="subject"
              value={content.subject}
              onChange={handleSubjectChange}
              className="w-full px-3 py-2 border border-main-green-title focus:outline-none focus:scale-102 transition duration-300 rounded-lg shadow-lg text-main-green"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="body" className="block text-sm font-medium text-main-green-title mb-1">Üzenet:</label>
            <textarea
              id="body"
              name="body"
              value={content.body}
              onChange={handleBodyChange}
              className="w-full px-3 py-2 border border-main-green-title rounded-lg h-32 resize-none focus:outline-none text-main-green focus:scale-102 transition duration-300 shadow-lg"
            />
          </div>

          <button
            onClick={handleSendEmail}
            className="w-full bg-main-brown hover:bg-main-brown-hover text-main-green-title font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
          >
            Üzenet küldése <i className="fa fa-paper-plane ml-2"></i>
          </button>
        </section>


      </div>
      <div>
        <img src={emailsending} className="max-w-full h-auto m-auto mt-28 fill-current text-main-green-title" />
      </div>

      {notification && (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
          <Notification message="Az email sikeresen el lett kuldve" />
        </div>
      )}
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-5xl mx-auto hover:shadow-2xl hover:scale-101 transition duration-300">
      <h1 className="text-2xl font-bold mb-6 text-main-green-title">Információk</h1>
      <p className="text-main-green mb-2">Cím: 3300 Eger, Magyarország</p>
      <p className="text-main-green mb-2">Telefon: 555-555-5555</p>
      <p className="text-main-green">Email: ttesztdoga@gmail.com</p>
    </div>
  </>
  )
}

export default ContactPage;