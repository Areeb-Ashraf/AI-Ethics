import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar'

// Placeholder components for the pages
const Explore = () => <div>Explore Page</div>;
const Lessons = () => <div>Lessons Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
const AITermGlossary = () => <div>AI Term Glossary Page</div>;
const Quizzes = () => <div>Quizzes Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;

function App() {
  return (
    <Router>
      {/*Remove inline css*/}
      <div style={{ display: 'flex' }}>
        <Sidebar />  {/* Sidebar stays fixed */}
        <div style={{ marginLeft: '20%', padding: '20px', width: '80%' }}>
          <Routes>
            {/*Add Homepage route*/}
            <Route path="/explore" element={<Explore />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/linked-content" element={<LinkedContent />} />
            <Route path="/ai-term-glossary" element={<AITermGlossary />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
