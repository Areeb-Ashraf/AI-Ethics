import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DatabaseManTester from "./DatabaseManTester";
import Homepage from "./components/homepage";

// Placeholder components for the pages
const Explore = () => <div>Explore Page</div>;
const Lessons = () => <div>Lessons Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
const AITermGlossary = () => <div>AI Term Glossary Page</div>;
const Quizzes = () => <div>Quizzes Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state

  return (
    <Router>
      <div className={sidebarOpen ? "app-container sidebar-open" : "app-container sidebar-closed"}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/linked-content" element={<LinkedContent />} />
            <Route path="/ai-term-glossary" element={<AITermGlossary />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/databaseTest" element={<DatabaseManTester />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

