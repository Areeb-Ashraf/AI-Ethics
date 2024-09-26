import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';
import { GiSpiderMask } from 'react-icons/gi';

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* Main heading */}
      <h1 className="homepage-heading">Learn AI Ethics the Engaging Way</h1>

      {/* Subheading */}
      <p className="homepage-subheading">
        AI is transforming our world, but with great power comes great responsibility 
        <span className="spiderman-icon"><GiSpiderMask /></span>{/* Spiderman icon */}
        . Our interactive course helps you understand the ethical challenges and
        solutions surrounding artificial intelligence.
      </p>

      {/* Key benefits section */}
      <div className="benefits-container">
        <div className="benefit">
          <h3>Interactive Lessons</h3>
          <p>Engage with real-world scenarios and understand how AI impacts society through quizzes and simulations.</p>
        </div>
        <div className="benefit">
          <h3>Ethical Principles</h3>
          <p>Learn about fairness, accountability, transparency, and other key AI ethics concepts.</p>
        </div>
        <div className="benefit">
          <h3>Practical Guidance</h3>
          <p>Understand how to apply ethical frameworks to your AI projects, and become a responsible innovator.</p>
        </div>
      </div>

      {/* Call to action */}
      <Link to="#" className="cta-button">
        Start the Course
      </Link>
    </div>
  );
};

export default Homepage;
