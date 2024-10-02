import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import components 
import Sidebar from "./components/sidebar";
import DatabaseManTester from "./DatabaseManTester";
import AIGlossary from "./aiGlossary";
import Homepage from "./components/homepage";
import UserProfile from "./UserProfile";
import LoginForm from "./Loginform";
import Registration from "./Registration";
import { auth } from './firebase';
import Lessons from "./components/lessons";
import Leaderboard from "./components/leaderboard";
import Quizzes from "./components/quizzes";

const Explore = () => <div>Explore Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
//const Quizzes = () => <div>Quizzes Page</div>;
// this is in the quizzes.js file ^

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className={sidebarOpen ? "app-container sidebar-open" : "app-container sidebar-closed"}>
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/*"
            element={
              <>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isLoggedIn={isLoggedIn} />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/lessons" element={<Lessons />} />
                    <Route path="/linked-content" element={<LinkedContent />} />
                    <Route path="/ai-term-glossary" element={<AIGlossary />} />
                    <Route path="/quizzes" element={<Quizzes selectedModule={0} />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/databaseTest" element={<DatabaseManTester />} />
                    <Route path="/profile" element={<UserProfile />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
