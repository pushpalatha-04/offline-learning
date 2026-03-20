import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Quiz() {
  const navigate = useNavigate()
  const { medium, classNum, subject } = useParams()
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/quiz/class${classNum}/${subject}.json`)
      .then(r => r.json())
      .then(data => { setQuestions(data.questions || data); setLoading(false) })
      .catch(() => { setError('Quiz not available for this subject.'); setLoading(false) })
  }, [classNum, subject])

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === questions[current].answer) setScore(s => s + 1)
  }

  const handleNext = () => {
    const newScore = selected === questions[current].answer ? score : score
    if (current + 1 >= questions.length) {
      const key = `quiz_${medium}_class${classNum}_${subject}`
      const prog = JSON.parse(localStorage.getItem('quizProgress') || '{}')
      prog[key] = { score, total: questions.length, date: new Date().toLocaleDateString('en-IN') }
      localStorage.setItem('quizProgress', JSON.stringify(prog))
      navigate('/quiz-result', { state: { score, total: questions.length, classNum, subject, medium } })
    } else {
      setCurrent(c => c + 1); setSelected(null); setAnswered(false)
    }
  }

  if (loading) return (
    <div className="screen" style={{ alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <div style={{ fontSize: '3rem' }}>⏳</div>
      <p className="cursive" style={{ fontSize: '1.3rem' }}>Loading Quiz...</p>
    </div>
  )

  if (error || questions.length === 0) return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="topbar-title">{subject} Quiz</span>
      </div>
      <div className="center-layout">
        <div style={{ fontSize: '3rem' }}>😕</div>
        <h3 className="cursive" style={{ fontSize: '1.4rem' }}>{error || 'No questions found'}</h3>
        <button className="btn-green" style={{ maxWidth: 300 }} onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  )

  const q = questions[current]
  const pct = ((current + 1) / questions.length) * 100

  return (
    <div className="screen fade-up">
      {/* Header */}
      <div style={{ padding: '16px 20px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <div style={{ flex: 1 }}>
            <p className="cursive" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Class {classNum} – {subject} Quiz</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: 10, padding: '6px 12px', fontWeight: 700, fontSize: '0.9rem' }}>
            ⭐ {score}
          </div>
        </div>
        <div className="prog-wrap">
          <div className="prog-fill" style={{ width: `${pct}%` }} />
        </div>
        <p style={{ fontSize: '0.78rem', color: '#444', marginTop: 4, textAlign: 'right' }}>
          Question {current + 1} of {questions.length}
        </p>
      </div>

      {/* Question card */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="card">
          <p style={{ fontSize: '0.75rem', color: '#3d8b3d', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>
            Question {current + 1}
          </p>
          <h2 className="cursive" style={{ fontSize: '1.25rem', lineHeight: 1.5 }}>{q.question}</h2>
        </div>

        <div className="gap-12">
          {q.options.map((opt, idx) => {
            let cls = 'option-btn'
            if (answered) {
              if (idx === q.answer) cls += ' correct'
              else if (idx === selected) cls += ' wrong'
            } else if (selected === idx) {
              cls += ' selected'
            }
            return (
              <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={answered}>
                <span style={{ fontWeight: 700, marginRight: 8 }}>
                  {answered && idx === q.answer ? '✓' : answered && idx === selected ? '✗' : String.fromCharCode(65 + idx) + '.'}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {answered && (
          <button className="btn-green pop" onClick={handleNext} style={{ marginTop: 4 }}>
            {current + 1 >= questions.length ? '🎉 See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
