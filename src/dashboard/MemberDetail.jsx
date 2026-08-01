import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import akatsukiMembers from '../data/akatsukiMembers';
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

const StarRating = ({ rating, onChange, interactive = false }) => {
  return (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => interactive && onChange && onChange(star)}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            color: star <= rating ? '#f1c40f' : '#444444',
            fontSize: interactive ? '1.4rem' : '1.1rem',
            transition: 'color 0.2s',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const SkeletonNewsBlock = () => (
  <div
    style={{
      background: 'rgba(25, 20, 20, 0.75)',
      border: '1px solid rgba(192, 57, 43, 0.15)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem',
      animation: 'pulse 1.5s infinite ease-in-out',
    }}
  >
    <div style={{ width: '80%', height: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', marginBottom: '1.5rem' }} />
    <div style={{ width: '90%', height: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '4px', marginBottom: '0.75rem' }} />
    <div style={{ width: '40%', height: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '4px' }} />
  </div>
);

const MemberDetail = () => {
  const { memberName } = useParams();
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const loggedInUser = localStorage.getItem('username');

  const [isMobile, setIsMobile] = useState(false);
  const [news, setNews] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Add review form state per headline
  const [newReviewText, setNewReviewText] = useState({});
  const [newRating, setNewRating] = useState({});
  const [submittingHeadline, setSubmittingHeadline] = useState(null);

  // Edit review state
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [savingReviewId, setSavingReviewId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const searchKey = normalizeName(memberName || '');
  const matchedRealInfo = akatsukiMembers.find((member) =>
    normalizeName(member.name).includes(searchKey)
  );
  const displayName = matchedRealInfo?.name || (memberName ? memberName.charAt(0).toUpperCase() + memberName.slice(1) : '');

  // Responsive dimensions matching Dashboard card (scaled to 3x)
  const circleSize = isMobile ? 160 : 390;
  const paddingLeft = isMobile ? 130 : 320;
  const bodyHeight = isMobile ? 90 : 150;
  const bodyMarginLeft = isMobile ? 40 : 100;
  const nameFontSize = isMobile ? '1.5rem' : '3rem';
  const imgHeight = isMobile ? 150 : 370;

  const baseUrl = import.meta.env.BACKEND_URL || 'localhost:8000/';
  const formattedBaseUrl = baseUrl.startsWith('http') ? baseUrl : `http://${baseUrl}`;
  const finalUrl = formattedBaseUrl.endsWith('/') ? formattedBaseUrl : `${formattedBaseUrl}/`;

  // Fetch News and Reviews
  useEffect(() => {
    if (!token) {
      toast.error('Access denied. Please sign in.');
      navigate('/login');
      return;
    }

    const fetchNews = async () => {
      setNewsLoading(true);
      if (searchKey === 'pain') {
        // Pain does not collect news
        setNews({
          headlines: [],
          message: 'Pain does not collect news. All eyes are on the Shinra Tensei.'
        });
        setNewsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${finalUrl}api/dashboard/news`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ akatsukiMemberName: searchKey }),
        });

        if (response.status === 401) {
          toast.error('Session expired. Please sign in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch news headlines');
        }

        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error('News fetch error:', err);
        toast.error('Failed to load operative news.');
      } finally {
        setNewsLoading(false);
      }
    };

    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const response = await fetch(`${finalUrl}api/dashboard/reviews`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        }
      } catch (err) {
        console.error('Reviews fetch error:', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchNews();
    fetchReviews();
  }, [searchKey, token, navigate, finalUrl]);

  // Create Review
  const handleAddReview = async (headline) => {
    const text = newReviewText[headline] || '';
    const rating = newRating[headline] || 5;

    if (!text.trim()) {
      toast.error('Review text is required.');
      return;
    }

    setSubmittingHeadline(headline);

    try {
      const response = await fetch(`${finalUrl}api/dashboard/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          akatsukiMemberName: searchKey,
          newsHeadline: headline,
          reviewText: text,
          rating: rating,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Intel report logged.');
        setReviews((prev) => [data, ...prev]);
        setNewReviewText((prev) => ({ ...prev, [headline]: '' }));
        setNewRating((prev) => ({ ...prev, [headline]: 5 }));
      } else {
        toast.error(data.message || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Create review error:', err);
      toast.error('Could not connect to the database.');
    } finally {
      setSubmittingHeadline(null);
    }
  };

  // Update Review
  const handleUpdateReview = async (id) => {
    if (!editText.trim()) {
      toast.error('Review text cannot be empty.');
      return;
    }

    setSavingReviewId(id);

    try {
      const response = await fetch(`${finalUrl}api/dashboard/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewText: editText,
          rating: editRating,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Intel report updated.');
        setReviews((prev) => prev.map((r) => (r.id === id ? data : r)));
        setEditingReviewId(null);
      } else {
        toast.error(data.message || 'Failed to update review.');
      }
    } catch (err) {
      console.error('Update review error:', err);
      toast.error('Could not connect to the database.');
    } finally {
      setSavingReviewId(null);
    }
  };

  // Delete Review
  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this intelligence report?')) return;

    try {
      const response = await fetch(`${finalUrl}api/dashboard/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Intel report deleted.');
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete review.');
      }
    } catch (err) {
      console.error('Delete review error:', err);
      toast.error('Could not connect to the database.');
    }
  };

  const startEdit = (review) => {
    setEditingReviewId(review.id);
    setEditText(review.reviewText);
    setEditRating(review.rating);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #1c0303 0%, #0a0a0a 100%)',
        color: '#fff',
        padding: isMobile ? '1rem' : '2rem',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Graphic */}
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
            to="/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontFamily: 'var(--font-rocker)',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ff4444')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.7)')}
          >
            ← BACK TO HQ
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

        {/* 2-Column Layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '2.5rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Sidebar: Operative Navigation */}
          <aside
            style={{
              width: isMobile ? '100%' : '240px',
              flexShrink: 0,
              background: 'rgba(20, 20, 20, 0.8)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(192, 57, 43, 0.25)',
              borderRadius: '16px',
              padding: '1.25rem',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxHeight: isMobile ? 'auto' : 'calc(100vh - 12rem)',
              overflowY: isMobile ? 'visible' : 'auto',
              position: isMobile ? 'static' : 'sticky',
              top: '6rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-rocker)',
                fontSize: '1rem',
                color: '#ff4444',
                margin: '0 0 0.5rem 0',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                borderBottom: '1px solid rgba(192, 57, 43, 0.2)',
                paddingBottom: '0.5rem',
              }}
            >
              OPERATIVES LIST
            </h3>
            
            <div
              className="operative-scroll-container"
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                gap: '0.5rem',
                width: '100%',
                overflowX: isMobile ? 'auto' : 'visible',
                paddingBottom: isMobile ? '0.5rem' : '0',
              }}
            >
              {akatsukiMembers.map((member) => {
                const memberSearchName = normalizeName(member.name);
                const isActive = searchKey === memberSearchName;
                
                return (
                  <button
                    key={member.id}
                    onClick={() => navigate(`/member/${memberSearchName}`)}
                    style={{
                      background: isActive ? 'rgba(192, 57, 43, 0.2)' : 'transparent',
                      border: isActive ? '1px solid rgba(192, 57, 43, 0.5)' : '1px solid transparent',
                      borderRadius: '8px',
                      padding: '0.65rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: isMobile ? 'auto' : '100%',
                      boxSizing: 'border-box',
                      color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: isActive ? '600' : '400',
                      transition: 'all 0.3s',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.color = '#fff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      }
                    }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '400', letterSpacing: '0.02em' }}>{member.name}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Main Content */}
          <main style={{ flex: 1, width: '100%' }}>
            
            {/* operative Header Layout (mockup card design matching) */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                minHeight: `${circleSize + 10}px`,
                boxSizing: 'border-box',
                marginBottom: '3.5rem',
              }}
            >
              {/* Overlapping Red Circle */}
              <div
                style={{
                  position: 'absolute',
                  left: '0',
                  width: `${circleSize}px`,
                  height: `${circleSize}px`,
                  borderRadius: '50%',
                  background: '#ff2d2d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(255, 45, 45, 0.3)',
                  zIndex: 10,
                  overflow: 'visible',
                }}
              >
                {matchedRealInfo?.image ? (
                  <img
                    src={matchedRealInfo.image}
                    alt={displayName}
                    style={{
                      maxHeight: `${imgHeight}px`,
                      maxWidth: '90%',
                      width: 'auto',
                      objectFit: 'contain',
                      zIndex: 12,
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
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                <h1
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
                </h1>
              </div>
            </div>

            {/* News Feed Section */}
            <section style={{ animation: 'fadeInUp 0.8s ease' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-rocker)',
                  fontSize: '1.6rem',
                  color: '#fff',
                  borderBottom: '2px solid #8b0000',
                  paddingBottom: '0.5rem',
                  marginBottom: '2rem',
                  textShadow: '0 0 10px rgba(139, 0, 0, 0.5)',
                }}
              >
                INTELLIGENCE REPORTS & NEWS
              </h2>

              {newsLoading ? (
                <div>
                  <SkeletonNewsBlock />
                  <SkeletonNewsBlock />
                </div>
              ) : (
                <div>
                  {searchKey === 'pain' ? (
                    /* Styled placeholder for Pain */
                    <div
                      style={{
                        background: 'rgba(25, 20, 20, 0.6)',
                        border: '1px solid rgba(192, 57, 43, 0.3)',
                        borderRadius: '12px',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <img
                        src={logo}
                        alt=""
                        style={{
                          width: '4rem',
                          height: 'auto',
                          opacity: 0.3,
                          marginBottom: '1rem',
                          filter: 'drop-shadow(0 0 8px rgba(192, 57, 43, 0.6))',
                        }}
                      />
                      <p
                        style={{
                          fontFamily: 'var(--font-rocker)',
                          fontSize: '1.25rem',
                          color: '#ff4444',
                          margin: '0 0 0.5rem 0',
                          letterSpacing: '0.05em',
                        }}
                      >
                        ACCESS RESTRICTED
                      </p>
                      <p style={{ color: '#aaa', fontSize: '0.95rem', margin: 0 }}>
                        {news?.message || 'Pain does not collect news. Shinra Tensei keeps report scanners off.'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      {(!news?.headlines || news.headlines.length === 0) ? (
                        <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>
                          No scraped headlines found. Scanner reports are blank.
                        </p>
                      ) : (
                        news.headlines.map((headline, index) => {
                          // Filter reviews for this headline & member
                          const headlineReviews = reviews.filter(
                            (r) =>
                              r.akatsukiMemberName.toLowerCase() === searchKey &&
                              r.newsHeadline === headline
                          );

                          return (
                            <div
                              key={index}
                              style={{
                                background: 'rgba(20, 20, 20, 0.8)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(192, 57, 43, 0.2)',
                                borderRadius: '16px',
                                padding: '2rem',
                                marginBottom: '2.5rem',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                              }}
                            >
                              {/* Headline title */}
                              <h3
                                style={{
                                  fontSize: '1.25rem',
                                  color: '#fff',
                                  margin: '0 0 1.5rem 0',
                                  lineHeight: '1.5',
                                  borderLeft: '4px solid #ff4444',
                                  paddingLeft: '0.75rem',
                                }}
                              >
                                {headline}
                              </h3>

                              {/* Existing reviews sub-list */}
                              <div style={{ marginBottom: '2rem' }}>
                                <h4
                                  style={{
                                    fontSize: '0.85rem',
                                    color: '#ff6b6b',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                    paddingBottom: '0.4rem',
                                    marginBottom: '1rem',
                                  }}
                                >
                                  Filed Intel Briefings ({headlineReviews.length})
                                </h4>

                                {reviewsLoading ? (
                                  <p style={{ color: '#666', fontSize: '0.85rem' }}>Loading briefings...</p>
                                ) : headlineReviews.length === 0 ? (
                                  <p style={{ color: '#555', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
                                    No reviews logged on this headline.
                                  </p>
                                ) : (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {headlineReviews.map((review) => {
                                      const isOwner = review.username === loggedInUser;
                                      const isEditing = editingReviewId === review.id;

                                      return (
                                        <div
                                          key={review.id}
                                          style={{
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid rgba(255, 255, 255, 0.04)',
                                            borderRadius: '8px',
                                            padding: '1rem',
                                          }}
                                        >
                                          {isEditing ? (
                                            /* Edit mode inline form */
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <span style={{ fontSize: '0.85rem', color: '#ff4444' }}>Edit Rating:</span>
                                                <StarRating rating={editRating} onChange={setEditRating} interactive />
                                              </div>
                                              <textarea
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                style={{
                                                  width: '100%',
                                                  minHeight: '60px',
                                                  background: '#141414',
                                                  color: '#fff',
                                                  border: '1px solid rgba(192, 57, 43, 0.4)',
                                                  borderRadius: '6px',
                                                  padding: '0.5rem',
                                                  fontFamily: 'inherit',
                                                  fontSize: '0.9rem',
                                                  boxSizing: 'border-box',
                                                }}
                                              />
                                              <div style={{ display: 'flex', gap: '0.5rem', alignSelf: 'flex-end' }}>
                                                <button
                                                  onClick={() => setEditingReviewId(null)}
                                                  style={{
                                                    background: 'transparent',
                                                    color: '#aaa',
                                                    border: 'none',
                                                    padding: '0.4rem 0.8rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                  }}
                                                >
                                                  Cancel
                                                </button>
                                                <button
                                                  onClick={() => handleUpdateReview(review.id)}
                                                  disabled={savingReviewId === review.id}
                                                  style={{
                                                    background: '#c0392b',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '0.4rem 1rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                  }}
                                                >
                                                  {savingReviewId === review.id ? 'Saving...' : 'Save'}
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            /* Normal display mode */
                                            <div>
                                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>
                                                  {review.username}
                                                </span>
                                                <StarRating rating={review.rating} />
                                              </div>
                                              <p style={{ color: '#ccc', fontSize: '0.9rem', margin: '0 0 0.5rem 0', wordBreak: 'break-word', lineHeight: 1.4 }}>
                                                {review.reviewText}
                                              </p>

                                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.72rem', color: '#666' }}>
                                                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                                                </span>
                                                
                                                {isOwner && (
                                                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                    <button
                                                      onClick={() => startEdit(review)}
                                                      style={{
                                                        background: 'transparent',
                                                        color: '#ff6b6b',
                                                        border: 'none',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer',
                                                        padding: 0,
                                                      }}
                                                    >
                                                      Edit
                                                    </button>
                                                    <button
                                                      onClick={() => handleDeleteReview(review.id)}
                                                      style={{
                                                        background: 'transparent',
                                                        color: '#777',
                                                        border: 'none',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer',
                                                        padding: 0,
                                                      }}
                                                    >
                                                      Delete
                                                    </button>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* Write new review form */}
                              <div
                                style={{
                                  background: 'rgba(255, 255, 255, 0.01)',
                                  border: '1px solid rgba(192, 57, 43, 0.12)',
                                  borderRadius: '12px',
                                  padding: '1.25rem',
                                }}
                              >
                                <h4
                                  style={{
                                    fontSize: '0.85rem',
                                    color: '#fff',
                                    margin: '0 0 1rem 0',
                                    letterSpacing: '0.05em',
                                  }}
                                >
                                  Log Intelligence Report
                                </h4>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Threat Rating:</span>
                                  <StarRating
                                    rating={newRating[headline] || 5}
                                    onChange={(val) => setNewRating((prev) => ({ ...prev, [headline]: val }))}
                                    interactive
                                  />
                                </div>

                                <textarea
                                  placeholder="Input operatives actions or news updates analysis..."
                                  value={newReviewText[headline] || ''}
                                  onChange={(e) =>
                                    setNewReviewText((prev) => ({ ...prev, [headline]: e.target.value }))
                                  }
                                  style={{
                                    width: '100%',
                                    minHeight: '80px',
                                    background: '#121212',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    padding: '0.75rem',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem',
                                    resize: 'vertical',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border-color 0.3s',
                                  }}
                                  onFocus={(e) => (e.target.style.borderColor = 'rgba(192, 57, 43, 0.6)')}
                                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)')}
                                />

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                                  <button
                                    onClick={() => handleAddReview(headline)}
                                    disabled={submittingHeadline === headline}
                                    style={{
                                      background: 'linear-gradient(135deg, #8b0000, #c0392b)',
                                      color: '#fff',
                                      border: 'none',
                                      borderRadius: '6px',
                                      padding: '0.5rem 1.25rem',
                                      fontFamily: 'var(--font-rocker)',
                                      fontSize: '0.8rem',
                                      letterSpacing: '0.05em',
                                      cursor: submittingHeadline === headline ? 'not-allowed' : 'pointer',
                                      boxShadow: '0 4px 10px rgba(192, 57, 43, 0.2)',
                                      transition: 'all 0.3s',
                                    }}
                                    onMouseEnter={(e) => {
                                      if (submittingHeadline !== headline) {
                                        e.target.style.background = 'linear-gradient(135deg, #c0392b, #ff4444)';
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (submittingHeadline !== headline) {
                                        e.target.style.background = 'linear-gradient(135deg, #8b0000, #c0392b)';
                                      }
                                    }}
                                  >
                                    {submittingHeadline === headline ? 'LOGGING...' : 'SUBMIT BRIEFING'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
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
        .operative-scroll-container::-webkit-scrollbar {
          height: 6px;
        }
        .operative-scroll-container::-webkit-scrollbar-thumb {
          background-color: rgba(192, 57, 43, 0.4);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default MemberDetail;
