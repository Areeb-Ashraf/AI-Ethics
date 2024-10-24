import React from 'react'
import '../styles/profile.css';
import ModuleBadge from '../styles/Badges/ModuleBadge.svg'
import XPBadge from '../styles/Badges/XPBadge.svg'
import EthicBot from '../styles/Badges/EthicBot.svg'
import VirtueBot from '../styles/Badges/VirtueBot.svg'
import JusticeBot from '../styles/Badges/JusticeBot.svg'

const milestones = [
    { xp: 0, label: 'Novice' },
    { xp: 50, label: 'Ethics Explorer' },
    { xp: 100, label: 'AI Learner' },
    { xp: 150, label: 'Moral Thinker' },
    { xp: 250, label: 'Ethics Analyst' },
    { xp: 350, label: 'AI Scholar' },
    { xp: 500, label: 'Virtue Advocate' },
    { xp: 650, label: 'AI Specialist' },
    { xp: 800, label: 'Guardian of Ethics' },
    { xp: 1000, label: 'Master of Integrity' },
  ];
  
  const currentXP = 575; // Replace this later with dynamic value

const Profile = () => {
      const progressPercentage = (currentXP / 1000) * 100;
      const totalModules = 10;
      const completedModules = 3; // This value can come from your backend or state to reflect the user's progress
      const modules = Array.from({ length: totalModules }, (_, i) => i + 1);
      const completedXPS = 575;
      const xps = [5, 10, 50, 100, 200, 500, 1000];
  return (
    <>
      <div className="profile-container">
      <h1>Profile</h1>
        <div className="profile-upper-containers">
            <div className="profile-info-container">
                <div className="profile-info-user">
                    <div className="profile-picture"></div>
                    <div className="username-container">
                        <div className="username">Oliver Q.</div>
                        <div className="current-milestone">Virtue Advocate</div>
                    </div>
                    <div className="userxp">
                        <div className="xp">500 XP</div>
                        points
                    </div>
                </div>
                <div className="profile-info-progress">
                    <div className="progress-current-milestone">Virtue Advocate</div>
                    <div className="milestone-progressbar-container">
                        575/650 XP
                        <div className="milestone-progress-bar">
                            <div className="milestone-progress"></div>
                        </div> 
                    </div>
                    <div className="progress-next-milestone">AI Specialist</div>
                </div>
            </div>
            <div className="ethical-evolution-container">
                <div className="ethical-eval-title">Your Ethical Evaluation</div>
                <div className="ethic-card-container">
                    <div className="ethic-card">
                        <div className="ethic-card-xp"></div>
                        <div className="ethic-card-circle"></div>
                        <div className="ethic-card-name"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="profile-lower-containers">
            <div className="account-details-container">
                <div className="account-header">Account Details <button className="edit-profile">Edit Profile</button></div>
                <div className="account-display">
                    <label className='account-label'>
                        First name:
                        <input type="text" required minLength="1" maxLength="18" name="fname" value={"Oliver"}/>
                    </label>
                    <label className='account-label'>
                        Last name:
                        <input type="text" required minLength="1" maxLength="18" name="fname" value={"Quinn"}/>
                    </label>
                </div>
                <div className="account-display">
                    <label className='account-label'>
                        Username:
                        <input type="text" required minLength="1" maxLength="18" name="fname" value={"@oliverquinn"} />
                    </label>
                    <label className='account-label'>
                        Password:
                        <input type="password" required minLength="1" maxLength="18" name="fname" value={"@oliverquinn"}/>
                    </label>
                </div>
                <div className="account-display">
                    <label className='account-label'>
                        Email:
                        <input id="account-email" type="text" required minLength="1" maxLength="180" name="fname" value={"oliverquinn@gmail.com"}/>
                    </label>
                </div>
                <div className="account-display gender-radio">
                    <div className="account-display-gender">Gender:</div>
                    <div className="labels">
                        <label className="gender-name">
                            <input  name='gender' type="radio" />
                            Male
                        </label>
                        <label className="gender-name">
                            <input  name='gender' type="radio" />
                            Female
                        </label>
                        <label className="gender-name">
                            <input  name='gender' type="radio" />
                            Other
                        </label>
                    </div>
                
                </div>
            </div>
            <div className="achivements-container">
                <div className="achivements-header">Your Achievements</div>
                <div className="achievements-section-header">Module Badges</div>
                <div className="achievements-badges-container">
                {modules.map((module) => (
                    <div
                        key={module}
                        className="badge-box"
                        style={{
                        filter: module <= completedModules ? 'none' : 'grayscale(1)', // Apply grayscale for unearned badges
                        animation: `fadeInBounce 0.6s ease-in-out 0.${module-1}s forwards`
                        }}
                    >
                        <img src={ModuleBadge} alt={`ModuleBadge-${module}`} />
                        Module {module}
                    </div>
                ))}
                </div>
                <div className="achievements-section-header">XP Badges</div>
                <div className="achievements-badges-container">
                    {xps.map((xp, index) => (
                    <div
                        key={xp}
                        className="badge-box"
                        style={{
                        filter: xp <= completedXPS ? 'none' : 'grayscale(1)', // Apply grayscale for unearned badges
                        animation: `fadeInBounce 0.6s ease-in-out 0.${index}s forwards`
                        }}
                    >
                        <img src={XPBadge} alt={`XPBadge-${xp}`} />
                        {xp}
                    </div>
                ))}
                </div>
                <div className="achievements-section-header">Elite Badges</div>
                <div className="achievements-badges-container">
                    <div className="badge-box" style={{animation: "fadeInBounce 0.6s ease-in-out 0.1s forwards"}}><img src={EthicBot} alt="EthicBot-img" />EthicBot</div>
                    <div className="badge-box" style={{filter: 'grayscale(1)', animation: "fadeInBounce 0.6s ease-in-out 0.2s forwards"}}><img src={VirtueBot} alt="VirtueBot-img" />VirtueBot</div>
                    <div className="badge-box" style={{filter: 'grayscale(1)', animation: "fadeInBounce 0.6s ease-in-out 0.3s forwards"}}><img src={JusticeBot} alt="JusticeBot-img" />JusticeBot</div>
                </div>

            </div>
        </div>
      </div>
    </>
  )
}

export default Profile 
