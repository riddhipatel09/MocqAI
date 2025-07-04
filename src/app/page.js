'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const baseUrl = '';


export default function Home() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('green');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const url = `${baseUrl}/api/auth/${isSignup ? 'signup' : 'login'}`;
    const payload = isSignup
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`${isSignup ? 'Signup' : 'Login'} successful!`);
        setColor('green');
        router.push('/course');
      } else {
        setMessage(data.message || 'Something went wrong.');
        setColor('red');
      }
    } catch (error) {
      setMessage('Server error.');
      setColor('red');
      console.error('❌ Fetch error:', error);
    }
  };

  return (
    <div className="header">
      <div className="navbar">
        <Link href="/" className="logo">MocqAI.</Link>
        <ul>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/course">Course</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="account">
          <Link href="/account" title="Account"><i className="uil uil-user-circle"></i></Link>
        </div>
      </div>

      <div className="home">
        <div className="content">
          <h1>MocqAI <i className="fa-solid fa-robot"></i></h1>
          <h3>AI Interview Mocker.</h3>
          <p>An intelligent mock interview platform designed to help you prepare, practice, and perform confidently in real interviews.</p>
          <Link href="/about" className="btn">Explore More</Link>
        </div>

        <div className="form">
          <h2>{isSignup ? 'Sign Up' : 'Login'} Here</h2>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="btnn" onClick={handleSubmit}>
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <p className="link">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <br />
            <span
              onClick={() => setIsSignup(!isSignup)}
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setIsSignup(!isSignup)}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </span>
          </p>

          <p style={{ color }}>{message}</p>

          <p className="liw">Login with</p>
          <div className="icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-google"></i></a>
            <a href="#"><i className="fab fa-skype"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}
