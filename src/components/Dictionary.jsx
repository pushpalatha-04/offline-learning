import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const WORDS = {
  apple:{meaning:'A round fruit, usually red, green, or yellow.',example:'I eat an apple every day.',type:'noun'},
  ball:{meaning:'A round object used in games and sports.',example:'The boy kicked the ball.',type:'noun'},
  cat:{meaning:'A small furry animal kept as a pet.',example:'The cat sat on the mat.',type:'noun'},
  dog:{meaning:'A common animal kept as a pet that barks.',example:'My dog loves to play.',type:'noun'},
  elephant:{meaning:'A very large grey animal with a long trunk.',example:'The elephant lives in the jungle.',type:'noun'},
  fish:{meaning:'An animal that lives in water and has scales.',example:'The fish swims in the pond.',type:'noun'},
  happy:{meaning:'Feeling or showing pleasure and joy.',example:'She was happy when she got a gift.',type:'adjective'},
  jump:{meaning:'To move your body up off the ground.',example:'The frog can jump very high.',type:'verb'},
  kind:{meaning:'Being gentle, helpful, and caring to others.',example:'Be kind to your friends.',type:'adjective'},
  learn:{meaning:'To get knowledge or a new skill.',example:'We learn new things at school.',type:'verb'},
  mango:{meaning:'A sweet juicy tropical fruit.',example:'I love eating mango.',type:'noun'},
  night:{meaning:'The time when it is dark outside.',example:'Stars shine at night.',type:'noun'},
  open:{meaning:'Not closed; allowing things to pass through.',example:'Please open the door.',type:'verb'},
  rain:{meaning:'Water that falls from clouds in the sky.',example:'We got wet in the rain.',type:'noun'},
  school:{meaning:'A place where children go to learn.',example:'I go to school every day.',type:'noun'},
  sun:{meaning:'The star at the centre of our solar system.',example:'The sun rises in the east.',type:'noun'},
  tree:{meaning:'A tall plant with a trunk, branches, and leaves.',example:'Birds sit on the tree.',type:'noun'},
  water:{meaning:'A clear liquid that we drink.',example:'Drink water to stay healthy.',type:'noun'},
  yellow:{meaning:'A bright colour like that of the sun.',example:'The sunflower is yellow.',type:'adjective'},
  zebra:{meaning:'A wild animal with black and white stripes.',example:'The zebra runs very fast.',type:'noun'},
}

