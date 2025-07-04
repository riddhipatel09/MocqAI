'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function CoursePage() {
  const router = useRouter();

  const handleStart = (type) => {
    router.push(`/interview?type=${type}`);
  };

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
          <Link href="/login"><i className="fas fa-user-circle"></i></Link>
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
          <br />

          <h1>Choose by Topic</h1>
          <div className="course-cards">
            <div className="course-card" onClick={() => handleStart('html')}>
              <i className="fab fa-html5"></i>
              <h3>HTML</h3>
              <p>Structure web content using HTML.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('css')}>
              <i className="fab fa-css3-alt"></i>
              <h3>CSS</h3>
              <p>Style your web pages beautifully.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('javascript')}>
              <i className="fab fa-js"></i>
              <h3>JavaScript</h3>
              <p>Add interactivity and logic to your site.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('react')}>
              <i className="fab fa-react"></i>
              <h3>React</h3>
              <p>Build modern UI using components.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('nodejs')}>
              <i className="fab fa-node-js"></i>
              <h3>Node.js</h3>
              <p>Run JavaScript on the server.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('mongodb')}>
              <i className="fas fa-database"></i>
              <h3>MongoDB</h3>
              <p>Store data using NoSQL collections.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('sql')}>
              <i className="fas fa-database"></i>
              <h3>SQL</h3>
              <p>Query relational databases with SQL.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('aptitude')}>
              <i className="fas fa-brain"></i>
              <h3>Aptitude</h3>
              <p>Sharpen your problem-solving and logic.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('oops')}>
              <i className="fas fa-cubes"></i>
              <h3>OOPs</h3>
              <p>Master object-oriented programming concepts.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('os')}>
              <i className="fas fa-desktop"></i>
              <h3>OS</h3>
              <p>Learn core operating system concepts.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('dbms')}>
              <i className="fas fa-server"></i>
              <h3>DBMS</h3>
              <p>Understand database systems and models.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('frontend')}>
              <i className="fas fa-paint-brush"></i>
              <h3>Frontend</h3>
              <p>Design and develop beautiful interfaces.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('backend')}>
              <i className="fas fa-cogs"></i>
              <h3>Backend</h3>
              <p>Develop server-side applications and APIs.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('fullstack')}>
              <i className="fas fa-layer-group"></i>
              <h3>Full Stack</h3>
              <p>Build complete web applications end-to-end.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('nextjs')}>
              <i className="fas fa-code-branch"></i>
              <h3>Next.js</h3>
              <p>Build modern apps with React and Next.js.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('tailwindcss')}>
              <i className="fas fa-wind"></i>
              <h3>Tailwind CSS</h3>
              <p>Style fast with utility-first CSS.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('dsa')}>
              <i className="fas fa-code"></i>
              <h3>DSA</h3>
              <p>Learn Data Structures and Algorithms.</p>
            </div>
            <div className="course-card" onClick={() => handleStart('ai')}>
              <i className="fas fa-robot"></i>
              <h3>AI</h3>
              <p>Explore Artificial Intelligence and build smart systems.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
