import React from "react";
import { authManager } from "./firebase";
import databaseManager from "./databaseManager";

function DatabaseManTester() {
  // function that console fetches then logs the glossary word
  async function fetchGlossary(word) {
    const glossaryWord = await databaseManager.fetchGlossary(word);
    console.log(glossaryWord);
  }

  // function that fetches then logs all leaderboard entries by quiz ID
  async function fetchLeaderboardByQuizID(quizID) {
    const leaderboard = await databaseManager.fetchLeaderboardByQuizID(quizID);
    console.log(leaderboard);
  }

  // function that fetches then logs all leaderboard entries by user ID
  async function fetchLeaderboardByUserID(userID) {
    const leaderboard = await databaseManager.fetchLeaderboardByUserID(userID);
    console.log(leaderboard);
  }

  return (
    <div>
      <button onClick={() => fetchGlossary("LLM")}>
        Click me to retrieve "LLM" glossary word
      </button>
      <button onClick={() => fetchLeaderboardByQuizID("foo")}>
        Click me to retrieve leaderboard by quiz ID foo
      </button>
      <button onClick={() => fetchLeaderboardByUserID("bar")}>
        Click me to retrieve leaderboard by user ID bar
      </button>
    </div>
  );
}

export default DatabaseManTester;
