import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/dashboard.css'; // Make sure the path is correct

function Dashboard() {
  const progressPercentage = 40;  // Example progress percentage

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="dashboard-grid">
        
        {/* Left Column */}
        <div className="left-column">
          {/* Greeting Section */}
          <div className="greeting-section">
            <h2 className="greeting-title">Hey Sebastian! 👋</h2>
            <p>Let’s get back to learning.</p>
          </div>

{/* Course Progress - Make it clickable */}
<NavLink to="/lessons" className="course-progress-link">
  <div className="course-progress">
    <h1 className="section-title">Course Progress</h1>
    <div className="progress-card">
      <h3>AI Ethics Course <span className="course-level">Beginner</span></h3>
      <p>25 Lessons | 10 Quizzes | 5 Hours</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        <p>{progressPercentage}100%</p> {/* Fixed this line */}
      </div>
    </div>
  </div>
</NavLink>

          {/* Recently Finished - Each quiz has its own card with percentage */}
          <div className="recent-section">
            <h1 className="section-title">Recently Finished</h1>
            <div className="quiz-cards">
              {/* Quiz 3 */}
              <div className="quiz-card">
                <h3>Quiz 3 ✔️</h3>
                <p>AI Ethics Course</p>
                <div className="quiz-percentage">100%</div>
              </div>

              {/* Quiz 2 */}
              <div className="quiz-card">
                <h3>Quiz 2 ✔️</h3>
                <p>AI Ethics Course</p>
                <div className="quiz-percentage">100%</div>
              </div>

              {/* Quiz 1 */}
              <div className="quiz-card">
                <h3>Quiz 1 ✔️</h3>
                <p>AI Ethics Course</p>
                <div className="quiz-percentage">100%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Next Milestone - No Links Here */}
          <div className="next-milestone">
            <h1 className="section-title">Next Milestone</h1>
            <div className="milestone-bar">
              <div className="milestone-progress" style={{ width: '75%' }}></div>
            </div>
            <p>500/650 XP</p>
          </div>

          {/* Statistics */}
          <div className="stats-section">
            <h1 className="section-title">Statistics</h1> 
            <div className="stat-cards">
              <div className="stat-card">
                <h4>500 XP Points</h4>
              </div>
              <div className="stat-card">
                <h4>Module 1 - What is AI</h4>
              </div>
              <div className="stat-card">
                <h4>1 min left today!</h4>
                <div className="time-progress-bar">
                  <div className="time-progress" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks - No Links Here */}
          <div className="upcoming-tasks">
            <h1 className="section-title">Upcoming Tasks</h1> 
            <div className="task-item">AI Security Article</div>
            <div className="task-item">Module 4 Quiz</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
