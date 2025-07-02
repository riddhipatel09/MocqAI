'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css'; // this is fine if you're using global styles

export default function CoursePage() {
  const router = useRouter();

  const handleStart = (type) => {
    router.push(`/interview?type=${type}`);
  };

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
          <a href="/login"><i className="fas fa-user-circle"></i></a>
        </div>
      </div>

      <div className="course-section">
        <div className="content">
          <h1>Explore Our Mock Interview Tracks 🎯</h1>
          <p>Practice interviews tailored for your role, domain, and experience level. Choose your course and improve your performance with real-time feedback.</p>

          <div className="course-cards">
            <div className="course-card" onClick={() => handleStart('technical')}>
              <i className="fa-solid fa-laptop-code"></i>
              <h3>Technical Interviews</h3>
              <p>Prepare for software development, data structures, algorithms, and system design interviews.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('hr')}>
              <i className="fa-solid fa-briefcase"></i>
              <h3>HR & Behavioral</h3>
              <p>Master communication and soft skills through mock HR and behavioral interview simulations.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('campus')}>
              <i className="fa-solid fa-user-graduate"></i>
              <h3>Campus Placements</h3>
              <p>Get ready for aptitude rounds, group discussions, and interviews with campus-specific prep.</p>
            </div>
          </div>

          <div className="button-wrapper">
            <a href="/login" className="btn">Start Your Mock Interview</a>
          </div>
        </div>
      </div>
    </div>
  );
}
