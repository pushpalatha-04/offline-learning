import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!username.trim() || !dob) {
      setError('Please enter username and date of birth.')
      return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.username === username.trim() && u.dob === dob)
    if (!user) {
      const names = users.map(u => u.username).join(', ')
      setError(
        users.length === 0
          ? 'No accounts found. Please Sign Up first.'
          : `User not found. Please check your username and date of birth.`
      )
      return
    }
    localStorage.setItem('currentUser', JSON.stringify(user))
    navigate('/medium')
  }

  const checkAccounts = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.length === 0) {
      alert('No accounts registered yet. Please Sign Up first.')
    } else {
      alert('Registered accounts:\n' + users.map(u => `• ${u.username}  (DOB: ${u.dob})`).join('\n'))
    }
  }

  return (
    <div className="screen fade-up" style={{ justifyContent: 'center' }}>
      <div className="center-layout">
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 8 }}>📚</div>
          <h1 className="cursive" style={{ fontSize: '2.2rem', color: '#1a1a1a' }}>Offline Learning</h1>
          <p style={{ fontSize: '0.85rem', color: '#555', marginTop: 4 }}>Your offline classroom companion</p>
        </div>

        <div className="card gap-16 fade-up" style={{ width: '100%', maxWidth: 380 }}>
          <h2 className="cursive" style={{ fontSize: '1.8rem' }}>Login</h2>

          {error && (
            <div style={{ background: '#ffd4d4', border: '1px solid #e57373', borderRadius: 10, padding: '10px 14px', fontSize: '0.84rem', color: '#c62828', lineHeight: 1.5 }}>
              {error}
            </div>
          )}

          <div>
            <label className="label">Username:</label>
            <input
              className="input"
              placeholder="Enter your username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div>
            <label className="label">Date of Birth:</label>
            <input
              className="input"
              type="date"
              value={dob}
              onChange={e => { setDob(e.target.value); setError('') }}
              style={{ cursor: 'pointer' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#888', marginTop: 4 }}>
              Use the same date you selected during Sign Up
            </p>
          </div>

          <button className="btn-green" onClick={handleLogin}>Login</button>

          <div style={{ textAlign: 'center' }}>
            <p className="cursive" style={{ color: '#555', marginBottom: 10 }}>First time user?</p>
            <button className="btn-green" onClick={() => navigate('/signup')} style={{ background: '#4caf50' }}>
              Sign Up
            </button>
          </div>

          <button onClick={checkAccounts} style={{
            background: 'none', border: '1px solid #ddd', borderRadius: 10,
            padding: '8px', color: '#999', fontSize: '0.75rem',
            cursor: 'pointer', fontFamily: 'Poppins', width: '100%'
          }}>
            🔍 Check registered accounts
          </button>
        </div>
      </div>
    </div>
  )
}
