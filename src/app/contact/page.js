'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="header">
      <div className="navbar">
        <Link href="/" className="logo">MocqAI.</Link>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/course">Course</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="account">
          <Link href="/account"><i className="fas fa-user-circle"></i></Link>
        </div>
      </div>

      <div className="contact-section">
        <div className="content">
          <h1>Contact Us 📩</h1>
          <p>Have questions, feedback, or suggestions? We’d love to hear from you. Reach out to us anytime and our team will respond shortly.</p>

          <div className="contact-container">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-block">
                <h3><i className="fas fa-envelope"></i> Email</h3>
                <p>support@mocqai.com</p>
              </div>

              <div className="info-block">
                <h3><i className="fas fa-phone"></i> Phone</h3>
                <p>+91 7575880714</p>
              </div>

              <div className="info-block">
                <h3><i className="fas fa-map-marker-alt"></i> Address</h3>
                <p>Ahmedabad, Gujarat, India</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <form>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
                <button type="submit" className="btnn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
