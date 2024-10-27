import React from "react";
import "../styles/leaderboard.css";
import databaseManager from "../databaseManager";

/*
Notes For Backend

fetching `leaderboardData` works great.

but as you can tell longer names does not look good on the design. Working around the design to acommodate longer names is also going to be ugly

We need to display a name of 7 or 8 charecters only. There are 3 ways to do this

1) Display only the first 7 or 8 charecters of the users first/last/full name regardless of the length of the name and ignore the rest when displaying
2) Limit the user to only inputing 7 or 8 charecters to their first/last/full name while registering
3) Have them create a seperate "username"/"display name" with a limitation of 7 or 8 charecters only

Need to decide and make the necessary changes

*/ 

// probably want to put this is a use effect so that it doesn't call the db a bajillion times everytime the user changes the page
// they are on or refreshes the page from anywhere
const leaderboardData = await databaseManager.fetchLeaderboardData();

const Leaderboard = () => {
  // Sort the data based on score in descending order
  const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
  const top3 = [sortedData[1], sortedData[0], sortedData[2]]; // Swap rank 1 and 2 to display in correct containers
  const rest = sortedData.slice(3);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="leaderboard-list-container">
        {/* Top 3 container */}
        <div className="top3-container">
          {top3.map((player, index) => (
            <div
              key={index}
              className="rank-container"
              id={`rank-${index === 0 ? 2 : index === 1 ? 1 : 3}-container`} // Makes sure the first one has rank 2 container since it was swapped before
            >
              <div className="rank-icon"></div>
              <div className="rank-name">{player.name}</div>
              <div className="rank-score">{player.score} XP</div>
              <div className="rank-platform">
                <div className="rank-platform-top"></div>
                <div className="rank-platform-body">
                  {index === 0 ? 2 : index === 1 ? 1 : 3}
                </div>{" "}
                {/* // Makes sure number is correct */}
              </div>
            </div>
          ))}
        </div>

        {/* List container */}
        <div className="list-container">
          <input
            className="list-container-search"
            type="text"
            placeholder="&#x1F50E;&#xFE0E; Search rank"
          />
          <div className="list-items-container">
            {rest.map((player, index) => (
              <div key={index} className="list-box">
                <div className="list-rank">{index + 4}</div>
                <div className="list-name">{player.name}</div>
                <div className="list-score">{player.score} XP</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
