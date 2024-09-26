import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LoginForm from './Login/Loginform';
import Registration from './Login/Registration';
import { auth } from './config/firebase';  // Import Firebase auth

const Explore = () => <div>Explore Page</div>;
const Lessons = () => <div>Lessons Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
const AITermGlossary = () => <div>AI Term Glossary Page</div>;
const Quizzes = () => <div>Quizzes Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);  // State to track logged-in user
  const [loading, setLoading] = useState(true);  // State to track loading

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);  // Done loading when auth state is resolved
    });

    return () => unsubscribe();  // Cleanup the listener
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading screen until auth resolves
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* Only show the sidebar if the user is logged in */}
      {user && location.pathname !== '/login' && location.pathname !== '/register' && <Sidebar />}
      
      <div style={{ marginLeft: user ? '20%' : '0', padding: '20px', width: '100%' }}>
        <Routes>
          {/* Redirect logged-in users to /explore, otherwise show Login page */}
          <Route path="/" element={user ? <Navigate to="/explore" /> : <LoginForm />} />
          <Route path="/login" element={user ? <Navigate to="/explore" /> : <LoginForm />} />
          <Route path="/register" element={user ? <Navigate to="/explore" /> : <Registration />} />
          {/* Protected routes - if user is not logged in, redirect to login */}
          <Route path="/explore" element={user ? <Explore /> : <Navigate to="/login" />} />
          <Route path="/lessons" element={user ? <Lessons /> : <Navigate to="/login" />} />
          <Route path="/linked-content" element={user ? <LinkedContent /> : <Navigate to="/login" />} />
          <Route path="/ai-term-glossary" element={user ? <AITermGlossary /> : <Navigate to="/login" />} />
          <Route path="/quizzes" element={user ? <Quizzes /> : <Navigate to="/login" />} />
          <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/login" />} />
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
