import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import akatsukiMembersSD from '../data/akatsukiMembersSd';
import logo from '../data/logo';

const normalizeName = (name) => {
  const n = name.toLowerCase().trim();
  if (n.includes('orichimaru') || n.includes('orochimaru')) return 'orochimaru';
  if (n.includes('itachi')) return 'itachi';
  if (n.includes('konan')) return 'konan';
  if (n.includes('obito')) return 'obito';
  if (n.includes('kakuzu')) return 'kakuzu';
  if (n.includes('sasori')) return 'sasori';
  if (n.includes('deidara')) return 'deidara';
  if (n.includes('kisame')) return 'kisame';
  if (n.includes('hidan')) return 'hidan';
  if (n.includes('zetsu')) return 'zetsu';
  if (n.includes('pain')) return 'pain';
  return n;
};

const SkeletonCard = ({ isMobile }) => {
  const circleSize = isMobile ? 110 : 150;
  const paddingLeft = isMobile ? 110 : 170;
  const bodyHeight = isMobile ? 80 : 105;
  const bodyMarginLeft = isMobile ? 25 : 40;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        minHeight: `${circleSize + 10}px`,
        boxSizing: 'border-box',
        animation: 'pulse 1.5s infinite ease-in-out',
        marginBottom: '1rem',
      }}
    >
      {/* Grey Circle representing the Red Circle */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(192, 57, 43, 0.2)',
          zIndex: 10,
        }}
      />
      
      {/* Card body skeleton */}
      <div
        style={{
          flex: 1,
          height: `${bodyHeight}px`,
          background: 'rgba(25, 20, 20, 0.75)',
          border: '1px solid rgba(192, 57, 43, 0.15)',
          borderRadius: '16px',
          marginLeft: `${bodyMarginLeft}px`,
          paddingLeft: `${paddingLeft}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '140px',
            height: '24px',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />
      </div>
    </div>
  );
};

const SkeletonHeader = () => (
  <div style={{ animation: 'pulse 1.5s infinite ease-in-out', marginBottom: '2.5rem' }}>
    <div style={{ width: '380px', height: '36px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px', marginBottom: '0.75rem' }} />
    <div style={{ width: '220px', height: '20px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px' }} />
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Access denied. Please sign in.');
      navigate('/login');
      return;
    }

    const fetchDashboard = async () => {
      const baseUrl = import.meta.env.BACKEND_URL || 'localhost:8000/';
      const formattedBaseUrl = baseUrl.startsWith('http') ? baseUrl : `http://${baseUrl}`;
      const finalUrl = formattedBaseUrl.endsWith('/') ? formattedBaseUrl : `${formattedBaseUrl}/`;

      try {
        const [dashRes, countRes] = await Promise.all([
          fetch(`${finalUrl}api/dashboard`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`${finalUrl}api/dashboard/user-count`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        if (dashRes.status === 401 || countRes.status === 401) {
          toast.error('Session expired. Please sign in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          navigate('/login');
          return;
        }

        if (!dashRes.ok) {
          throw new Error('Failed to fetch dashboard info');
        }

        const result = await dashRes.json();
        
        let userCount = 0;
        if (countRes.ok) {
          const countData = await countRes.json();
          userCount = countData.user_count;
        }
        
        setData({ ...result, userCount });
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error('Failed to load intelligence data.');
      } finally {
        // Artificially wait slightly to showcase the beautiful skeletons
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // Responsive dimensions for the mockup cards
  const circleSize = isMobile ? 110 : 150;
  const paddingLeft = isMobile ? 110 : 170;
  const bodyHeight = isMobile ? 80 : 105;
  const bodyMarginLeft = isMobile ? 25 : 40;
  const nameFontSize = isMobile ? '1.6rem' : '2.5rem';
  const imgHeight = isMobile ? 80 : 110;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #1c0303 0%, #0a0a0a 100%)',
        color: '#fff',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
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
          bottom: '-5%',
          right: '-5%',
          width: '20rem',
          height: 'auto',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Navigation / Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(192, 57, 43, 0.3)',
            paddingBottom: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
            }}
          >
            <img
              src={logo}
              alt="Akatsuki Cloud"
              style={{
                width: '2.5rem',
                height: 'auto',
                filter: 'drop-shadow(0 0 8px rgba(192, 57, 43, 0.8))',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-rocker)',
                fontSize: '1.6rem',
                background: 'linear-gradient(135deg, #c0392b, #ff4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.05em',
              }}
            >
              AKATSUKI HQ
            </span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(192, 57, 43, 0.4)',
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-rocker)',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(192, 57, 43, 0.15)';
              e.target.style.color = '#ff6b6b';
              e.target.style.borderColor = '#ff4444';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              e.target.style.borderColor = 'rgba(192, 57, 43, 0.4)';
            }}
          >
            LOG OUT
          </button>
        </header>

        {/* Content Body */}
        {loading ? (
          <div>
            <SkeletonHeader />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                width: '100%',
              }}
            >
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} isMobile={isMobile} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Welcome Banner */}
            <div style={{ marginBottom: '3rem', animation: 'fadeInUp 0.8s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h1
                    style={{
                      fontFamily: 'var(--font-rocker)',
                      fontSize: '2.5rem',
                      color: '#fff',
                      marginBottom: '0.5rem',
                      textShadow: '0 0 15px rgba(192, 57, 43, 0.5)',
                    }}
                  >
                    {data?.message || `Welcome to the HQ, ${data?.username}!`}
                  </h1>
                  <p style={{ color: '#888', fontSize: '1rem', letterSpacing: '0.05em', margin: 0 }}>
                    Secure access granted. Showing active operative statuses.
                  </p>
                </div>
                
                {data?.userCount !== undefined && (
                  <div
                    style={{
                      background: 'rgba(192, 57, 43, 0.15)',
                      border: '1px solid rgba(192, 57, 43, 0.4)',
                      borderRadius: '8px',
                      padding: '0.75rem 1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      boxShadow: '0 4px 15px rgba(192, 57, 43, 0.15)',
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: '#ff6b6b', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '600' }}>
                      Active Intel Officers
                    </span>
                    <span style={{ fontSize: '1.75rem', fontFamily: 'var(--font-rocker)', color: '#fff', marginTop: '0.25rem' }}>
                      {data.userCount}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* List of matched operatives (exactly like the mockup image) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                width: '100%',
                animation: 'fadeInUp 1s ease',
              }}
            >
              {data?.akatsuki_members?.map((memberName, i) => {
                const searchKey = normalizeName(memberName);
                // Match name in akatsukiMembersSD (case insensitive & substring match)
                const matchedInfo = akatsukiMembersSD.find((member) =>
                  member.name.toLowerCase().includes(searchKey)
                );

                const displayName = matchedInfo?.name || memberName.charAt(0).toUpperCase() + memberName.slice(1);

                return (
                  <div
                    key={i}
                    onClick={() => navigate(`/member/${searchKey}`)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      minHeight: `${circleSize + 10}px`,
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Bright Red Circle with character overlapping */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: `${circleSize}px`,
                        height: `${circleSize}px`,
                        borderRadius: '50%',
                        background: '#ff2d2d',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(255, 45, 45, 0.3)',
                        zIndex: 10,
                        overflow: 'visible',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      {/* Character image standing upright */}
                      {matchedInfo?.image ? (
                        <img
                          src={matchedInfo.image}
                          alt={displayName}
                          style={{
                            height: `${imgHeight}px`,
                            width: 'auto',
                            objectFit: 'contain',
                            zIndex: 12,
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      ) : (
                        <img
                          src={logo}
                          alt="Fallback"
                          style={{
                            height: `${imgHeight - 20}px`,
                            width: 'auto',
                            opacity: 0.6,
                            filter: 'brightness(0)',
                            zIndex: 12,
                          }}
                        />
                      )}
                    </div>

                    {/* White Card Body */}
                    <div
                      style={{
                        flex: 1,
                        height: `${bodyHeight}px`,
                        background: '#ffffff',
                        borderRadius: '16px',
                        marginLeft: `${bodyMarginLeft}px`,
                        paddingLeft: `${paddingLeft}px`,
                        paddingRight: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', // centers name text in remaining space
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 12px 36px rgba(139, 0, 0, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        // Elevate the avatar slightly
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const circle = parent.querySelector('div:first-child');
                          if (circle) circle.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                        e.currentTarget.style.transform = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const circle = parent.querySelector('div:first-child');
                          if (circle) circle.style.transform = 'none';
                        }
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-rocker)',
                          fontSize: nameFontSize,
                          color: '#111111',
                          margin: 0,
                          textAlign: 'center',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {displayName}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.65; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
