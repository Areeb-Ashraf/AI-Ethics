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
- the module badges are displayed dynamically based on the variable `completedModules`. Need to track and fetch the no of modules completed from db
- Elite Badges are not dynamic yet. need to make it dynamic based on earned user xp. Also, how are these awarded?

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
  { xp: 3000, label: "Completionist" },
];
//   const currentXP = 575; // Replace this later with dynamic value

const Profile = () => {
  const totalModules = 10;
  const modules = Array.from({ length: totalModules }, (_, i) => i + 1);
  const xps = [5, 10, 50, 100, 200, 500, 1000, 3000];

  const [userProfile, setUserProfile] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [currentXP, setCurrentXP] = useState(0);
  const [completedModules, setCompletedModules] = useState(0);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (user) {
          const profile = await databaseManager.fetchUserProfile(user.uid);
          setCurrentXP(await databaseManager.fetchXPforUser(user.uid) || 0);
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

  useEffect(() => {
    if (userProfile && userProfile.completedLessons) {
      setCompletedModules(userProfile.completedLessons.length);
    } else {
      setCompletedModules(0);
    }
  }, [userProfile]);

  // Find the current and next milestones
  const currentMilestone = milestones
    .slice()
    .reverse()
    .find((milestone) => currentXP >= milestone.xp);
  const nextMilestone =
    milestones.find((milestone) => milestone.xp > currentXP) ||
    currentMilestone;

  // Calculate progress percentage between milestones
  const progressRange = nextMilestone.xp - currentMilestone.xp;
  const progressPercent = currentXP == 3000 ? "100" : 
    ((currentXP - currentMilestone.xp) / progressRange) * 100;

  return (
    <>
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-upper-containers">
          <div className="profile-info-container">
            <div className="profile-info-user">
              <div className="profile-picture">
                <img style={{display: userProfile ? "" : "none"}} src={userProfile?.imgURL} alt="Profile" />
              </div>
              <div className="username-container">
                <div className="username">{userProfile?.name || "Noname"}</div>
                <div className="current-milestone">Virtual Advocate</div>
              </div>
              <div className="userxp">
                <div className="xp">{currentXP}XP</div>
                points
              </div>
            </div>
            <div className="profile-info-progress">
              <div className="progress-current-milestone">
                {currentMilestone.label}
              </div>
              <div className="milestone-progressbar-container">
                {currentXP}/{nextMilestone.xp} XP
                <div className="milestone-progress-bar">
                  <div
                    className="milestone-progress"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="progress-next-milestone">
                {nextMilestone.label}
              </div>
            </div>
          </div>
          <div className="ethical-evolution-container">
            <div className="ethical-eval-title">Your Ethical Evaluation</div>
            <div className="ethic-card-container">
              {milestones.map((milestone, index) => (
                <div
                  className="ethic-card"
                  key={index}
                  style={{
                    filter: milestone.xp <= currentXP ? "none" : "grayscale(1)",
                    animation: `fadeInBounce 0.6s ease-in-out ${index === 10 ? 1 : 0}.${index}s forwards`
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
          <UserProfile
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
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
                    filter: xp <= currentXP ? "none" : "grayscale(1)", // Apply grayscale for unearned badges
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
                  filter: completedModules >= 1 ? "": "grayscale(1)",
                  animation: "fadeInBounce 0.6s ease-in-out 0.1s forwards"
                }}
              >
                <img src={EthicBot} alt="EthicBot-img" />
                EthicBot
              </div>
              <div
                className="badge-box"
                style={{
                  filter: completedModules >= 4 ? "": "grayscale(1)",
                  animation: "fadeInBounce 0.6s ease-in-out 0.2s forwards"
                }}
              >
                <img src={VirtueBot} alt="VirtueBot-img" />
                VirtueBot
              </div>
              <div
                className="badge-box"
                style={{
                  filter: completedModules >= 7 ? "": "grayscale(1)",
                  animation: "fadeInBounce 0.6s ease-in-out 0.3s forwards"
                }}
              >
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
