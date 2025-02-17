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
import DashboardTour from "./tours/DashboardTour";

function calculateQuizScore(duration, accuracy) {
  return Math.round(Math.min((90 / duration) * 100, 100) + accuracy);
}

const milestones = [
  { xp: 0, label: "Novice" },
  { xp: 100, label: "Ethics Explorer" }, // +100
  { xp: 200, label: "AI Learner" }, // +100
  { xp: 350, label: "Moral Thinker" }, // +150
  { xp: 500, label: "Ethics Analyst" }, // +150
  { xp: 750, label: "AI Scholar" }, // +250
  { xp: 1000, label: "AI Specialist" }, // +250
  { xp: 1300, label: "Guardian of Ethics" }, // +300
  { xp: 1600, label: "Master of Integrity" }, // +300
  { xp: 2000, label: "Completionist" }, // +400
  { xp: 2400, label: "Perfectionist" }, // +400
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
            populateCompletedThings(profile);
            // calculateModuleProgress(profile);
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

    await calculateModuleProgress(profile, LcompletedQuizzes);

    /*
    TODO:
    working with emmanuel to change how the timestamp is stored in the database
    will very likely need to rework this to accomadate the new timestamp format, esspecially if we are
      keeping the old entries as well
    */
    // console.log("pre sort: ", LcompletedQuizzes);

    LcompletedQuizzes.sort((a, b) => {
      let dateA = a.timestamp instanceof Timestamp ? a.timestamp.toDate() : new Date(a.timestamp);
      let dateB = b.timestamp instanceof Timestamp ? b.timestamp.toDate() : new Date(b.timestamp);

      if (isNaN(dateA)) return 1; // `a` is invalid, place after `b`
      if (isNaN(dateB)) return -1; // `b` is invalid, place after `a`

      return dateB - dateA;
    });
    // console.log("post sort: ", LcompletedQuizzes);

    let limit = 0;
    if (LcompletedQuizzes.length > 3) {
      limit = 3;
    } else {
      limit = LcompletedQuizzes.length;
    }
    for (let i = 0; i < limit; i++) {
      let quiz = LcompletedQuizzes[i];
      let XP = calculateQuizScore(quiz.duration, quiz.accuracy);
      threeCompletedQuizzes.push(quiz.quizID + " Quiz\n" + XP + " XP\n");
    }
    setCompletedQuizzes(threeCompletedQuizzes);

    // Get the last 3 completed lessons
    // given how we add lessons as completed in the db this should be the last 3 completed lessons
    const LlastThreeCompleted = Array.isArray(completedLessons) ? completedLessons.slice(-3) : [];

    [LlastThreeCompleted[0], LlastThreeCompleted[1], LlastThreeCompleted[2]] = [
      LlastThreeCompleted[2],
      LlastThreeCompleted[1],
      LlastThreeCompleted[0],
    ];

    setLastThreeCompleted(LlastThreeCompleted);
  }

  // doing this verbosely so that it is obvious what the logic is...
  async function calculateModuleProgress(profile, completedQuizzes) {
    let numModules = 18;
    let numCompletedLessons = 0;

    if (profile.completedLessons != null) {
      numCompletedLessons = profile.completedLessons.length;
    }

    // for every unique quiz that has been attempted, add 1 to the number of completed modules
    let quizIDs = new Set();
    completedQuizzes.forEach((quiz) => {
      quizIDs.add(quiz.quizID);
    });
    numCompletedLessons += quizIDs.size;

    let LmodulesProgress = (numCompletedLessons / numModules) * 100;
    LmodulesProgress = Math.round(LmodulesProgress);

    setModulesProgress(LmodulesProgress);
  }

  // Find the current and next milestones
  const currentMilestone = milestones
    .slice()
    .reverse()
    .find((milestone) => currentXP >= milestone.xp);
  const nextMilestone =
    milestones.find((milestone) => milestone.xp > currentXP) || currentMilestone;

  // Calculate progress percentage between milestones
  const progressRange = nextMilestone.xp - currentMilestone.xp;
  const progressPercent =
    currentXP == 3000 ? "100" : ((currentXP - currentMilestone.xp) / progressRange) * 100;

  const notCompletedThings = ["Lesson 5", "Quiz 5", "Lesson 6", "Quiz 6", "Lesson 7"];

  const next2tasks = notCompletedThings.slice(0, 2);

  return (
    <>
      <div className="db-container">
        <div className="db-left">
          <div className="left-inner">
            <h1>Dashboard</h1>
            <div className="db-text-container">
              <div className="db-user-name">
                Hey {userProfile && (userProfile.username || userProfile.name)}!{" "}
                <div className="hand">👋</div>
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
                  <div className="db-course-name-subtext">9 Modules | 9 Quizzes | 10 Hours</div>
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
                <div className="prog-black" style={{ width: `${modulesProgress}%` }}>
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
              <div className="db-progress-current-milestone">{currentMilestone.label}</div>
              <div className="db-milestone-progressbar-container">
                {currentXP}/{nextMilestone.xp} XP
                <div className="db-milestone-progress-bar">
                  <div
                    className="db-milestone-progress"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="db-progress-next-milestone">{nextMilestone.label}</div>
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
                        <span className="quiz-prog-percent"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DashboardTour />
    </>
  );
};

export default Dashboard;
