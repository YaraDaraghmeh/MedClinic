import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { APIProvider, Map, MapCameraChangedEvent, Marker } from '@vis.gl/react-google-maps';
import { toast, ToastContainer } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css'; // Importing styles for toast notifications

import "./ContactPage.css";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.sendForm('service_5dwt2qf', 'template_xw07sq7', e.target as HTMLFormElement, 'ZDTmZBqFVNIof8wRQ')
      .then(() => {
        // Clear the form upon successful email submission
        setForm({ name: "", email: "", message: "" });

        // Show success toast
        toast.success("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error); // Log the error
        toast.error(`Failed to send email. Error: ${error.text || 'Unknown error'}`);
      });
  };

  return (
    <section className="contact-section">
      <h2 className="!text-white">Contact Us</h2>
      <p>Feel free to reach out to us for any inquiries.</p>

      {/* Flex Container for Map and Contact Info */}
      <div className="contact-flex">
        {/* Left Side: Map and Location Info */}
        <div className="map-container">
          <APIProvider apiKey="AIzaSyAT3B7FcIlpSK1eRnoi40CcxBLliTXz6rA" onLoad={() => console.log('Maps API has loaded.')}>
            <Map
              style={{ borderRadius: "20px", height: "100%", width: "100%" }}
              defaultZoom={13}
              defaultCenter={{ lat: 31.9022, lng: 35.2075 }} // Ramallah coordinates
              disableDefaultUI={true} // Disable default UI elements
              draggable={false} // Disable dragging
              zoomControl={false} // Disable zoom control
              scrollwheel={false} // Disable zooming by scroll wheel
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              }
            >
              {/* Add marker on Ramallah */}
              <Marker position={{ lat: 31.9022, lng: 35.2075 }} />
            </Map>
          </APIProvider>
        </div>

        {/* Right Side: Location Info and Contact Form */}
        <div className="contact-info-form">
          {/* Location Info */}
          <div className="contact-info">
            <p><strong>Email:</strong> MediCare@gmail.com</p>
            <p><strong>Phone:</strong> +970 59-XXXXXXX</p>
            <p><strong>Address:</strong> Ramallah, Palestine</p>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </section>
  );
};

export default ContactPage;
