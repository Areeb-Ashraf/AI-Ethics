import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DatabaseManTester from "./DatabaseManTester";
import AIGlossary from "./aiGlossary";

// Placeholder components for the pages
const Explore = () => <div>Explore Page</div>;
const Lessons = () => <div>Lessons Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
const Quizzes = () => <div>Quizzes Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;

function App() {
  return (
    <Router>
      <div>
        <Sidebar /> {/* Sidebar stays fixed */}
        <div>
          <Routes>
            {/*Add Homepage route*/}
            <Route path="/explore" element={<Explore />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/linked-content" element={<LinkedContent />} />
            <Route path="/ai-term-glossary" element={<AIGlossary />} />
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
