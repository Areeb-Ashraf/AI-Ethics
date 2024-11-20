import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import databaseManager from "./databaseManager";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Cookies from "js-cookie";
import AddQuestions from "./firebaseAddBatchScript";
import { setLogLevel } from "firebase/firestore";
import GlossaryTooltip from "./components/GlossaryTooltip";
setLogLevel("debug");

function DatabaseManTester() {
  // function that console fetches then logs the glossary word
  async function fetchGlossary(word) {
    const glossaryWord = await databaseManager.fetchGlossary(word);
    console.log(glossaryWord);
    return glossaryWord;
  }

  // function that fetches then logs all score entries by quiz ID
  async function fetchScoresByQuizID(quizID) {
    const score = await databaseManager.fetchScoresByQuizID(quizID);
    console.log(score);
  }

  // function that fetches then logs all score entries by user ID
  async function fetchScoresByUserID(userID) {
    const score = await databaseManager.fetchScoresByUserID(userID);
    console.log(score);
  }

  // function that fetches then logs a user's profile
  async function fetchUserProfile(userID) {
    const user = auth.currentUser;
    if (user) {
      userID = user.uid;
    }

    const userProfile = await databaseManager.fetchUserProfile(userID);
    console.log(userProfile);
  }

  // function that logs the uid of the currently logged in user
  function fetchCurrentUser() {
    console.log(databaseManager.getCurrentUserId());
  }

  // function that fetches then logs all words from the glossary
  async function fetchAllWords() {
    const allWords = await databaseManager.fetchAllGlossary();
    console.log(allWords);
  }

  // function that fetches xp for a user
  async function fetchXP(userID) {
    const xp = await databaseManager.fetchXPforUser(userID);
    console.log(xp);
  }

  // function that fetches leaderboard data
  async function fetchLeaderboard() {
    const leaderboard = await databaseManager.fetchLeaderboardData();
    console.log(leaderboard);
  }

  // fetches and logs the users completed quizzes and lessons
  async function fetchUsersProgress() {
    const completedQuizzesAndLessons =
      await databaseManager.fetchUsersProgress();
    console.log(completedQuizzesAndLessons);
  }

  // // function that adds a mid-module progress update to the database
  // async function addMidModule() {
  //   databaseManager.updateLessonProgress("b.1");
  // }

  // // gets mid-modules progressess
  // async function getMidModule() {
  //   const progress = await databaseManager.getLessonProgress();
  //   console.log(progress);
  // }

  // const Tooltip = () => {
  //   const [definition, setDefinition] = useState("Loading...");

  //   useEffect(() => {
  //     // Fetch the definition of "A.I." when the component mounts
  //     fetchGlossary("A.I.")
  //       .then((result) => {
  //         if (result && result.description) {
  //           setDefinition(result.description); // Safely access the description
  //         } else {
  //           setDefinition("No definition found."); // Handle case where no result is found
  //         }
  //       })
  //       .catch((error) => {
  //         setDefinition("Error loading definition."); // Handle any errors
  //       });
  //   }, []);

  //   return (
  //     <Popup
  //       trigger={(open) => (
  //         <button
  //           style={{
  //             background: "none",
  //             border: "none",
  //             color: "blue",
  //             cursor: "pointer",
  //             textDecoration: "underline",
  //             padding: 0,
  //           }}
  //         >
  //           A.I. Definition{" "}
  //         </button>
  //       )}
  //       position="right center"
  //       closeOnDocumentClick
  //     >
  //       <span>{definition}</span>{" "}
  //       {/* This will display the fetched definition */}
  //     </Popup>
  //   );
  // };

  return (
    <div>
      <div
        style={{
          height: "100px",
          width: "100%",
          backgroundColor: "transparent",
        }}
      ></div>
      <GlossaryTooltip glossaryWord="API" />
      <GlossaryTooltip glossaryWord="Chatbot" />
      <GlossaryTooltip glossaryWord="Spooge" />
      <button onClick={() => fetchGlossary("API")}>
        Click me to retrieve "API" glossary word
      </button>
      <button onClick={() => fetchScoresByQuizID("Module1")}>
        Click me to retrieve scores by quiz ID Module1
      </button>
      <button
        onClick={() => fetchScoresByUserID("ygQVXEi2YLRXDP4elYPCNdKHGWj2")}
      >
        Click me to retrieve score by user ID ygQVXEi2YLRXDP4elYPCNdKHGWj2
      </button>
      <button onClick={() => fetchUserProfile("baz")}>
        Click me to retrieve user profile by user ID or logged in User (if you
        are logged in it will retrieve your profile)
      </button>
      <button onClick={fetchCurrentUser}>
        Click me to retrieve the current user's UID (if no user is logged in it
        will throw an error)
      </button>
      <button onClick={fetchAllWords}>
        Click me to retrieve all words from the glossary
      </button>
      <br />
      <button onClick={() => fetchXP("ygQVXEi2YLRXDP4elYPCNdKHGWj2")}>
        Click me to retrieve XP by user ID ygQVXEi2YLRXDP4elYPCNdKHGWj2
      </button>
      <button onClick={fetchLeaderboard}>
        Click me to retrieve leaderboard data
      </button>
      <button onClick={fetchUsersProgress}>
        Click me to print the users completed quizzes and lessons
      </button>
      {/* <button onClick={addMidModule}>
        Click me to add a mid-module progress update to the database
      </button>
      <button onClick={getMidModule}>
        Click me to get mid-module progress updates
      </button> */}

      <ResetAllCookies />
      <AddQuestions />
    </div>
  );
}

const ResetAllCookies = () => {
  const resetAllCookies = () => {
    // Get all cookies
    const allCookies = Cookies.get();

    // Loop through each cookie and remove it
    for (let cookie in allCookies) {
      Cookies.remove(cookie);
    }

    alert("All cookies have been reset.");
  };

  return (
    <div>
      <button onClick={resetAllCookies} className="reset-all-cookies-button">
        Reset All Cookies
      </button>
    </div>
  );
};

export default DatabaseManTester;
