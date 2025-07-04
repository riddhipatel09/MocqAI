'use client';

import React, { useEffect, useState } from 'react';

const baseUrl = ''; 


export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          window.location.href = '/'; // Redirect if not logged in
          return;
        }

        const userData = await res.json();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user info:', err);
        window.location.href = '/';
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/';
  };

  if (loading) return <p>Loading account...</p>;

  return (
    <div className="account-page">
      <h2>👤 Account Info</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button className="btnn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
