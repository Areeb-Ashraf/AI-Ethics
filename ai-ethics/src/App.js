import "./App.css";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Sidebar from "./components/sidebar";
import AIGlossary from "./aiGlossary";
// import Homepage from "./components/homepage";
import UserProfile from "./UserProfile";
import LoginForm from "./components/login";
import Signup from "./components/signup";
import { auth } from "./firebase";
import Lessons from "./components/lessons";
import Welcome from "./components/welcome";
import Help from "./components/help";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";
import ResetPassword from "./components/ResetPassword";

const Leaderboard = lazy(() => import("./components/leaderboard"));
const DatabaseManTester = lazy(() => import("./DatabaseManTester"));

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
            element={isLoggedIn ? <Navigate to="/homepage" replace /> : <Welcome />}
          />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/databaseTest" element={<DatabaseManTester />} />
          <Route path="/reset-password" element={<ResetPassword />} />

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
                <Suspense fallback={<div>Loading...</div>}>
                  <Leaderboard />
                </Suspense>
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
                <Suspense fallback={<div>Loading...</div>}>
                  <DatabaseManTester />
                </Suspense>
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
