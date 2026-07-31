import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../data/logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    // Add auth logic or redirect to home for now
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #1c0303 0%, #0a0a0a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating logo decorative backgrounds */}
      <img
        src={logo}
        alt=""
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '12rem',
          height: 'auto',
          opacity: 0.05,
          userSelect: 'none',
          pointerEvents: 'none',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <img
        src={logo}
        alt=""
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '14rem',
          height: 'auto',
          opacity: 0.05,
          userSelect: 'none',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      {/* Main glassmorphism card */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(20, 20, 20, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(192, 57, 43, 0.35)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 0, 0, 0.15)',
          zIndex: 1,
          animation: 'fadeInUp 0.8s ease',
          position: 'relative',
        }}
      >
        {/* Crimson top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8b0000, #c0392b, #ff4444)',
            borderRadius: '16px 16px 0 0',
          }}
        />

        {/* Back Link */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.5)',
            textDecoration: 'none',
            fontSize: '0.8rem',
            marginBottom: '1.5rem',
            transition: 'color 0.3s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#ff6b6b')}
          onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.5)')}
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-rocker)',
              fontSize: '2.2rem',
              color: '#fff',
              marginBottom: '0.5rem',
              textShadow: '0 0 20px rgba(192, 57, 43, 0.5)',
              letterSpacing: '0.05em',
            }}
          >
            SIGN IN
          </h2>
          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.85rem',
              color: '#888',
            }}
          >
            Access the secure Akatsuki Intelligence network.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              htmlFor="email"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: '#aaa',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="itachi@akatsuki.org"
              style={{
                width: '100%',
                background: '#141414',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#c0392b';
                e.target.style.boxShadow = '0 0 8px rgba(192, 57, 43, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              htmlFor="password"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: '#aaa',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                background: '#141414',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.3s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#c0392b';
                e.target.style.boxShadow = '0 0 8px rgba(192, 57, 43, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            style={{
              marginTop: '0.75rem',
              width: '100%',
              background: 'linear-gradient(135deg, #8b0000, #c0392b)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.85rem',
              fontFamily: 'var(--font-rocker)',
              fontSize: '1rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(192, 57, 43, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #c0392b, #ff4444)';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 16px rgba(192, 57, 43, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #8b0000, #c0392b)';
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '0 4px 12px rgba(192, 57, 43, 0.3)';
            }}
          >
            ENTER THE NET
          </button>
        </form>

        {/* Link to Signup */}
        <div
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#777',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Not registered yet?{' '}
          <Link
            to="/signup"
            style={{
              color: '#ff6b6b',
              textDecoration: 'none',
              fontWeight: '600',
              marginLeft: '0.25rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ff4444')}
            onMouseLeave={(e) => (e.target.style.color = '#ff6b6b')}
          >
            Join the Clan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
