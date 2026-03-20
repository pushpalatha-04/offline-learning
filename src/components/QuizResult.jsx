import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function QuizResult() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { score = 0, total = 10, classNum, subject, medium } = state || {}
  const pct = Math.round((score / total) * 100)

  const getMsg = () => {
    if (pct === 100) return { emoji: '🏆', msg: 'Perfect Score!', color: '#ffd600' }
    if (pct >= 80)  return { emoji: '🌟', msg: 'Excellent!', color: '#43a047' }
    if (pct >= 60)  return { emoji: '👍', msg: 'Good Job!', color: '#1976d2' }
    if (pct >= 40)  return { emoji: '💪', msg: 'Keep Trying!', color: '#f57c00' }
    return { emoji: '📚', msg: 'Study More!', color: '#e53935' }
  }
  const { emoji, msg, color } = getMsg()
  const stars = Math.round(pct / 20)

  return (
    <div className="screen fade-up" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: '30px 24px', width: '100%', maxWidth: 400 }}>
        <div className="card pop" style={{ textAlign: 'center', gap: 0 }}>
          <div style={{ fontSize: '4.5rem', marginBottom: 4 }}>{emoji}</div>
          <h1 className="cursive" style={{ fontSize: '2.2rem', color, marginBottom: 2 }}>{msg}</h1>
          <p style={{ color: '#666', fontSize: '0.88rem', marginBottom: 20 }}>Class {classNum} • {subject}</p>

          {/* Score circle */}
          <div className="score-circle" style={{ background: `conic-gradient(${color} ${pct * 3.6}deg, #e0e0e0 0deg)` }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color }}>{score}/{total}</span>
              <span style={{ fontSize: '0.75rem', color: '#777' }}>{pct}%</span>
            </div>
          </div>

          {/* Stars */}
          <div style={{ fontSize: '1.8rem', margin: '16px 0 24px' }}>
            {Array.from({ length: 5 }).map((_, i) => <span key={i}>{i < stars ? '⭐' : '☆'}</span>)}
          </div>

          <div className="gap-12">
            <button className="btn-green" onClick={() => navigate(`/quiz/${medium}/${classNum}/${subject}`)}>
              🔄 Try Again
            </button>
            <button className="btn-green" style={{ background: '#388e3c' }} onClick={() => navigate(`/modules/${medium}/${classNum}/${subject}`)}>
              ← Back to Modules
            </button>
            <button className="btn-green" style={{ background: '#2e7d32' }} onClick={() => navigate('/medium')}>
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
