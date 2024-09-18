import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LoginForm from './components/LoginForm/Loginform';
//import { useAuth, AuthProvider } from './AuthContext';

const Explore = () => <div>Explore Page</div>;
const Lessons = () => <div>Lessons Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
const AITermGlossary = () => <div>AI Term Glossary Page</div>;
const Quizzes = () => <div>Quizzes Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;

function AppContent() {
  const location = useLocation();  // Correctly placed inside Router context

  return (
    <div style={{ display: 'flex' }}>
      {/* Only show the sidebar if the user is not on the login page */}
      {location.pathname !== '/' && <Sidebar />}
      
      <div style={{ marginLeft: location.pathname !== '/' ? '20%' : '0', padding: '20px', width: '100%' }}>
        <Routes>
          <Route path="/" element={<LoginForm />} />  {/* Login page */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/linked-content" element={<LinkedContent />} />
          <Route path="/ai-term-glossary" element={<AITermGlossary />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
