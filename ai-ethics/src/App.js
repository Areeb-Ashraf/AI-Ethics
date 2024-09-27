import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DatabaseManTester from "./DatabaseManTester";
import AIGlossary from "./aiGlossary";
import Homepage from "./components/homepage";
import UserProfile from "./UserProfile";
import LoginForm from './Loginform';
import Registration from './Registration';

// Placeholder components for the pages
const Explore = () => <div>Explore Page</div>;
const Lessons = () => <div>Lessons Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
const Quizzes = () => <div>Quizzes Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;

// Main App Component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state
  const location = useLocation();  // Get the current route

  // Check if the current path is login or register to hide the sidebar
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
      <div
        className={
          sidebarOpen
            ? "app-container sidebar-open"
            : "app-container sidebar-closed"
        }
      >
        {/* Conditionally render the sidebar based on the route */}
         {!isAuthPage && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/linked-content" element={<LinkedContent />} />
            <Route path="/ai-term-glossary" element={<AIGlossary />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/databaseTest" element={<DatabaseManTester />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
