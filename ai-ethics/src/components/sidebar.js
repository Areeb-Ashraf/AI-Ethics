import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/sidebar.css";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

const SidebarData = [
  {
    title: 'Explore',
    path: '/explore',
    icon: <FaIcons.FaSearch />,
  },
  {
    title: 'Lessons',
    path: '/lessons',
    icon: <IoIcons.IoMdBook />,
  },
  {
    title: 'Linked Content',
    path: '/linked-content',
    icon: <FaIcons.FaLink />,
  },
  {
    title: 'AI Term Glossary',
    path: '/ai-term-glossary',
    icon: <FaIcons.FaBook />,
  },
  {
    title: 'Quizzes',
    path: '/quizzes',
    icon: <IoIcons.IoMdSchool />,
  },
  {
    title: 'Leaderboard',
    path: '/leaderboard',
    icon: <FaIcons.FaTrophy />,
  }
];

function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebar(false);
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff', className: "contactIcon" }}>
        <div className='navbar'>
          <NavLink to='#' className='toggle-icons'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavLink>
        </div>
        <nav className={sidebar ? 'sidebar-container active' : 'sidebar-container'}>
          <ul className='sidebar-items'>
            <li className='sidebar-header'>
              <NavLink to="/" onClick={handleLinkClick}> <h1>✨AI Ethics</h1> </NavLink>
              <NavLink to='#' className='toggle-icons' onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </NavLink>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className='sidebar-text'>
                <NavLink 
                  to={item.path} 
                  activeClassName="active" 
                  onClick={handleLinkClick}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
