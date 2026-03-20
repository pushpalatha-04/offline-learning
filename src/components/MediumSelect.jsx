import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MediumSelect() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')

  const logout = () => { localStorage.removeItem('currentUser'); navigate('/') }

  return (
    <div className="screen fade-up">
      <div className="topbar">
        <div style={{ flex: 1 }}>
          <p className="cursive" style={{ fontSize: '1rem', color: '#444' }}>Welcome,</p>
          <p className="cursive" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{user.name || user.username} 👋</p>
        </div>
        <button onClick={logout} style={{
          background: 'rgba(255,255,255,0.35)', border: 'none', borderRadius: 10,
          padding: '8px 14px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer'
        }}>Logout</button>
      </div>

      <div className="center-layout" style={{ paddingTop: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: '3rem' }}>🌐</div>
          <h2 className="cursive" style={{ fontSize: '2rem' }}>Select Medium</h2>
          <p style={{ fontSize: '0.85rem', color: '#555' }}>Choose your learning language</p>
        </div>

        <div className="gap-12" style={{ width: '100%', maxWidth: 380 }}>
          <button className="btn-green" onClick={() => navigate('/classes/English')} style={{ fontSize: '1.1rem', padding: '18px' }}>
            🔤 English Medium
          </button>
          <button className="btn-green" onClick={() => navigate('/classes/Tamil')} style={{ fontSize: '1.1rem', padding: '18px' }}>
            🌺 Tamil Medium
          </button>
        </div>
      </div>
    </div>
  )
}
