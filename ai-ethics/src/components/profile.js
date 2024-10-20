import React from 'react'
import '../styles/profile.css';

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
  return (
    <>
      <h1>Profile</h1>
      <div className="profile-container">
        <div className="profile-upper-containers">
            <div className="profile-info-container">
                <div className="profile-info-user">
                    <div className="profile-picture"></div>
                    <div className="username-container">
                        <div className="username">Oliver Q.</div>
                        <div className="current-milestone">Virtual Advocate</div>
                    </div>
                    <div className="userxp">
                        <div className="xp">500 XP</div>
                        points
                    </div>
                </div>
                <div className="profile-info-progress">
                    <div className="progress-current-milestone">Virtual Advocate</div>
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
            <div className="achivements-container"></div>
        </div>
      </div>
    </>
  )
}

export default Profile 
