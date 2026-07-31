import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import sections from '../data/sections'
import bgm from '../data/bgm'
import logo from '../data/logo'

import heroVideo from '../assets/videos/heroVideoWithAudio.mp4'

function NavDot({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        width: active ? 28 : 8,
        height: 8,
        borderRadius: 4,
        border: 'none',
        background: active
          ? 'linear-gradient(90deg,#c0392b,#ff6b6b)'
          : 'rgba(255,255,255,0.25)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: 0,
        flexShrink: 0,
      }}
    />
  )
}

function SectionCard({ section, index, visible }) {
  const isEven = index % 2 === 0
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateY(0) scale(1)'
          : `translateY(${isEven ? 50 : -50}px) scale(0.95)`,
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s, border-color 0.4s ease, box-shadow 0.4s ease`,
        background: 'linear-gradient(135deg, rgba(25, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: hovered ? '1px solid rgba(192, 57, 43, 0.8)' : '1px solid rgba(192, 57, 43, 0.25)',
        borderRadius: 20,
        padding: isMobile ? '1.5rem 1.25rem' : '2.5rem 3rem',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxShadow: hovered 
          ? '0 15px 40px rgba(139, 0, 0, 0.35), 0 0 25px rgba(192, 57, 43, 0.2)' 
          : '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Red accent top border with anim-glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: hovered 
          ? 'linear-gradient(90deg, #ff4444, #c0392b, #ff4444)' 
          : 'linear-gradient(90deg, #8b0000, #c0392b, #8b0000)',
        transition: 'background 0.4s ease',
      }} />

      {/* Logo Watermark */}
      <img
        src={logo}
        alt=""
        style={{
          position: 'absolute',
          bottom: (isMobile || isEven) ? '-1.5rem' : 'auto',
          top: (!isMobile && !isEven) ? '-1.5rem' : 'auto',
          right: (isMobile || isEven) ? '1.5rem' : 'auto',
          left: (!isMobile && !isEven) ? '1.5rem' : 'auto',
          width: isMobile ? '8rem' : '12rem',
          height: 'auto',
          opacity: hovered ? 0.08 : 0.03,
          userSelect: 'none',
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
          filter: 'drop-shadow(0 0 10px rgba(192, 57, 43, 0.4))',
        }}
      />

      {/* Main Flex Wrapper (Alternating layout) */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1.5rem' : '2.5rem',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Info Column */}
        <div style={{
          flex: isMobile ? '1 1 auto' : '1 1 450px',
          order: isMobile ? 1 : (isEven ? 1 : 2),
        }}>
          {/* Header row with pill + number */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              fontFamily: 'var(--font-rocker)',
              fontSize: isMobile ? '2rem' : '2.5rem',
              color: hovered ? '#ff4444' : '#c0392b',
              fontWeight: '700',
              lineHeight: 1,
              transition: 'color 0.3s ease',
            }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #8b0000, #c0392b)',
              borderRadius: 6,
              padding: '0.3rem 0.75rem',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(139,0,0,0.3)',
            }}>
              {section.button}
            </div>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-rocker)',
            fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
            color: '#fff',
            marginBottom: '0.75rem',
            textShadow: hovered ? '0 0 25px rgba(255,68,68,0.5)' : '0 0 15px rgba(192,57,43,0.3)',
            transition: 'text-shadow 0.3s ease',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {section.title}
          </h3>

          <p style={{
            color: '#b0b0b0',
            fontSize: isMobile ? '0.88rem' : '0.95rem',
            lineHeight: '1.6',
            fontFamily: 'system-ui, sans-serif',
            marginTop: '0.75rem',
            marginBottom: 0,
          }}>
            {section.subtitle}
          </p>
        </div>

        {/* Points Column */}
        <div style={{
          flex: isMobile ? '1 1 auto' : '1 1 400px',
          order: isMobile ? 2 : (isEven ? 3 : 1),
          background: 'rgba(5, 5, 5, 0.4)',
          border: '1px solid rgba(192, 57, 43, 0.15)',
          borderRadius: 12,
          padding: isMobile ? '1.25rem 1.5rem' : '1.75rem 2rem',
        }}>
          <h4 style={{
            fontFamily: 'var(--font-rocker)',
            color: '#ff6b6b',
            fontSize: isMobile ? '0.8rem' : '0.85rem',
            letterSpacing: '0.12em',
            marginBottom: '0.85rem',
            textTransform: 'uppercase',
          }}>
            Key Records & Intel
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {section.points.map((pt, pi) => (
              <li key={pi} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontFamily: 'system-ui, sans-serif',
                fontSize: isMobile ? '0.85rem' : '0.92rem',
                color: '#d0d0d0',
                lineHeight: '1.4',
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: hovered 
                    ? 'linear-gradient(135deg, #ff4444, #ff8888)' 
                    : 'linear-gradient(135deg, #c0392b, #ff6b6b)',
                  flexShrink: 0,
                  marginTop: '0.35rem',
                  boxShadow: hovered ? '0 0 6px #ff4444' : 'none',
                  transition: 'background 0.3s ease, box-shadow 0.3s ease',
                }} />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ─────────── Main Hero ─────────── */
export default function Hero({ changeBgm, playBgm, pauseBgm, introPlayed, setIntroPlayed }) {
  const containerRef = useRef(null)
  const sectionsRef = useRef(null)
  const introVideoRef = useRef(null)

  const [splashActive, setSplashActive] = useState(!introPlayed)
  const [videoActive, setVideoActive] = useState(false)
  const [baseRevealed, setBaseRevealed] = useState(introPlayed)

  const [activeSection, setActiveSection] = useState(0)
  const [cardsVisible, setCardsVisible] = useState(introPlayed)
  const [titleVisible, setTitleVisible] = useState(!introPlayed)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* ── Auto-start BGM if intro was already played ── */
  useEffect(() => {
    if (introPlayed && playBgm) {
      playBgm()
    }
  }, [introPlayed, playBgm])

  /* ── Check if screen is mobile or tablet size (<1024px) ── */
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth < 1024)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  /* ── Auto-hide Hero Title Panel after 5 seconds ── */
  useEffect(() => {
    if (baseRevealed) {
      const timer = setTimeout(() => {
        setTitleVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [baseRevealed])

  /* ── Handles initialization (click anywhere on splash) ── */
  const handleStartExperience = () => {
    setSplashActive(false)
    if (isMobileOrTablet) {
      revealBase()
    } else {
      setVideoActive(true)
      // Temporarily pause global BGM while intro video with synced audio plays
      if (pauseBgm) {
        pauseBgm()
      }
      // Play video
      setTimeout(() => {
        if (introVideoRef.current) {
          introVideoRef.current.play().catch(console.error)
        }
      }, 100)
    }
  }

  /* ── Transition to main report base ── */
  const revealBase = useCallback(() => {
    setVideoActive(false)
    setBaseRevealed(true)
    if (setIntroPlayed) {
      setIntroPlayed(true)
    }
    if (playBgm) {
      playBgm()
    }
  }, [playBgm, setIntroPlayed])



  /* ── Scroll handler for highlighting active section ── */
  useEffect(() => {
    if (!baseRevealed) return

    const onScroll = () => {
      const sectionEls = sectionsRef.current?.querySelectorAll('[data-section]')
      if (sectionEls) {
        let found = 0
        sectionEls.forEach((el, i) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.55) found = i
        })
        setActiveSection(found)
      }

      if (sectionsRef.current) {
        const rect = sectionsRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) setCardsVisible(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [baseRevealed])

  /* ── Scroll to specific section ── */
  const scrollToSection = (i) => {
    const el = sectionsRef.current?.querySelectorAll('[data-section]')[i]
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div ref={containerRef} style={{ background: 'var(--akatsuki-dark)', minHeight: '100vh', position: 'relative' }}>

      {/* ══════════════ 1. SPLASH SCREEN ══════════════ */}
      {splashActive && (
        <div
          className="no-bgm-click"
          onClick={handleStartExperience}
          style={{
            position: 'fixed', inset: 0,
            background: 'radial-gradient(circle at center, #180202 0%, #050505 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
          }}
        >
          {/* Glowing Red Cloud Logo */}
          <img
            src={logo}
            alt="Akatsuki Logo"
            style={{
              width: '12rem',
              height: 'auto',
              filter: 'drop-shadow(0 0 35px rgba(192, 57, 43, 0.8))',
              animation: 'logoPulse 2s infinite ease-in-out',
              marginBottom: '2rem',
            }}
          />
          <h1 style={{
            fontFamily: 'var(--font-rocker)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#fff',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          }}>
            AKATSUKI REPORT
          </h1>
          <p style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '1rem',
            color: '#888',
            letterSpacing: '0.25em',
            marginBottom: '3rem',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}>
            Secure Intelligence Network
          </p>
          <div style={{
            fontFamily: 'var(--font-rocker)',
            fontSize: '1.2rem',
            color: '#ff6b6b',
            letterSpacing: '0.15em',
            border: '1px solid rgba(192, 57, 43, 0.4)',
            padding: '0.8rem 2.5rem',
            borderRadius: '50px',
            background: 'rgba(139, 0, 0, 0.15)',
            boxShadow: '0 0 20px rgba(192, 57, 43, 0.3)',
            animation: 'scrollPulse 2s infinite',
          }}>
            TAP TO ENTER EXPERIMENT
          </div>
        </div>
      )}

      {/* ══════════════ 2. FULLSCREEN ENTRY VIDEO ══════════════ */}
      {videoActive && (
        <div
          className="no-bgm-click"
          style={{
            position: 'fixed', inset: 0,
            background: '#000',
            zIndex: 9998,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <video
            ref={introVideoRef}
            src={heroVideo}
            onEnded={revealBase}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            controls={false}
            playsInline
          />
          {/* Skip button overlay */}
          <button
            onClick={revealBase}
            style={{
              position: 'absolute', top: '2rem', right: '2rem',
              background: 'rgba(20, 20, 20, 0.85)',
              border: '1px solid rgba(192, 57, 43, 0.4)',
              borderRadius: '50px',
              padding: '0.6rem 1.5rem',
              color: '#fff',
              fontFamily: 'var(--font-rocker)',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              zIndex: 10,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#c0392b'
              e.target.style.borderColor = '#ff4444'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(20, 20, 20, 0.85)'
              e.target.style.borderColor = 'rgba(192, 57, 43, 0.4)'
            }}
          >
            SKIP INTRO ➔
          </button>
        </div>
      )}

      {/* ══════════════ 3. MAIN AKATSUKI BASE PANEL ══════════════ */}
      {baseRevealed && (
        <>
          {/* Ambient Video Background under Dashboard content */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
            overflow: 'hidden', zIndex: 1, pointerEvents: 'none',
          }}>
            {!isMobileOrTablet ? (
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, #1b0303 0%, #050505 100%)',
              }} />
            )}
            {/* Dark crimson vignette mask */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle, rgba(0,0,0,0.2) 30%, rgba(10,10,10,0.95) 90%), linear-gradient(180deg, transparent 70%, rgba(10,10,10,1) 100%)',
            }} />
          </div>

          {/* Core Content Area */}
          <div style={{ position: 'relative', zIndex: 2 }}>

            {/* ── Top Header Navbar ── */}
            <header style={{
              position: 'fixed', top: 0, left: 0, right: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: isMobileOrTablet ? '1rem 1.5rem' : '1.5rem 2.5rem',
              background: 'linear-gradient(180deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 100,
              borderBottom: '1px solid rgba(192, 57, 43, 0.15)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <img 
                  src={logo} 
                  alt="Akatsuki Cloud Logo" 
                  style={{ width: '1.8rem', height: 'auto', filter: 'drop-shadow(0 0 5px rgba(192, 57, 43, 0.6))' }} 
                />
                <div style={{
                  fontFamily: 'var(--font-rocker)',
                  fontSize: 'clamp(1.1rem,2.2vw,1.6rem)',
                  background: 'linear-gradient(135deg,#c0392b,#ff6b6b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.05em',
                }}>
                  AKATSUKI REPORT
                </div>
              </div>
              
              {!isMobileOrTablet ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {sections.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToSection(i)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: activeSection === i ? '#ff6b6b' : 'rgba(255,255,255,0.6)',
                          fontFamily: 'var(--font-rocker)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.1em',
                          cursor: 'pointer',
                          transition: 'color 0.3s',
                          padding: '0.3rem 0',
                          borderBottom: activeSection === i ? '2px solid #c0392b' : '2px solid transparent',
                        }}
                      >
                        {s.button}
                      </button>
                    ))}
                  </nav>

                  <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.15)' }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <Link
                      to="/login"
                      style={{
                        color: 'rgba(255, 255, 255, 0.75)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-rocker)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.15em',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#ff6b6b')}
                      onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.75)')}
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/signup"
                      style={{
                        background: 'linear-gradient(135deg, #8b0000, #c0392b)',
                        color: '#fff',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-rocker)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.15em',
                        padding: '0.45rem 1.25rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(192, 57, 43, 0.5)',
                        boxShadow: '0 0 10px rgba(192, 57, 43, 0.25)',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #c0392b, #ff4444)';
                        e.target.style.boxShadow = '0 0 15px rgba(192, 57, 43, 0.5)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #8b0000, #c0392b)';
                        e.target.style.boxShadow = '0 0 10px rgba(192, 57, 43, 0.25)';
                        e.target.style.transform = 'none';
                      }}
                    >
                      JOIN CLAN
                    </Link>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    transition: 'color 0.3s',
                  }}
                >
                  ☰
                </button>
              )}
            </header>

            {/* Mobile Drawer Menu Overlay */}
            {isMobileOrTablet && menuOpen && (
              <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 10, 10, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
              }}>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '2.5rem',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>

                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      scrollToSection(i)
                      setMenuOpen(false)
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeSection === i ? '#ff6b6b' : '#fff',
                      fontFamily: 'var(--font-rocker)',
                      fontSize: '1.5rem',
                      letterSpacing: '0.15em',
                      cursor: 'pointer',
                    }}
                  >
                    {s.button.toUpperCase()}
                  </button>
                ))}

                <div style={{ width: '60px', height: '1px', background: 'rgba(192, 57, 43, 0.4)', margin: '1rem 0' }} />

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-rocker)',
                    fontSize: '1.25rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  LOGIN
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: 'linear-gradient(135deg, #8b0000, #c0392b)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-rocker)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.15em',
                    padding: '0.75rem 2.5rem',
                    borderRadius: '50px',
                    border: '1px solid rgba(192, 57, 43, 0.6)',
                    boxShadow: '0 0 15px rgba(192, 57, 43, 0.4)',
                  }}
                >
                  JOIN CLAN
                </Link>
              </div>
            )}

            {/* ── Main Hero Title Panel (100vh) ── */}
            <div style={{
              height: titleVisible ? '100vh' : '0vh',
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'opacity 1.2s ease, transform 1.2s ease, height 1.5s cubic-bezier(0.25, 1, 0.5, 1) 0.5s',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              padding: titleVisible ? '0 1.5rem' : '0',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                fontSize: '0.75rem', letterSpacing: '0.35em',
                color: '#ff4444', textTransform: 'uppercase',
                marginBottom: '1rem',
                fontFamily: 'system-ui,sans-serif',
                textShadow: '0 0 10px rgba(255, 68, 68, 0.5)',
              }}>
                ◈ Akatsuki Intelligence Network ◈
              </div>

              <h1 style={{
                fontFamily: 'var(--font-rocker)',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                lineHeight: 1.05,
                color: '#fff',
                textShadow: '0 0 45px rgba(192,57,43,0.85), 0 4px 20px rgba(0,0,0,0.9)',
                marginBottom: '1rem',
              }}>
                Akatsuki<br />
                <span style={{
                  background: 'linear-gradient(135deg,#c0392b,#ff4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Report
                </span>
              </h1>

              <p style={{
                fontFamily: 'system-ui,sans-serif',
                fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 520,
                lineHeight: 1.8,
              }}>
                Where intelligence meets technology — an Akatsuki-themed modern interactive platform.
              </p>

              {/* Scroll down indicator */}
              <div style={{
                position: 'absolute', bottom: '2.5rem', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '0.5rem',
                pointerEvents: 'none',
              }}>
                <span style={{
                  fontFamily: 'system-ui,sans-serif',
                  fontSize: '0.68rem', letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
                }}>
                  Explore Intelligence Base
                </span>
                <div style={{
                  width: 1, height: 40,
                  background: 'linear-gradient(180deg,rgba(192,57,43,0.8),transparent)',
                  animation: 'scrollPulse 1.5s ease-in-out infinite',
                }} />
              </div>
            </div>

            {/* ── Sections Content Area ── */}
            <div
              ref={sectionsRef}
              style={{
                background: 'linear-gradient(180deg, transparent 0%, #0a0a0a 15%, #050000 100%)',
                padding: isMobileOrTablet ? '4rem 0' : '6rem 0',
                position: 'relative',
              }}
            >
              <div style={{
                maxWidth: 1200, margin: '0 auto',
                padding: isMobileOrTablet ? '0 1rem' : '0 2rem',
              }}>
                {/* Section title */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: isMobileOrTablet ? '2.5rem' : '4rem',
                }}>
                  <p style={{
                    fontFamily: 'system-ui,sans-serif',
                    fontSize: '0.72rem',
                    letterSpacing: '0.3em',
                    color: '#c0392b',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}>
                    ◈ Explore the Mission ◈
                  </p>
                  <h2 style={{
                    fontFamily: 'var(--font-rocker)',
                    fontSize: 'clamp(2rem,4vw,3.2rem)',
                    color: '#fff',
                    textShadow: '0 0 30px rgba(192,57,43,0.5)',
                  }}>
                    The Akatsuki Blueprint
                  </h2>
                </div>

                {/* Stack of full-width section cards */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobileOrTablet ? '2rem' : '3.5rem',
                  width: '100%',
                }}>
                  {sections.map((section, i) => (
                    <div key={section.id} data-section style={{ width: '100%' }}>
                      <SectionCard
                        section={section}
                        index={i}
                        visible={true}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* footer credit */}
              <div style={{
                width: '100%', height: 1,
                background: 'linear-gradient(90deg,transparent,#8b0000,transparent)',
                marginTop: '6rem',
              }} />

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '3.5rem',
              }}>
                <img 
                  src={logo} 
                  alt="Footer Logo" 
                  style={{ width: '2.5rem', height: 'auto', opacity: 0.3, filter: 'grayscale(30%)' }} 
                />
                <div style={{
                  fontFamily: 'var(--font-rocker)',
                  fontSize: '0.9rem',
                  color: 'rgba(192,57,43,0.5)',
                  letterSpacing: '0.25em',
                  textAlign: 'center',
                }}>
                  AKATSUKI REPORT — WE ARE EVERYWHERE
                </div>
              </div>
            </div>

            {/* ── Side Dot Navigation ── */}
            {!isMobileOrTablet && (
              <div style={{
                position: 'fixed', right: '1.5rem', top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                zIndex: 100,
              }}>
                {sections.map((_, i) => (
                  <NavDot
                    key={i}
                    active={activeSection === i}
                    label={sections[i].button}
                    onClick={() => scrollToSection(i)}
                  />
                ))}
              </div>
            )}



          </div>
        </>
      )}

      {/* ══════════════ KEYFRAME ANIMATIONS ══════════════ */}
      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity:0.3; transform:scaleY(1); }
          50%      { opacity:1;   transform:scaleY(1.2); }
        }
        @keyframes pulse-dot {
          0%,100% { transform:scale(1);   opacity:0.4; }
          50%     { transform:scale(1.6); opacity:1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 35px rgba(192, 57, 43, 0.8)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 50px rgba(192, 57, 43, 1)); }
        }
      `}</style>
    </div>
  )
}