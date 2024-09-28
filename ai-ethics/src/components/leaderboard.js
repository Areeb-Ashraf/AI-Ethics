import React from 'react';
import '../styles/leaderboard.css';

const Leaderboard = () => {
    return (
        <div className="leaderboard-container">
            <h1>Leaderboard</h1>
        <div className="leaderboard-list-container">
            {/* Top 3 container */}
            <div className="top3-container">
                <div className="rank-container" id="rank-2-container">
                    <div className="rank-icon"></div>
                    <div className="rank-name">Oliver Q.</div>
                    <div className="rank-score">250 XP</div>
                    <div className="rank-platform-top"></div>
                    <div className="rank-platform-body">2</div>
                </div>
                <div className="rank-container" id="rank-1-container">
                    <div className="rank-icon"></div>
                    <div className="rank-name">John M.</div>
                    <div className="rank-score">300 XP</div>
                    <div className="rank-platform-top"></div>
                    <div className="rank-platform-body">1</div>
                </div>
                <div className="rank-container" id="rank-3-container">
                    <div className="rank-icon"></div>
                    <div className="rank-name">James H.</div>
                    <div className="rank-score">200 XP</div>
                    <div className="rank-platform-top"></div>
                    <div className="rank-platform-body">3</div>
                </div>
            </div>

            {/* List container */}
            <div className="list-container">
                <div className="list-box">
                    <div className="list-rank">4</div>
                    <div className="list-name">Maddy L.</div>
                    <div className="list-score">150 XP</div>
                </div>
                <div className="list-box">
                    <div className="list-rank">5</div>
                    <div className="list-name">Emily H.</div>
                    <div className="list-score">100 XP</div>
                </div>
                <div className="list-box">
                    <div className="list-rank">6</div>
                    <div className="list-name">Mary Q.</div>
                    <div className="list-score">95 XP</div>
                </div>
                <div className="list-box">
                    <div className="list-rank">7</div>
                    <div className="list-name">Brandon V.</div>
                    <div className="list-score">90 XP</div>
                </div>
                <div className="list-box">
                    <div className="list-rank">8</div>
                    <div className="list-name">Lewis T.</div>
                    <div className="list-score">85 XP</div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Leaderboard;
