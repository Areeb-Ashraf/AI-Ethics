import React from 'react'
import '../styles/dashboard.css'
import beginner from './images/beginner.svg'
import statxpbadge from './images/statxpbadge.svg'

const Dashboard = () => {
  return (
    <>
      <div className="db-container">
        <div className="db-left">
          <div className="left-inner">
            <h1>Dashboard</h1>
            <div className="db-text-container">
              <div className="db-user-name">Hey Oliver!👋</div>
               Let's get back to learning
            </div>
            <h4>Course Progress</h4>
            <div className="course-prog-container">
              <div className="prog-upper">
                <div>
                  <div className="db-course-name">AI Ethics Course <span className="beginner">Beginner</span></div>
                  <div className="db-course-name-subtext">5 Mosules | 5 Quizzes | 10 Hours</div>
                  <button className="resume-btn">Resume</button>
                </div>
                <div className="db-img">
                <img src={beginner} alt="randon-img" />
                </div>
              </div>
              <div className="prog-bottom">
                <div className="prog-black"><span className="prog-cont-percent">50%</span></div>
              </div>
              
            </div>
            <h4>Recently Finished</h4>
            <div className="recently-finished-container">
            <div className="quiz-card-container">
              <div className="quiz-upper">
                <div className="quiz-num">Quiz 1</div>
                <div className="quiz-course-name">AI Ethics Course</div>
              </div>
              <div className="quiz-lower">
                <div className="quiz-prog"><span className="quiz-prog-percent">100%</span></div>
              </div>
            </div>
            <div className="quiz-card-container"></div>
            <div className="quiz-card-container"></div>

            </div>

          </div>
          
        </div>
        <div className="db-right">
          <div className="right-inner">
            <h4>Next Milestone</h4>
            <div className="next-milestone-container">
              <div className="db-progress-current-milestone">Virtue Advocate</div>
                  <div className="db-milestone-progressbar-container">
                      575/650 XP
                      <div className="db-milestone-progress-bar">
                          <div className="db-milestone-progress"></div>
                      </div> 
                  </div>
                <div className="db-progress-next-milestone">AI Specialist</div>
            </div>

            <h4>Statistic</h4>
            <div className="statistic-container">
              <div className="stat-upper">
                <div className="statxp-contaner">
                  <div className="statbadge-container">
                  <img src={statxpbadge} alt="statxpbadge-img" />
                  </div>
                  <div className="stat-xp">
                    <div className="state-user-xp">500XP</div>
                    <div>points</div>
                  </div>
                </div>
                <div className="stat-module-semicircle-prog-container">
                  Module 4
                  <div className="semi-prog">
                    <div class="barOverflow">
                      <div class="bar"></div>
                    </div>
                    <span>80</span>%
                  </div>
                </div>
              </div>
              <div className="stat-lower">
                <div className='stat-time-left'>10 min left today!</div>
                <div className="stat-lower-prog-container-bar">
                  <div className="stat-lower-prog"><span className="stat-lower-prog-text">15/30</span></div>
                </div>
              </div>
            </div>

            <h4>Upcoming Tasks</h4>
            <div className="upcoming-task-container">
              <div className="task-box">
                <div className="task-box-icon"></div>
                <div className="task-box-name">AI Security Article</div>
                <div className="gtsymb">&gt;</div>
              </div>
              <div className="task-box">
                <div className="task-box-icon"></div>
                <div className="task-box-name">Module 4 Quiz</div>
                <div className="gtsymb">&gt;</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
