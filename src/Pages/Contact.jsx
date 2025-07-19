import React, { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section with contact.png */}
      <div className="w-full h-full items-center justify-center overflow-hidden bg-white">
        <img
          src="/contact.png"
          alt="Contact Hero"
          className="w-full h-98 object-cover object-center "
        />
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 lg:p-12 border border-primary-100">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-DEFAULT mb-2 md:mb-3">Get In Touch</h2>
            <p className="text-gray-600 text-base md:text-lg mb-6">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-primary-50 text-primary-DEFAULT border border-primary-200 text-center flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Thank you! We'll get back to you soon.</span>
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent outline-none text-base bg-white text-gray-900 placeholder-gray-400 transition-all hover:border-primary-200"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent outline-none text-base bg-white text-gray-900 placeholder-gray-400 transition-all hover:border-primary-200"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent outline-none text-base bg-white text-gray-900 placeholder-gray-400 resize-none transition-all hover:border-primary-200"
              />
              <button
                type="submit"
                className="w-full bg-primary-DEFAULT text-white font-bold py-3 rounded-xl hover:bg-secondary-black transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] border-2 border-primary-DEFAULT hover:border-secondary-black"
              >
                Send Message
              </button>
            </form>
            {/* Contact Info Cards */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-xl p-4 border border-primary-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-DEFAULT rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-DEFAULT">Email</p>
                  <p className="text-xs text-gray-600 break-all">contact.hydroplusinternational@gmail.com</p>
                </div>
              </div>
              <div className="bg-primary-50 rounded-xl p-4 border border-primary-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-DEFAULT rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-DEFAULT">Phone</p>
                  <p className="text-xs text-gray-600">+91 8000074088</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 border border-primary-100">
                <DotLottieReact
                  src="https://lottie.host/528327d7-b622-4b6e-ba9a-61630d945b81/jeZOmcehp2.lottie"
                  loop
                  autoplay
                  style={{ width: '100%', height: '320px' }}
                />
                <div className="text-center mt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-DEFAULT mb-1">Ready to Connect?</h3>
                  <p className="text-gray-600 text-sm md:text-base">Fill out the form and we'll get back to you within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-10 md:mt-16 bg-white rounded-3xl shadow-2xl p-4 sm:p-8 lg:p-12 border border-primary-100">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-DEFAULT mb-2 md:mb-3">Visit Our Office</h3>
            <p className="text-gray-600 text-base md:text-lg">Come say hello at our office headquarters</p>
          </div>
          <div className="flex items-center justify-center gap-3 md:gap-4 max-w-2xl mx-auto">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-DEFAULT rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-base md:text-lg font-semibold text-primary-DEFAULT">Our Address</p>
              <p className="text-gray-600 text-sm md:text-base">Pasodara Rd, near Pasodara, Kholvad, Surat, Gujarat, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;