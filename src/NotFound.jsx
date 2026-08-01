import { Link } from 'react-router-dom';
import pain from './assets/images/akatsuki_members/pain.png';
import logo from './data/logo';

const NotFound = () => {
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
      {/* Decorative background logo */}
      <img
        src={logo}
        alt=""
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '12rem',
          height: 'auto',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      <img
        src={logo}
        alt=""
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '15rem',
          height: 'auto',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          background: 'rgba(20, 20, 20, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(192, 57, 43, 0.35)',
          borderRadius: '20px',
          padding: '3.5rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          zIndex: 1,
          animation: 'fadeInUp 0.8s ease',
        }}
      >
        {/* Overlapping Red Circle with character standing inside it */}
        <div
          style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: '#ff2d2d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 36px rgba(255, 45, 45, 0.4), 0 0 25px rgba(192, 57, 43, 0.2)',
            marginBottom: '1rem',
            overflow: 'visible',
          }}
        >
          <img
            src={pain}
            alt="Pain"
            style={{
              height: '240px',
              width: 'auto',
              objectFit: 'contain',
              zIndex: 12,
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
              animation: 'float404 4s ease-in-out infinite',
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-rocker)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#fff',
            textShadow: '0 0 20px rgba(192, 57, 43, 0.6)',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '0.05em',
          }}
        >
          404 <span style={{ color: '#ff4444' }}>NOT FOUND</span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-rocker)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            color: '#ff6b6b',
            letterSpacing: '0.08em',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          "This page shall know Pain."
        </p>

        <p
          style={{
            fontFamily: 'system-ui, sans-serif',
            color: '#b0b0b0',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          Almighty Push! The intelligence record or route path you have navigated to does not exist or has been pushed out of our network database.
        </p>

        <Link
          to="/"
          style={{
            marginTop: '1rem',
            background: 'linear-gradient(135deg, #8b0000, #c0392b)',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'var(--font-rocker)',
            fontSize: '0.95rem',
            letterSpacing: '0.1em',
            padding: '0.75rem 2rem',
            borderRadius: '50px',
            border: '1px solid rgba(192, 57, 43, 0.6)',
            boxShadow: '0 4px 15px rgba(192, 57, 43, 0.4)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #c0392b, #ff4444)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(192, 57, 43, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #8b0000, #c0392b)';
            e.target.style.transform = 'none';
            e.target.style.boxShadow = '0 4px 15px rgba(192, 57, 43, 0.4)';
          }}
        >
          RETURN TO SAFETY
        </Link>
      </div>

      <style>{`
        @keyframes float404 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
