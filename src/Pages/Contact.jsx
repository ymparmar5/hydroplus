import React from "react";
import "../Style/Contact.css";

const Contact = () => {
  return (
    <>
      {/* <img src="./contact.jpg" alt=" contact jpg " /> */}
      <div id="main">
        <div id="contact-info">
          {/* <img src="/contact.jpeg" /> */}
          <a href="tel:9316755501">
            <b  >Phone:</b> &nbsp; +91 8000074088 <br /><br />
          </a>
          <a href="mailto:contact.hydroplusinternational@gmail.com">
            <b>Email:</b> &nbsp; 	contact.hydroplusinternational@gmail.com <br /><br />
          </a>
          <a href="https://maps.app.goo.gl/W6GD7AsVySMLcJbK9">
            <b>Address:</b> &nbsp; Pasodara Rd,<br />

          </a>
          <a href="https://maps.app.goo.gl/W6GD7AsVySMLcJbK9">
            opposite Brahamahans Plaza,
          </a>
           <a href="https://maps.app.goo.gl/W6GD7AsVySMLcJbK9">
            near Pasodara, Kholvad,
          </a>

          <a href="https://maps.app.goo.gl/W6GD7AsVySMLcJbK9">Surat, 394185, Gujarat, India</a>

          {/* <div id="contact-icons">
            <a href="https://www.t.me/AardipJogani " target="_blank" > <img src="./telegram.png" className="contact-icons"></img></a>
            <a href="mailto:laxmoindustries@gmail.com" target="_blank" > <img src="./email.png" className="contact-icons"  ></img></a>
            <a href="https://www.instagram.com/laxmo_technology/" target="_blank" > <img src="./instagram.png" className="contact-icons "></img></a>
            <a href="https://maps.app.goo.gl/W6GD7AsVySMLcJbK9" target="_blank" > <img src="./map.png" className="contact-icons  "></img></a>
            <a href="https://www.facebook.com/people/Laxmo-Pump/pfbid02vTXqfRy7wGahrG7BFBnA2oP9mh13WPT8Evduj5SycwExH1HkotKJMwYGSKrnnHAZl/" target="_blank" > <img src="./facebook.png" className="contact-icons "></img> </a>
            <a href="https://www.linkedin.com/in/laxmo-pumps-water-pump-791492205/" target="_blank" > <img src="./linkedin.png" className="contact-icons "></img> </a>
            <a href="https://wa.me/919316755501" target="_blank" > <img src="./whatsapp.png" className="contact-icons "></img> </a>
            <a href="https://www.youtube.com/@hydroplusinternational9657" target="_blank" > <img src="./youtube.png" className="contact-icons "></img> </a>
          </div> */}

        </div>
        {/* <div id="get-in-touch">
          <h3 className="title">Get In Touch</h3>
          <div id="form">
            <form action="/" method="POST" > 
              <div className="input">
                <label htmlFor="Fullname">Full Name</label>
                <input type="text" name="fullname" id="Fullname" />
              </div>
              <div className="input">
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" id="Email" />
              </div>
              <div className="input">
                <label htmlFor="number">Number</label>
                <input type="phone" name="number" id="Number" />
              </div>
              <div className="input">
                <label htmlFor="message">Your Message</label>
                <input type="text" name="message" id="message" />
              </div>
              <button id="submit-btn" type="submit">Submit</button>
            </form>
          </div>
        </div> */}
      </div>
      <div id="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.096654626436!2d72.9467617!3d21.2676413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be047df044a45d1%3A0xcabc91354e1cb1c3!2sHydroplus%20International!5e0!3m2!1sen!2sin!4v1750699615235!5m2!1sen!2sin" allowfullscreen="" id="map-iframe" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  );
};

export default Contact;

