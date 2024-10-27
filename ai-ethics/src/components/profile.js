import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import ModuleBadge from "../styles/Badges/ModuleBadge.svg";
import XPBadge from "../styles/Badges/XPBadge.svg";
import EthicBot from "../styles/Badges/EthicBot.svg";
import VirtueBot from "../styles/Badges/VirtueBot.svg";
import JusticeBot from "../styles/Badges/JusticeBot.svg";
import databaseManager from "../databaseManager";
import UserProfile from "../UserProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

/*
Notes For Backend

Some things are dynamic, some are static

The following are the data we need for this page:
- Need users name in `username`
- need the users earned xp and calculate the current milestone and put it in `current-milestone`
- get usered earned xp and put it in `xp`
- `progress-current-milestone` and `dprogress-next-milestone` are current and next milestones which is based on the useres earned xp, 
so the names might not need to come from the db but we need the users earned xp can calculate what their current and nex milestone is dynamically and disply those 
- the `milestone-progressbar-container` has 575/650 XP displaying earnedXP/XP needed for next milestone. Need earned xp from db
- The ethical evolution `badge-box` is displayed dynamicaalyy from the variable `completedXPS`, need eaned xp from db
- The account details container displayes all the users details that they inputed upon registration. user details need to be fetched from db. The password input box should be replaced with a forgot password button. 
Should these details be editable? the `edit-profile` does nothing for now. If account details should be editable then nedd to add functionality to update db upon editing details.
- the module badges are displayed dynamically based on the variable `completedModules`. Need to track and fetch the no of modules completed from db
- the xp badges are displayed dynamically based on the variable `completedXPS`. Need to track and fetch the earned xp completed from db
- Elite Badges are not dynamic yet. need to make it dynamic based on earned user xp

** Apologies for the huge amount of notes, please read through all of these, all of these need to be addressed.



TO DO:
fetch all the relavent data and address the concerns above. How you are getting what data from where is left to you.
Need to decide what data to display in account details. If they should be editable the implement the feature to edit them and update the db accordingly


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
];
//   const currentXP = 575; // Replace this later with dynamic value

const Profile = () => {
  const totalModules = 10;
  const completedModules = 3; // This value can come from your backend or state to reflect the user's progress
  const modules = Array.from({ length: totalModules }, (_, i) => i + 1);
  const completedXPS = currentXP; // also used as completed milestones in ethical evolution container
  const xps = [5, 10, 50, 100, 200, 500, 1000];

  const [userProfile, setUserProfile] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [currentXP, setCurrentXP] = useState(0);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (user) {
          const profile = await databaseManager.fetchUserProfile(user.uid);
          setCurrentXP(await databaseManager.fetchXPforUser(user.uid));
          if (profile) {
            setUserProfile(profile);
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

  const progressPercentage = (currentXP / 1000) * 100;

  return (
    <>
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-upper-containers">
          <div className="profile-info-container">
            <div className="profile-info-user">
              <div className="profile-picture">
                <img src={userProfile?.imgURL} alt="Profile" />
              </div>
              <div className="username-container">
                <div className="username">{userProfile?.name}</div>
                <div className="current-milestone">Virtual Advocate</div>
              </div>
              <div className="userxp">
                <div className="xp">{currentXP}</div>
                points
              </div>
            </div>
            <div className="profile-info-progress">
              <div className="progress-current-milestone">Virtual Advocate</div>
              <div className="milestone-progressbar-container">
                {/* TODO make the back half of this dynamic */}
                {currentXP}/650 XP
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
              {milestones.map((milestone, index) => (
                <div
                  className="ethic-card"
                  key={index}
                  style={{
                    filter:
                      milestone.xp <= completedXPS ? "none" : "grayscale(1)",
                    animation: `fadeInBounce 0.6s ease-in-out 0.${index}s forwards`,
                  }}
                >
                  <div className="ethic-card-xp">{milestone.xp} XP</div>
                  <div className="ethic-card-circle">&#10003;</div>
                  <div className="ethic-card-name">{milestone.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="profile-lower-containers">
          <UserProfile userProfile={userProfile} />
          <div className="achivements-container">
            <div className="achivements-header">Your Achievements</div>
            <div className="achievements-section-header">Module Badges</div>
            <div className="achievements-badges-container">
              {modules.map((module) => (
                <div
                  key={module}
                  className="badge-box"
                  style={{
                    filter:
                      module <= completedModules ? "none" : "grayscale(1)", // Apply grayscale for unearned badges
                    animation: `fadeInBounce 0.6s ease-in-out 0.${
                      module - 1
                    }s forwards`,
                  }}
                >
                  <img src={ModuleBadge} alt={`ModuleBadge-${module}`} />
                  Module {module}
                </div>
              ))}
            </div>

            {/* left over from merge conflict, i don''t have the brain power to fix this right now */}
            {/* // <div className="achievements-section-header">XP Badges</div>
            // <div className="achievements-badges-container">
            //   <div className="badge-box">
            //     <img src={XPBadge} alt="XPBadge-img" />5 XP
            //   </div>
            //   {xps.map((xp) => (
            //     <div
            //       key={xp}
            //       className="badge-box"
            //       style={{
            //         filter: xp <= completedXPS ? "none" : "grayscale(1)", // Apply grayscale for unearned badges
            //       }}
            //     >
            //       <img src={XPBadge} alt={`XPBadge-${xp}`} />
            //       {xp}
            //     </div>
            //   ))} */}

            <div className="achivements-container">
              <div className="achivements-header">Your Achievements</div>
              <div className="achievements-section-header">Module Badges</div>
              <div className="achievements-badges-container">
                {modules.map((module) => (
                  <div
                    key={module}
                    className="badge-box"
                    style={{
                      filter:
                        module <= completedModules ? "none" : "grayscale(1)", // Apply grayscale for unearned badges
                      animation: `fadeInBounce 0.6s ease-in-out 0.${
                        module - 1
                      }s forwards`,
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
                      filter: xp <= completedXPS ? "none" : "grayscale(1)", // Apply grayscale for unearned badges
                      animation: `fadeInBounce 0.6s ease-in-out 0.${index}s forwards`,
                    }}
                  >
                    <img src={XPBadge} alt={`XPBadge-${xp}`} />
                    {xp}
                  </div>
                ))}
              </div>
              <div className="achievements-section-header">Elite Badges</div>
              <div className="achievements-badges-container">
                <div
                  className="badge-box"
                  style={{
                    animation: "fadeInBounce 0.6s ease-in-out 0.1s forwards",
                  }}
                >
                  <img src={EthicBot} alt="EthicBot-img" />
                  EthicBot
                </div>
                <div
                  className="badge-box"
                  style={{
                    filter: "grayscale(1)",
                    animation: "fadeInBounce 0.6s ease-in-out 0.2s forwards",
                  }}
                >
                  <img src={VirtueBot} alt="VirtueBot-img" />
                  VirtueBot
                </div>
                <div
                  className="badge-box"
                  style={{
                    filter: "grayscale(1)",
                    animation: "fadeInBounce 0.6s ease-in-out 0.3s forwards",
                  }}
                >
                  <img src={JusticeBot} alt="JusticeBot-img" />
                  JusticeBot
                </div>
              </div>
            </div>
            <div className="achievements-section-header">Elite Badges</div>
            <div className="achievements-badges-container">
              <div className="badge-box">
                <img src={EthicBot} alt="EthicBot-img" />
                EthicBot
              </div>
              <div className="badge-box" style={{ filter: "grayscale(1)" }}>
                <img src={VirtueBot} alt="VirtueBot-img" />
                VirtueBot
              </div>
              <div className="badge-box" style={{ filter: "grayscale(1)" }}>
                <img src={JusticeBot} alt="JusticeBot-img" />
                JusticeBot
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
