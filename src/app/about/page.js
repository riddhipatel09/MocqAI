'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/course" className="btn">Start Practicing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