export default function Dictionary() {
  const navigate = useNavigate()
  const { medium, classNum, subject } = useParams()
  const [query, setQuery] = useState('')
  const [readWord, setReadWord] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [pdfUrl, setPdfUrl] = useState(localStorage.getItem('dictionaryPDF') || null)
  const [pdfZoom, setPdfZoom] = useState(50)
  const fileRef = useRef()

  const search = (word) => {
    const w = word.toLowerCase().trim()
    if (!w) return
    if (WORDS[w]) { setResult({ word: w, ...WORDS[w] }); setNotFound(false) }
    else { setResult(null); setNotFound(true) }
  }

  const readAloud = () => {
    const text = readWord.trim() || (result ? `${result.word}. ${result.meaning}. Example: ${result.example}` : '')
    if (!text) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'en-IN'
    utt.rate = 0.85
    window.speechSynthesis.speak(utt)
  }

  const handlePDFUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPdfUrl(url)
    // Save file name in localStorage as hint
    localStorage.setItem('dictionaryPDFName', file.name)
  }

  const removePDF = () => {
    setPdfUrl(null)
    localStorage.removeItem('dictionaryPDF')
    localStorage.removeItem('dictionaryPDFName')
  }

  return (
    <div className="screen fade-up">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/modules/${medium}/${classNum}/${subject}`)}>←</button>
        <span className="topbar-title">📖 Dictionary</span>
      </div>

      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Read Aloud box */}
        <div style={{ background: '#3d8b3d', borderRadius: 16, padding: '16px' }}>
          <input
            className="input"
            placeholder="Enter a word to read aloud..."
            value={readWord}
            onChange={e => setReadWord(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <button onClick={readAloud} style={{
            width: '100%', padding: '14px', background: 'white', border: 'none',
            borderRadius: 12, fontFamily: 'Poppins', fontWeight: 600, fontSize: '1rem',
            cursor: 'pointer', color: '#3d8b3d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            📢 Read Aloud
          </button>

          {/* Zoom controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 12, background: 'white', borderRadius: 12, padding: '10px' }}>
            <button onClick={() => setPdfZoom(z => Math.max(25, z - 10))} style={{ border: 'none', background: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>➖</button>
            <span style={{ fontWeight: 700, color: '#333', minWidth: 50, textAlign: 'center' }}>{pdfZoom}% ▼</span>
            <button onClick={() => setPdfZoom(z => Math.min(200, z + 10))} style={{ border: 'none', background: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>➕</button>
          </div>
        </div>

        {/* PDF Upload section */}
        <div className="card">
          <h3 className="cursive" style={{ fontSize: '1.2rem', marginBottom: 10 }}>📄 Dictionary PDF</h3>
          {!pdfUrl ? (
            <div>
              <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: 12 }}>
                Upload your dictionary PDF file to view it here. It will be available offline.
              </p>
              <input
                type="file"
                accept="application/pdf"
                ref={fileRef}
                style={{ display: 'none' }}
                onChange={handlePDFUpload}
              />
              <button className="btn-green" onClick={() => fileRef.current.click()}>
                📁 Upload Dictionary PDF
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <p style={{ fontSize: '0.82rem', color: '#3d8b3d', fontWeight: 600 }}>
                  ✅ PDF loaded: {localStorage.getItem('dictionaryPDFName') || 'dictionary.pdf'}
                </p>
                <button onClick={removePDF} style={{ background: '#ffd4d4', border: 'none', borderRadius: 8, padding: '4px 10px', color: '#c62828', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Remove</button>
              </div>
              <iframe
                src={pdfUrl}
                style={{ width: '100%', height: `${pdfZoom * 5}px`, minHeight: 300, border: 'none', borderRadius: 10 }}
                title="Dictionary PDF"
              />
            </div>
          )}
        </div>

        {/* Word search */}
        <div className="card">
          <h3 className="cursive" style={{ fontSize: '1.2rem', marginBottom: 10 }}>🔍 Search Word</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input
              className="input"
              placeholder="Type a word..."
              value={query}
              style={{ flex: 1 }}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search(query)}
            />
            <button className="btn-green" style={{ width: 'auto', padding: '0 16px' }} onClick={() => search(query)}>Search</button>
          </div>

          {result && (
            <div className="pop" style={{ background: '#f1f8e9', borderRadius: 12, padding: '14px', borderLeft: '4px solid #43a047' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'Dancing Script', color: '#2e7d32', textTransform: 'capitalize' }}>{result.word}</h3>
                <span style={{ background: '#c8f0c8', color: '#1b5e20', borderRadius: 100, padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700 }}>{result.type}</span>
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: 8 }}>📌 {result.meaning}</p>
              <p style={{ fontSize: '0.82rem', color: '#555', fontStyle: 'italic' }}>💬 "{result.example}"</p>
              <button onClick={() => { setReadWord(result.word); readAloud() }} style={{ marginTop: 10, background: '#4caf50', border: 'none', borderRadius: 8, padding: '6px 14px', color: 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                🔊 Hear this word
              </button>
            </div>
          )}

          {notFound && (
            <div style={{ background: '#ffd4d4', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
              <p style={{ color: '#c62828', fontWeight: 600 }}>Word not found. Try another!</p>
            </div>
          )}
        </div>

        {/* A-Z Browse */}
        <div className="card">
          <h3 className="cursive" style={{ fontSize: '1.1rem', marginBottom: 10 }}>Browse A–Z</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
              <button key={l} onClick={() => {
                const w = Object.keys(WORDS).find(x => x.startsWith(l.toLowerCase()))
                if (w) { setQuery(w); search(w) }
              }} style={{
                width: 34, height: 34, borderRadius: 8, border: '2px solid #c8e6c9',
                background: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                color: '#3d8b3d', transition: 'all 0.15s'
              }}>{l}</button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
