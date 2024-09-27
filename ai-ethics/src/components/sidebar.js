import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/sidebar.css";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { authManager } from '../firebase'; // Adjust the path as needed

// Sidebar items data
const SidebarData = [
  {
    title: "Explore",
    path: "/explore",
    icon: <FaIcons.FaSearch />,
  },
  {
    title: "Lessons",
    path: "/lessons",
    icon: <IoIcons.IoMdBook />,
  },
  {
    title: "Linked Content",
    path: "/linked-content",
    icon: <FaIcons.FaLink />,
  },
  {
    title: "AI Term Glossary",
    path: "/ai-term-glossary",
    icon: <FaIcons.FaBook />,
  },
  {
    title: "Quizzes",
    path: "/quizzes",
    icon: <IoIcons.IoMdSchool />,
  },
  {
    title: "Leaderboard",
    path: "/leaderboard",
    icon: <FaIcons.FaTrophy />,
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen, setIsLoggedIn }) { // Add setIsLoggedIn as a prop
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  const handleLinkClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await authManager.logout(); // Call the logout function
    setIsLoggedIn(false); // Update login state
    navigate("/"); // Redirect to the LoginForm page
  };

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <div className="navbar">
        <NavLink to="#" className="toggle-icons">
          <FaIcons.FaBars className='contactIcon' onClick={toggleSidebar} />
        </NavLink>
        <div className={sidebarOpen ? "search-bar expanded" : "search-bar"}>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      <nav className={sidebarOpen ? "sidebar-container active" : "sidebar-container"}>
        <ul className="sidebar-items">
          <li className="sidebar-header">
            <NavLink to="/" onClick={handleLinkClick}>
              <h1>✨ Ai Ethics</h1>
            </NavLink>
            <NavLink to="#" className="toggle-icons" onClick={toggleSidebar}>
              <AiIcons.AiOutlineClose className='contactIcon'/>
            </NavLink>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className="sidebar-text">
              <NavLink to={item.path} onClick={handleLinkClick}>
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
          <li className="sidebar-text">
            <button onClick={handleLogout} className="logout-button">Logout</button> {/* Add a logout button */}
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;
