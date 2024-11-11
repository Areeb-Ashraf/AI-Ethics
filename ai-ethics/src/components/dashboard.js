import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import beginner from "./images/beginner.svg";
import statxpbadge from "./images/statxpbadge.svg";
import { BiTask } from "react-icons/bi";
import databaseManager from "../databaseManager";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ModuleBadge from "../styles/Badges/ModuleBadge.svg";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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

const milestones = [
  { xp: 0, label: "Novice" },
  { xp: 50, label: "Ethics Explorer" },
  { xp: 100, label: "AI Learner" },
  { xp: 150, label: "Moral Thinker" },
  { xp: 250, label: "Ethics Analyst" },
  { xp: 350, label: "AI Scholar" },
  { xp: 500, label: "Virtue Advocate" },
  { xp: 650, label: "AI Specialist" },
  { xp: 800, label: "Guardian of Ethics" },
  { xp: 1000, label: "Master of Integrity" },
  { xp: 3000, label: "Completionist" },
];

const Dashboard = () => {
  const [modulesProgress, setModulesProgress] = useState(0); // Indicates what % of modules has been completed from total modules
  // const [currentXPPercent, setCurrentXPPercent] = useState(0); // COde for this already in Profile.js Use that to get this data
  const [userProfile, setUserProfile] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [currentXP, setCurrentXP] = useState(0);
  const [lastThreeCompleted, setLastThreeCompleted] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const navigate = useNavigate();

  function toModules(path) {
    navigate(path);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setModulesProgress(50); // needs to come from backend, Indicates what % of modules has been completed from total modules
  //     // setCurrentXPPercent(50); //refer profile.js and change accordingly. The Next Milestone progressbar is exactly ass how it is in profile. Use that code to do the same here. Setting static values only for now. EVEN the milestone names have to change.
  //   });
  // }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (user) {
          const profile = await databaseManager.fetchUserProfile(user.uid);
          setCurrentXP((await databaseManager.fetchXPforUser(user.uid)) || 0);
          if (profile) {
            setUserProfile(profile);
            calculateModuleProgress(profile);
            populateCompletedThings(profile);
          } else {
            console.error("Error fetching profile: Profile is null");
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, [user]);

  // doing this verbosely so that it is obvious what the logic is...
  function calculateModuleProgress(profile) {
    let numModules = 9;
    let numCompletedLessons = profile.completedLessons.length;
    let LmodulesProgress = (numCompletedLessons / numModules) * 100;
    LmodulesProgress = Math.round(LmodulesProgress);
    setModulesProgress(LmodulesProgress);
  }

  async function populateCompletedThings(profile) {
    // Example array of completed modules, needed to display last 3 complete things in dasboard
    // const completedThings = [
    //   "Lesson 1",
    //   "Quiz 1",
    //   "Lesson 2",
    //   "Quiz 2",
    //   "Lesson 3",
    //   "Quiz 3",
    //   "Lesson 4",
    // ];
    let completedThings = [];
    let threeCompletedQuizzes = [];

    // this is very very poor design, but we are going to have to live with it for now
    // would require rewriting large parts of the codebase to make it better
    let completedLessons = profile.completedLessons;

    let LcompletedQuizzes = await databaseManager.fetchScoresByUserID(user.uid);
    /*
    TODO:
    working with emmanuel to change how the timestamp is stored in the database
    will very likely need to rework this to accomadate the new timestamp format, esspecially if we are
      keeping the old entries as well
    */
    LcompletedQuizzes.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    for (let i = 0; i < 3; i++) {
      let quiz = LcompletedQuizzes[i];
      threeCompletedQuizzes.push(
        quiz.quizID + " Quiz\n" + quiz.accuracy + "% " + quiz.duration + "s"
      );
    }
    console.log(threeCompletedQuizzes);
    setCompletedQuizzes(threeCompletedQuizzes);

    // Get the last 3 completed lessons
    // given how we add lessons as completed in the db this should be the last 3 completed lessons
    const LlastThreeCompleted = completedLessons.slice(-3);

    setLastThreeCompleted(LlastThreeCompleted);
  }

  // Find the current and next milestones
  const currentMilestone = milestones
    .slice()
    .reverse()
    .find((milestone) => currentXP >= milestone.xp);
  const nextMilestone =
    milestones.find((milestone) => milestone.xp > currentXP) ||
    currentMilestone;

  // Calculate progress percentage between milestones
  const progressRange = nextMilestone.xp - currentMilestone.xp;
  const progressPercent =
    currentXP == 3000
      ? "100"
      : ((currentXP - currentMilestone.xp) / progressRange) * 100;

  const notCompletedThings = [
    "Lesson 5",
    "Quiz 5",
    "Lesson 6",
    "Quiz 6",
    "Lesson 7",
  ];

  const next2tasks = notCompletedThings.slice(0, 2);

  return (
    <>
      <div className="db-container">
        <div className="db-left">
          <div className="left-inner">
            <h1>Dashboard</h1>
            <div className="db-text-container">
              <div className="db-user-name">
                Hey{" "}
                {userProfile.username ? userProfile.username : userProfile.name}
                ! <div className="hand">👋</div>
              </div>
              Let's get back to learning
            </div>
            <h4>Course Progress</h4>
            <div className="course-prog-container">
              <div className="prog-upper">
                <div>
                  <div className="db-course-name">
                    AI Ethics Course <span className="beginner">Beginner</span>
                  </div>
                  <div className="db-course-name-subtext">
                    9 Modules | 9 Quizzes | 10 Hours
                  </div>
                  {/* TODO once the mid-module progress is implemented*/}
                  <button
                    className="resume-btn"
                    onClick={() => {
                      toModules("/modules");
                    }}
                  >
                    Resume
                  </button>{" "}
                </div>
                <div className="db-img">
                  <img src={beginner} alt="randon-img" />
                </div>
              </div>
              <div className="prog-bottom">
                <div
                  className="prog-black"
                  style={{ width: `${modulesProgress}%` }}
                >
                  <div className="prog-cont-percent">{modulesProgress}%</div>
                </div>
              </div>
            </div>
            {/* TODO for the upcoming tasks, maybe the soonest module that has no completed lessons and the soonest not taken quiz?*/}
            {/* so, have a for loop over all the users completed lessons, find the soonest incomplete*/}
            {/* and then have a for loop over all the quizzes, find the soonest not taken quiz*/}
            {/* and then display those two */}
            <h4></h4>
            {/* <div className="upcoming-task-container">
              {next2tasks.map((task, index) => (
                <div
                  key={index}
                  className="task-box"
                  style={{
                    animation: `fadeInLeft 0.5s ease-in-out 0.${index}s forwards`,
                  }}
                >
                  <div className="task-box-icon">
                    <BiTask />
                  </div>
                  <div className="task-box-name">{task}</div>
                  <div className="gtsymb">&gt;</div>
                </div>
              ))}
            </div> */}
            <div className="statxp-contaner">
              <div className="statbadge-container">
                <img src={statxpbadge} alt="statxpbadge-img" />
              </div>
              <div className="stat-xp">
                <div className="state-user-xp">{currentXP}</div>
                <div>points</div>
              </div>
            </div>
          </div>
        </div>
        <div className="db-right">
          <div className="right-inner">
            <h4>Next Milestone</h4>
            {/* <div className="next-milestone-container">
              <div className="db-progress-current-milestone">
                Virtue Advocate
              </div>
              <div className="db-milestone-progressbar-container">
                575/650 XP
                <div className="db-milestone-progress-bar">
                  <div
                    className="db-milestone-progress"
                    style={{ width: `${currentXPPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="db-progress-next-milestone">AI Specialist</div>
            </div> */}
            <div className="next-milestone-container">
              <div className="db-progress-current-milestone">
                {currentMilestone.label}
              </div>
              <div className="db-milestone-progressbar-container">
                {currentXP}/{nextMilestone.xp} XP
                <div className="db-milestone-progress-bar">
                  <div
                    className="db-milestone-progress"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="db-progress-next-milestone">
                {nextMilestone.label}
              </div>
            </div>

            {/* <h4>Statistic </h4> */}
            <div className="statistic-container">
              {/* <div className="stat-upper">
                <div className="statxp-contaner">
                  <div className="statbadge-container">
                    <img src={statxpbadge} alt="statxpbadge-img" />
                  </div>
                  <div className="stat-xp">
                    <div className="state-user-xp">{currentXP}</div>
                    <div>points</div>
                  </div>
                </div>

                <div className="stat-module-semicircle-prog-container">
                  Recent Quizzes{" "}
                  TODO I think this should be the latest module they have progress for, and then the ratio for it
                  I think that we might need a constanst file, that has values for how many pages are in all of the modules...
                  <div className="semi-prog">
                    <div class="barOverflow">
                      <div class="bar"></div>
                    </div>
                    <span>80</span>%
                  </div>
                </div>
              </div> */}
              {/* TODO is there a way to repurpose this?*/}

              <h4>Recent Lessons</h4>
              <div className="recently-finished-container">
                {lastThreeCompleted.map((module, index) => (
                  <div
                    key={index}
                    className="quiz-card-container"
                    style={{
                      animation: `fadeInLeft 0.5s ease-in-out 0.${index}s forwards`,
                    }}
                  >
                    <div className="quiz-upper">
                      <div className="quiz-num">
                        {module} <div className="check-mark">&#10003;</div>
                      </div>
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

              <h4>Recent Quizzes</h4>
              <div className="recently-finished-container">
                {completedQuizzes.map((module, index) => (
                  <div
                    key={index}
                    className="quiz-card-container"
                    style={{
                      animation: `fadeInLeft 0.5s ease-in-out 0.${index}s forwards`,
                    }}
                  >
                    <div className="quiz-upper">
                      <div className="quiz-num">
                        {module} <div className="check-mark">&#10003;</div>
                      </div>
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
