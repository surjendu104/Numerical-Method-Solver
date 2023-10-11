import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmit = ()=> {
    const subject = "Feedback";
    const receipientEmail = "palsurjendu1@gmail.com"
    const mainToUrl = `mailto:${receipientEmail}?subject=${encodeURIComponent(subject + " " + email)}&body=${encodeURIComponent("Name : "+name+"\n"+message)}`
    window.location.href = mainToUrl;
  };

  return (
    <div className="contact-container">
      <div className="contact-container-child">
        <div className="contact-container-info">
          <p>Name</p>
          <input className='contact-input' type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="contact-container-info">
          <p>Email</p>
          <input className='contact-input' type="email" placeholder="johndoe@email.com" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="contact-container-info">
          <p>Message</p>
          <textarea className='contact-input' id="message-input" type="text" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="submit-button">
            <button type="submit" className="outer-buttons" id="submit-button" onClick={handelSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
