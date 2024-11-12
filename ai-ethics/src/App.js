import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar";
import DatabaseManTester from "./DatabaseManTester";
import AIGlossary from "./aiGlossary";
import Homepage from "./components/homepage";
import UserProfile from "./UserProfile";
import LoginForm from "./components/login";
import Signup from "./components/signup";
import { auth } from "./firebase";
import Lessons from "./components/lessons";
import Leaderboard from "./components/leaderboard";
import Welcome from "./components/welcome";
import Help from "./components/help";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return null;
    }
    return isLoggedIn ? (
      <div className="protected-layout">
        <Sidebar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <div className="main-content-area">{children}</div>
      </div>
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/homepage" replace /> : <Welcome />
            }
          />
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/databaseTest" element={<DatabaseManTester />} />

          {/* Protected Routes */}
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules"
            element={
              <ProtectedRoute>
                <Lessons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Userprofile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />
          <Route
            path="/databaseTest"
            element={
              <ProtectedRoute>
                <DatabaseManTester />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-term-glossary"
            element={
              <ProtectedRoute>
                <AIGlossary />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
