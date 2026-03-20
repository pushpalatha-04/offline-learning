import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CLASSES = [1, 2, 3, 4, 5]
const SUBJECTS = ['English', 'Tamil', 'Maths', 'EVS']

export default function ClassSubjectPage() {
  const navigate = useNavigate()
  const { medium } = useParams()
  const [selectedClass, setSelectedClass] = useState(null)

  return (
    <div className="screen fade-up">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/medium')}>←</button>
        <span className="topbar-title">Select Class</span>
      </div>

      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Class buttons */}
        <div className="card">
          <h3 className="cursive" style={{ fontSize: '1.4rem', marginBottom: 14 }}>
            📚 {medium} Medium
          </h3>
          <div className="gap-12">
            {CLASSES.map(cls => (
              <button
                key={cls}
                className="btn-green"
                style={{
                  background: selectedClass === cls ? '#2e7d32' : '#4caf50',
                  border: selectedClass === cls ? '3px solid #1b5e20' : '3px solid transparent',
                  fontSize: '1rem'
                }}
                onClick={() => setSelectedClass(cls)}
              >
                Class {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Subject buttons - show when class is selected */}
        {selectedClass && (
          <div className="card pop">
            <h3 className="cursive" style={{ fontSize: '1.4rem', marginBottom: 6 }}>
              Select Subject for Class {selectedClass}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: 14 }}>
              {medium} Medium
            </p>
            <div className="gap-12">
              {SUBJECTS.map(sub => (
                <button
                  key={sub}
                  className="btn-green"
                  style={{ fontSize: '1rem' }}
                  onClick={() => navigate(`/modules/${medium}/${selectedClass}/${sub}`)}
                >
                  {sub === 'English' ? '🔤' : sub === 'Tamil' ? '🌺' : sub === 'Maths' ? '🔢' : '🌿'} {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {!selectedClass && (
          <div style={{ textAlign: 'center', opacity: 0.6, marginTop: 20 }}>
            <div style={{ fontSize: '2.5rem' }}>👆</div>
            <p className="cursive" style={{ fontSize: '1.1rem' }}>Pick a class above to see subjects</p>
          </div>
        )}
      </div>
    </div>
  )
}
