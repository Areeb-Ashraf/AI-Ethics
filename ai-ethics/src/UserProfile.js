import { auth, db, analytics } from "./firebase";
import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import databaseManager from "./databaseManager";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import Cookies from "js-cookie";

function UserProfile({ userProfile, setUserProfile }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];

    setPhoto(selectedPhoto);
  };

  async function handleSaveChanges() {
    logEvent(analytics, "beginning_of_save_changes_in_profile", {
      source: "handleSaveChanges",
    });

    try {
      let dataToUpdate = {};

      if (name !== "") dataToUpdate.name = name;
      if (username !== "") dataToUpdate.username = username;

      // If photo is not null, update imgURL field
      if (photo) {
        const imgUrl = await databaseManager.uploadImage(photo);
        if (imgUrl) {
          dataToUpdate.imgURL = imgUrl;
        } else {
          console.error("Error uploading image: Image URL is null.");
        }
      }

      if (userProfile && userProfile.id) {
        // console.log("first");
        await updateDoc(doc(db, "userProfile", userProfile.id), dataToUpdate);
        console.log("User profile updated successfully");
      } else {
        // console.log("second");
        dataToUpdate.userID = user.uid;
        await addDoc(collection(db, "userProfile"), dataToUpdate);
        console.log("User profile created successfully");
      }

      // Update local state with the new user profile data
      const updatedProfile = { ...userProfile, ...dataToUpdate };
      setUserProfile(updatedProfile); // Assuming you have a state for userProfile
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("There was an error saving your profile.");
    }
  }

  // This function will toggle between edit and view modes
  function toggleEditMode() {
    setIsEditMode(!isEditMode);
  }

  const handleResetWalkthrough = () => {
    const allCookies = Cookies.get();
    for (let cookie in allCookies) {
      Cookies.remove(cookie);
    }
    alert("All walkthrough progress has been reset.");
  };

  if (isEditMode) {
    // Edit mode to modify profile details
    return (
      <div className="account-details-container">
        <div className="account-header">Edit Account Details</div>
        <div className="account-display ad-column">
          <label className="account-label">
            Name:
            <input
              type="text"
              required
              minLength="1"
              maxLength="24"
              name="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="account-label">
            Username:
            <input
              type="text"
              required
              minLength="1"
              maxLength="24"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <div className="PP-label">
            Profile Pic:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <div className="account-actions-row">
            <button className="action-button" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button className="cancel-button" onClick={toggleEditMode}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View mode to display profile details
  return (
    <div className="account-details-container">
      <div className="account-header">
        Account Details
        <button className="edit-profile" onClick={toggleEditMode}>
          Edit Profile
        </button>
      </div>
      <div className="spaced-box" />

      <div className="account-display">
        <div className="left-section">
          <div className="profile-picture-2">
            <img src={userProfile?.imgURL} alt="Profile" />
          </div>
        </div>
        <div className="right-section">
          <div className="name">Name: {userProfile?.name || "Noname"}</div>
          <div className="username2">
            Username: {userProfile?.username || "Noname"}
          </div>
        </div>
      </div>
      <div className="spaced-box" />

      <div className="account-actions-row">
        <button
          className="action-button reset-password"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
        <button
          className="action-button change-email"
          onClick={handleChangeEmail}
        >
          Change Email
        </button>
      </div>
      <button
        className="action-button change-email"
        onClick={handleResetWalkthrough}
      >
        Reset Walkthrough Progress
      </button>
    </div>
  );

  // defunct code, keeping for reference
  // return (
  //   <div className="account-details-container">
  //     <div className="account-header">
  //       Add Account Details
  //       <button className="edit-profile" onClick={handleSaveChanges}>
  //         Create Profile
  //       </button>
  //     </div>
  //     <div className="account-display">
  //       <label className="account-label">
  //         Name:
  //         <input
  //           type="text"
  //           required
  //           minLength="1"
  //           maxLength="18"
  //           name="fname"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //       </label>
  //       <label className="account-label">
  //         Profile Picture:
  //         <input
  //           type="file"
  //           accept="image/*"
  //           onChange={(e) => setPhoto(e.target.files[0])}
  //         />
  //       </label>
  //     </div>
  //     <div className="account-display">
  //       <label className="account-label">
  //         Username:
  //         <input
  //           type="text"
  //           required
  //           minLength="1"
  //           maxLength="18"
  //           name="username"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)} // linked to state
  //         />
  //       </label>
  //     </div>
  //   </div>
  // );

  // These functions would handle the reset password and change email actions
  function handleResetPassword() {
    // Logic to trigger password reset (e.g., Firebase authentication)
    console.log("Password reset link sent.");
  }

  function handleChangeEmail() {
    // Logic to change the user's email
    console.log("Change email flow initiated.");
  }
}
export default UserProfile;
