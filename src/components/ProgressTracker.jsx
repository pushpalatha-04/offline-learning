import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SUBJECTS = ['English', 'Tamil', 'Maths', 'EVS']
const CLASSES = [1, 2, 3, 4, 5]

export default function ProgressTracker() {
  const navigate = useNavigate()
  const { medium, classNum, subject } = useParams()
  const [progress, setProgress] = useState({})
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')

  useEffect(() => {
    setProgress(JSON.parse(localStorage.getItem('quizProgress') || '{}'))
  }, [])

  const allScores = Object.values(progress)
  const totalScore = allScores.reduce((a, b) => a + (b.score || 0), 0)
  const totalPossible = allScores.reduce((a, b) => a + (b.total || 10), 0)
  const overallPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

  const clearProgress = () => {
    if (window.confirm('Clear all progress? This cannot be undone.')) {
      localStorage.removeItem('quizProgress')
      setProgress({})
    }
  }

  return (
    <div className="screen fade-up">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/modules/${medium}/${classNum}/${subject}`)}>←</button>
        <span className="topbar-title">📊 Progress Tracker</span>
      </div>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Student summary */}
        <div style={{ background: 'linear-gradient(135deg, #2e7d32, #43a047)', borderRadius: 16, padding: '20px', color: 'white' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>🎓</div>
            <div>
              <h2 className="cursive" style={{ fontSize: '1.4rem' }}>{user.name || user.username}</h2>
              <p style={{ opacity: 0.85, fontSize: '0.82rem' }}>Overall: {overallPct}%</p>
            </div>
          </div>
          <div className="prog-wrap" style={{ background: 'rgba(255,255,255,0.3)' }}>
            <div style={{ height: '100%', background: 'white', borderRadius: 100, width: `${overallPct}%`, transition: 'width 0.8s' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            {[
              { label: 'Quizzes', val: allScores.length },
              { label: 'Points', val: totalScore },
              { label: 'Score', val: `${overallPct}%` }
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                <div className="cursive" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Per class breakdown */}
        {allScores.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>📊</div>
            <h3 className="cursive" style={{ fontSize: '1.4rem', marginBottom: 8 }}>No quizzes taken yet!</h3>
            <p style={{ color: '#666', fontSize: '0.88rem', marginBottom: 16 }}>Complete a quiz to see your progress here.</p>
            <button className="btn-green" style={{ maxWidth: 220, margin: '0 auto' }} onClick={() => navigate(`/quiz/${medium}/${classNum}/${subject}`)}>
              Start a Quiz
            </button>
          </div>
        ) : (
          CLASSES.map(cls => {
            const entries = SUBJECTS.map(sub => {
              const k = `quiz_${medium}_class${cls}_${sub}`
              return { sub, data: progress[k] }
            }).filter(e => e.data)
            if (!entries.length) return null
            return (
              <div key={cls} className="card">
                <h3 className="cursive" style={{ fontSize: '1.2rem', color: '#2e7d32', marginBottom: 12 }}>
                  Class {cls}
                </h3>
                {entries.map(({ sub, data }) => {
                  const pct = Math.round((data.score / data.total) * 100)
                  return (
                    <div key={sub} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{sub}</span>
                        <span style={{ fontSize: '0.82rem', color: '#666' }}>{data.score}/{data.total} • {pct}%</span>
                      </div>
                      <div className="prog-wrap">
                        <div className="prog-fill" style={{ width: `${pct}%` }} />
                      </div>
                      {data.date && <p style={{ fontSize: '0.7rem', color: '#aaa', marginTop: 2 }}>Last: {data.date}</p>}
                    </div>
                  )
                })}
              </div>
            )
          })
        )}

        {allScores.length > 0 && (
          <button onClick={clearProgress} style={{
            width: '100%', padding: '14px', borderRadius: 14,
            border: '2px solid #e53935', background: 'white',
            color: '#e53935', fontFamily: 'Poppins', fontWeight: 700,
            cursor: 'pointer', fontSize: '0.9rem'
          }}>
            🗑️ Clear All Progress
          </button>
        )}
      </div>
    </div>
  )
}
