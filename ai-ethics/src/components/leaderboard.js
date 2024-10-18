import React from 'react';
import '../styles/leaderboard.css';

const leaderboardData = [
    { name: 'John M.', score: 300 },
    { name: 'Oliver Q.', score: 250 },
    { name: 'James H.', score: 200 },
    { name: 'Maddy L.', score: 150 },
    { name: 'Emily H.', score: 100 },
    { name: 'Mary Q.', score: 95 },
    { name: 'Brandon V.', score: 90 },
    { name: 'Lewis T.', score: 85 },
    { name: 'Jamie O.', score: 80 },
    { name: 'Tiffany R.', score: 85 },
];

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
                        <div className="rank-platform-top"></div>
                        <div className="rank-platform-body">{index === 0 ? 2 : index === 1 ? 1 : 3}</div> {/* // Makes sure number is correct */}
                    </div>
                ))}
            </div>

            {/* List container */}
            <div className="list-container">
                <input className="list-container-search" type="text" placeholder='&#x1F50E;&#xFE0E; Search rank'/>
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
    );
};

export default Leaderboard;
