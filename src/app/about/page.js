'use client';

import React from 'react';


export default function AboutPage() {
  return (
    <div className="header">
      <div className="navbar">
        <a href="/" className="logo">MocqAI.</a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/course">Course</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="account">
          <a href="/account"><i className="fas fa-user-circle"></i></a>
        </div>
      </div>

      <div className="about-section">
        <div className="content">
          <h1>About MocqAI <i className="fa-solid fa-robot"></i></h1>
          <p><strong>MocqAI</strong> is an AI-powered mock interview platform designed to help students and professionals prepare for real interviews with confidence. Through intelligent simulations, domain-specific questions, and real-time feedback, MocqAI enables users to improve their communication skills, technical answers, and interview strategy — all from the comfort of their own space.</p>
          
          <h2>Our Vision</h2>
          <p>To revolutionize interview preparation through artificial intelligence, making it accessible, personalized, and effective for everyone, everywhere.</p>

          <h2>Our Mission</h2>
          <ul>
            <li>To provide intelligent and realistic interview experiences through AI.</li>
            <li>To help learners globally gain confidence in facing real-world interviews.</li>
            <li>To constantly evolve based on feedback and industry trends.</li>
          </ul>

          <h2>Our Core Values</h2>
          <ul>
            <li>Innovation: We believe in using technology to solve real-world challenges.</li>
            <li>Empowerment: Helping individuals become job-ready and confident.</li>
            <li>Accuracy: Delivering precise, domain-focused mock interviews.</li>
            <li>Feedback-Driven Growth: Improving through actionable insights.</li>
          </ul>

          <h2>Why MocqAI?</h2>
          <p>
            Traditional interview prep can be intimidating or costly. MocqAI bridges the gap with an always-available, AI-driven solution that mimics real interviewer behavior. Whether you're preparing for a tech job, HR interview, or aptitude round — MocqAI has you covered.
          </p>

          <div className="button-wrapper">
            <a href="/course" className="btn">Start Practicing</a>
          </div>
        </div>
      </div>
    </div>
  );
}
