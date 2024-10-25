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
  const completedXPS = 575;
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
      <h1>Profile</h1>
      <div className="profile-container">
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
                {currentXP}/650 XP
                <div className="milestone-progress-bar">
                  <div className="milestone-progress"></div>
                </div>
              </div>
              <div className="progress-next-milestone">AI Specialist</div>
            </div>
          </div>
          <div className="ethical-evolution-container"></div>
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
                  }}
                >
                  <img src={ModuleBadge} alt={`ModuleBadge-${module}`} />
                  Module {module}
                </div>
              ))}
            </div>
            <div className="achievements-section-header">XP Badges</div>
            <div className="achievements-badges-container">
              <div className="badge-box">
                <img src={XPBadge} alt="XPBadge-img" />5 XP
              </div>
              {xps.map((xp) => (
                <div
                  key={xp}
                  className="badge-box"
                  style={{
                    filter: xp <= completedXPS ? "none" : "grayscale(1)", // Apply grayscale for unearned badges
                  }}
                >
                  <img src={XPBadge} alt={`XPBadge-${xp}`} />
                  {xp}
                </div>
              ))}
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
