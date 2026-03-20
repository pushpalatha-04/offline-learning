import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ModulePage() {
  const navigate = useNavigate()
  const { medium, classNum, subject } = useParams()

  const modules = [
    { label: 'Dictionary', icon: '📖', path: 'dictionary', color: '#388e3c' },
    { label: 'Quiz', icon: '✏️', path: 'quiz', color: '#43a047' },
    { label: 'AI Analysis', icon: '🤖', path: 'ai', color: '#2e7d32' },
    { label: 'Progress Tracker', icon: '📊', path: 'progress', color: '#1b5e20' },
  ]

  return (
    <div className="screen fade-up">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/classes/${medium}`)}>←</button>
        <span className="topbar-title">
          {subject} – Class {classNum}
        </span>
      </div>

      <div className="center-layout" style={{ paddingTop: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: '2.5rem' }}>
            {subject === 'English' ? '🔤' : subject === 'Tamil' ? '🌺' : subject === 'Maths' ? '🔢' : '🌿'}
          </div>
          <h2 className="cursive" style={{ fontSize: '1.8rem', marginTop: 4 }}>
            Modules for {subject} – Class {classNum}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#555' }}>{medium} Medium</p>
        </div>

        <div className="gap-12" style={{ width: '100%', maxWidth: 380 }}>
          {modules.map(mod => (
            <button
              key={mod.label}
              className="btn-green"
              style={{ background: mod.color, fontSize: '1.05rem', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              onClick={() => navigate(`/${mod.path}/${medium}/${classNum}/${subject}`)}
            >
              <span>{mod.icon}</span> {mod.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
