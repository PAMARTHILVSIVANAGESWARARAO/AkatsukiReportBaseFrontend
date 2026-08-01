import { useCallback, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import bgm from './data/bgm'
import Hero from './hero/Hero'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashboard from './dashboard/Dashboard'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const audioRef   = useRef(null)
  const hasStarted = useRef(false)
  const [introPlayed, setIntroPlayed] = useState(false)

  /* ── Start music on click, ignoring video/splash targets ── */
  const handleClick = useCallback((e) => {
    if (e.target.closest('.no-bgm-click')) {
      return
    }
    if (!hasStarted.current && audioRef.current) {
      audioRef.current.play().catch(console.error)
      hasStarted.current = true
    }
  }, [])

  /* ── Change audio source dynamically ── */
  const changeBgm = useCallback((newSrc) => {
    if (audioRef.current) {
      const isPaused = audioRef.current.paused
      audioRef.current.src = newSrc
      audioRef.current.load()
      if (!isPaused || hasStarted.current) {
        audioRef.current.play().catch(console.error)
        hasStarted.current = true
      }
    }
  }, [])

  /* ── Explicit play / pause controls for children ── */
  const playBgm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error)
      hasStarted.current = true
    }
  }, [])

  const pauseBgm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  return (
    <div onClick={handleClick} style={{ minHeight: '100vh' }}>
      {/* hidden looping BGM */}
      <audio ref={audioRef} src={bgm} loop preload="auto" />

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#141414',
            color: '#fff',
            border: '1px solid rgba(192, 57, 43, 0.4)',
            fontFamily: 'system-ui, sans-serif',
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Hero 
              changeBgm={changeBgm} 
              playBgm={playBgm} 
              pauseBgm={pauseBgm} 
              introPlayed={introPlayed}
              setIntroPlayed={setIntroPlayed}
            />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
