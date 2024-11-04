import React, { useState, useEffect } from 'react'
import '../styles/dashboard.css'
import beginner from './images/beginner.svg'
import statxpbadge from './images/statxpbadge.svg'
import { BiTask } from "react-icons/bi";

/*
Notes For Backend

*NOTHING on this page is dynamic, everything is static. Going to leave fetching what dat from where to you

The following are the data that is needed:
- the users first/last/full name should go in `db-user-name`
- `db-course-name-subtext` displays the number of modules quizzez and hours, does this need to come from the db? [i dont think it does, needs to be discussed]
- the `resume-btn` need to go to the module the user had last left the course, therefore need which module was last completed
- `prog-black` and `prog-cont-percent` (sorry for the bad name) need to display how many modules out of total modules are completed
- Should the `quiz-card-container`display the last 3 quizzees thatr were completed?  if so we need how many quizzes were completed.
- `db-progress-current-milestone` and `db-progress-next-milestone` are current and next milestones which is based on the useres earned xp, 
so the names might not need to come from the db but we need the users earned xp can calculate what their current and nex milestone is dynamically and disply those 
- the `db-milestone-progressbar-container` has 575/650 XP displaying earnedXP/XP needed for next milestone. Need earned xp from db
- Need to display earned user xp in `state-user-xp`
- The `stat-module-semicircle-prog-container` is displaying what module the user is corrently on and how much of that module is completed. 
Need this dat from db. Going to be a pain to track how much of a module the user has finished. All other progress bars are displayed based on the width percentage of the inner container but this prog bar is determined by rotation, formula can be found in css.
- `stat-time-left` displays goal. Do we need this?
- `upcoming-task-container` displays what the user needs to do next. Need completed module and completed quiz from db for this. One `task-box` for each.


** Apologies for the huge amount of notes, please read through all of these, all of these need to be addressed.


TO DO:
fetch all the relavent data and address the concerns above. How you are getting what data from where is left to you.
Resume button should go to the module the user had last left the course.

To do for Areeb:
Do animations
complete quiz card design and render in loop the the last 3 completed quizzes dynamically
add icons to the task box
*/

const Dashboard = () => {
  const [modulesProgress, setModulesProgress] = useState(0); // Indicates what % of modules has been completed from total modules
  const [currentXPPercent, setCurrentXPPercent] = useState(0); // COde for this already in Profile.js Use that to get this data


  useEffect(() => {
    setTimeout(() => {
      setModulesProgress(50); // needs to come from backend, Indicates what % of modules has been completed from total modules
      setCurrentXPPercent(50); //refer profile.js and change accordingly. The Next Milestone progressbar is exactly ass how it is in profile. Use that code to do the same here. Setting static values only for now. EVEN the milestone names have to change.
    });
  }, []);

   // Example array of completed modules, needed to display last 3 complete things in dasboard
   const completedThings = [
    'Lesson 1', 'Quiz 1', 'Lesson 2', 'Quiz 2', 'Lesson 3', 'Quiz 3', 'Lesson 4'
  ];

  // Get the last 3 completed items
  const lastThreeCompleted = completedThings.slice(-3);

  const notCompletedThings = [
    'Lesson 5', 'Quiz 5', 'Lesson 6', 'Quiz 6', 'Lesson 7'
  ];

  const next2tasks = notCompletedThings.slice(0,2);

  return (
    <>
      <div className="db-container">
        <div className="db-left">
          <div className="left-inner">
            <h1>Dashboard</h1>
            <div className="db-text-container">
              <div className="db-user-name">Hey Oliver! <div className='hand'>👋</div></div>
               Let's get back to learning
            </div>
            <h4>Course Progress</h4>
            <div className="course-prog-container">
              <div className="prog-upper">
                <div>
                  <div className="db-course-name">AI Ethics Course <span className="beginner">Beginner</span></div>
                  <div className="db-course-name-subtext">5 Modules | 5 Quizzes | 10 Hours</div>
                  <button className="resume-btn">Resume</button>
                </div>
                <div className="db-img">
                <img src={beginner} alt="randon-img" />
                </div>
              </div>
              <div className="prog-bottom">
                <div className="prog-black" style={{  width: `${modulesProgress}%` }} ><div className="prog-cont-percent">{modulesProgress}%</div></div>
              </div>
              
            </div>
            <h4>Recently Finished</h4>
            <div className="recently-finished-container">
              {lastThreeCompleted.map((module, index) => (
                <div key={index} className="quiz-card-container" style={{animation: `fadeInLeft 0.5s ease-in-out 0.${index}s forwards`}}>
                  <div className="quiz-upper">
                    <div className="quiz-num">{module} <div className="check-mark">&#10003;</div></div>
                    <div className="quiz-course-name">AI Ethics Course</div>
                  </div>
                  <div className="quiz-lower">
                    <div className="quiz-prog">
                      <span className="quiz-prog-percent">100%</span>
                    </div>
                  </div>
                </div>
              ))}
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
                          <div className="db-milestone-progress" style={{width: `${currentXPPercent}%`}}></div>
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
              {next2tasks.map((task, index) => (
                <div key={index} className="task-box" style={{animation: `fadeInLeft 0.5s ease-in-out 0.${index}s forwards`}}>
                <div className="task-box-icon"><BiTask /></div>
                <div className="task-box-name">{task}</div>
                <div className="gtsymb">&gt;</div>
              </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard