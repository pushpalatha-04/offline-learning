import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', dob: '', name: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = () => {
    if (!form.username.trim() || !form.dob || !form.name.trim()) {
      setError('Please fill all fields.'); return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.username === form.username.trim())) {
      setError('Username already exists. Try another.'); return
    }
    users.push({ username: form.username.trim(), dob: form.dob, name: form.name.trim() })
    localStorage.setItem('users', JSON.stringify(users))
    setSuccess(true)
    setTimeout(() => navigate('/'), 1500)
  }

  return (
    <div className="screen fade-up" style={{ justifyContent: 'center' }}>
      <div className="center-layout">
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: '3rem' }}>🎒</div>
          <h1 className="cursive" style={{ fontSize: '2rem' }}>Create Account</h1>
        </div>

        <div className="card gap-16" style={{ width: '100%', maxWidth: 380 }}>
          <h2 className="cursive" style={{ fontSize: '1.8rem' }}>Sign Up</h2>

          {error && (
            <div style={{ background: '#ffd4d4', border: '1px solid #e57373', borderRadius: 10, padding: '10px 14px', fontSize: '0.85rem', color: '#c62828' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#c8f0c8', border: '1px solid #4caf50', borderRadius: 10, padding: '10px 14px', fontSize: '0.85rem', color: '#1b5e20' }}>
              ✅ Account created! Redirecting to login...
            </div>
          )}

          <div>
            <label className="label">Full Name:</label>
            <input className="input" placeholder="Your full name"
              value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setError('') }} />
          </div>

          <div>
            <label className="label">Username:</label>
            <input className="input" placeholder="Choose a username"
              value={form.username} onChange={e => { setForm({ ...form, username: e.target.value }); setError('') }} />
          </div>

          <div>
            <label className="label">Date of Birth:</label>
            <input className="input" type="date"
              value={form.dob} onChange={e => { setForm({ ...form, dob: e.target.value }); setError('') }} />
          </div>

          <button className="btn-green" onClick={handleSignup}>Create Account</button>
          <button className="btn-outline" onClick={() => navigate('/')}>← Back to Login</button>
        </div>
      </div>
    </div>
  )
}
