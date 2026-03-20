import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import MediumSelect from './components/MediumSelect'
import ClassSubjectPage from './components/ClassSubjectPage'
import ModulePage from './components/ModulePage'
import Quiz from './components/Quiz'
import QuizResult from './components/QuizResult'
import Dictionary from './components/Dictionary'
import AIAnalysis from './components/AIAnalysis'
import ProgressTracker from './components/ProgressTracker'

function PrivateRoute({ children }) {
  const user = localStorage.getItem('currentUser')
  return user ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/medium" element={<PrivateRoute><MediumSelect /></PrivateRoute>} />
        <Route path="/classes/:medium" element={<PrivateRoute><ClassSubjectPage /></PrivateRoute>} />
        <Route path="/modules/:medium/:classNum/:subject" element={<PrivateRoute><ModulePage /></PrivateRoute>} />
        <Route path="/quiz/:medium/:classNum/:subject" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/quiz-result" element={<PrivateRoute><QuizResult /></PrivateRoute>} />
        <Route path="/dictionary/:medium/:classNum/:subject" element={<PrivateRoute><Dictionary /></PrivateRoute>} />
        <Route path="/ai/:medium/:classNum/:subject" element={<PrivateRoute><AIAnalysis /></PrivateRoute>} />
        <Route path="/progress/:medium/:classNum/:subject" element={<PrivateRoute><ProgressTracker /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
