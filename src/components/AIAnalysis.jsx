import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TIPS = {
  English: ['Practice reading aloud daily.','Learn 5 new words every day.','Write short sentences to improve grammar.','Read storybooks to improve vocabulary.'],
  Tamil: ['தினமும் தமிழ் கதைகள் படியுங்கள்.','புதிய சொற்களை கற்றுக்கொள்ளுங்கள்.','கவிதைகள் மனப்பாடம் செய்யுங்கள்.','திருக்குறள் படியுங்கள்.'],
  Maths: ['Practice multiplication tables daily.','Solve at least 10 problems every day.','Draw diagrams for geometry problems.','Check your answers twice.'],
  EVS: ['Observe nature around you.','Read about animals and plants.','Keep a science journal.','Ask questions about everything you see.'],
}

export default function AIAnalysis() {
  const navigate = useNavigate()
  const { medium, classNum, subject } = useParams()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const getAnswer = () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer('')
    // Simulate AI response with subject-based tips
    setTimeout(() => {
      const tips = TIPS[subject] || TIPS['English']
      const tip = tips[Math.floor(Math.random() * tips.length)]
      const resp = `For Class ${classNum} ${subject}: ${tip} Keep studying hard and practice every day. You can do it! 🌟`
      setAnswer(resp)
      setLoading(false)
    }, 1200)
  }

  const speak = (text) => {
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = subject === 'Tamil' ? 'ta-IN' : 'en-IN'
    utt.rate = 0.85
    setSpeaking(true)
    utt.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utt)
  }

  const stopSpeak = () => { window.speechSynthesis.cancel(); setSpeaking(false) }

  // Get quiz progress for analysis
  const prog = JSON.parse(localStorage.getItem('quizProgress') || '{}')
  const key = `quiz_${medium}_class${classNum}_${subject}`
  const quizData = prog[key]

  return (
    <div className="screen fade-up">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/modules/${medium}/${classNum}/${subject}`)}>←</button>
        <span className="topbar-title">🤖 AI Analysis</span>
      </div>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Main AI card */}
        <div className="card" style={{ background: '#f1f8e9' }}>
          <h2 className="cursive" style={{ fontSize: '1.6rem', color: '#2e7d32', marginBottom: 4 }}>
            🎓 AI Analysis & Voice Feedback
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#555', marginBottom: 16 }}>
            Ask anything about {subject} – Class {classNum}
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              className="input"
              placeholder="Ask about your subject..."
              value={question}
              style={{ flex: 1 }}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && getAnswer()}
            />
            <button className="btn-green" style={{ width: 'auto', padding: '0 16px' }} onClick={getAnswer}>
              Ask
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#3d8b3d' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>🤔</div>
              <p className="cursive" style={{ fontSize: '1.1rem' }}>Thinking...</p>
            </div>
          )}

          {answer && !loading && (
            <div className="pop" style={{ background: 'white', borderRadius: 12, padding: '14px', borderLeft: '4px solid #43a047' }}>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 12 }}>{answer}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => speak(answer)} style={{
                  flex: 1, padding: '10px', background: speaking ? '#2e7d32' : '#4caf50',
                  border: 'none', borderRadius: 10, color: 'white', fontWeight: 600,
                  cursor: 'pointer', fontSize: '0.88rem'
                }}>
                  {speaking ? '🔊 Speaking...' : '🔊 Read Aloud'}
                </button>
                {speaking && (
                  <button onClick={stopSpeak} style={{
                    padding: '10px 14px', background: '#e53935', border: 'none',
                    borderRadius: 10, color: 'white', fontWeight: 600, cursor: 'pointer'
                  }}>⏹</button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Performance Analysis */}
        {quizData && (
          <div className="card">
            <h3 className="cursive" style={{ fontSize: '1.3rem', marginBottom: 12 }}>📊 Your Performance</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Quiz Score</span>
              <span style={{ fontWeight: 700, color: '#3d8b3d' }}>{quizData.score}/{quizData.total}</span>
            </div>
            <div className="prog-wrap" style={{ marginBottom: 8 }}>
              <div className="prog-fill" style={{ width: `${(quizData.score / quizData.total) * 100}%` }} />
            </div>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>Last taken: {quizData.date}</p>

            {/* AI feedback based on score */}
            <div style={{ marginTop: 12, background: '#f1f8e9', borderRadius: 10, padding: '12px' }}>
              <p style={{ fontSize: '0.88rem', color: '#2e7d32', fontWeight: 600 }}>
                {quizData.score / quizData.total >= 0.8
                  ? '🌟 Excellent! You have mastered this subject. Try a harder level!'
                  : quizData.score / quizData.total >= 0.6
                  ? '👍 Good progress! Review the topics you missed and try again.'
                  : '📚 Keep practicing! Read your textbook and try the quiz again.'}
              </p>
            </div>
          </div>
        )}

        {/* Study tips */}
        <div className="card">
          <h3 className="cursive" style={{ fontSize: '1.3rem', marginBottom: 12 }}>💡 Study Tips for {subject}</h3>
          <div className="gap-12">
            {(TIPS[subject] || TIPS['English']).map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#c8f0c8', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#2e7d32', flexShrink: 0, fontSize: '0.85rem' }}>{i + 1}</span>
                <p style={{ fontSize: '0.88rem', paddingTop: 4, lineHeight: 1.5 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
