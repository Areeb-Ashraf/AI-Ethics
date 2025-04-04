import React, { useState } from "react";
import "../styles/leaderboard.css";
import databaseManager from "../databaseManager";

// probably want to put this is a use effect so that it doesn't call the db a bajillion times everytime the user changes the page
// they are on or refreshes the page from anywhere
const leaderboardData = await databaseManager.fetchLeaderboardData();

const Leaderboard = () => {
  // Sort the data based on score in descending order
  const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
  const top3 = [sortedData[1], sortedData[0], sortedData[2]]; // Swap rank 1 and 2 to display in correct containers
  const rest = sortedData.slice(3);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter players based on the search query
  const filteredPlayers = rest.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <div className="rank-icon profile-picture-2">
                <img src={player.img} alt="" />
              </div>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="list-items-container">
            {filteredPlayers.map((player, index) => (
              <div key={index} className="list-box">
                <div className="list-rank">{sortedData.findIndex(p => p.name === player.name) + 1}</div>
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
