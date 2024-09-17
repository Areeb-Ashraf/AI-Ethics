// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">

      <NavLink 
        to="/" 
        className="sidebar-link" 
        activeClassName="active"
      >
        <div className="sidebar-head">✨AI Ethics</div>
      </NavLink>

      <NavLink 
        to="/explore" 
        className="sidebar-link" 
        activeClassName="active"
      >
        <div className="sidebar-item">Explore</div>
      </NavLink>

      <div className="sub-heading">Learn<hr /></div>

      <NavLink 
        to="/lessons" 
        className="sidebar-link" 
        activeClassName="active"
      >
        <div className="sidebar-item">Lessons</div>
      </NavLink>

      <NavLink 
        to="/linked-content" 
        className="sidebar-link" 
        activeClassName="active"
      >
        <div className="sidebar-item">Linked Content</div>
      </NavLink>

      <NavLink 
        to="/ai-term-glossary" 
        className="sidebar-link" 
        activeClassName="active"
      >
        <div className="sidebar-item">AI Term Glossary</div>
      </NavLink>

      <div className="sub-heading">Grow<hr /></div>

      <NavLink 
        to="/quizzes" 
        className="sidebar-link" 
        activeClassName="active"
      >
        <div className="sidebar-item">Quizzes</div>
      </NavLink>

      <NavLink 
        to="/leaderboard" 
        className="sidebar-link" 
        activeClassName="active"
      >
        <div className="sidebar-item">Leaderboard</div>
      </NavLink>
    </div>
  );
}

export default Sidebar;
