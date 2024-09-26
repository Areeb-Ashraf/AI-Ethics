import { auth, db } from "./firebase";
import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import databaseManager from "./databaseManager";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState(null);
  const [userDoc, setUserDoc] = useState(null);

  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];

    setPhoto(selectedPhoto);
  };

  async function handleSaveChanges() {
    try {
      // Get the profile document for the current user
      const userRef = doc(db, "userProfile", userDoc.uid);

      let dataToUpdate = {}; // An empty object to hold the data to update

      // Construct the object with non-empty fields
      //   if (username !== "") dataToUpdate.username = username;
      if (name !== "") dataToUpdate.name = name;
      //   if (location !== "") dataToUpdate.location = location;
      //   if (bio !== "") dataToUpdate.bio = bio;

      // If photo is not null, update imgURL field
      if (photo) {
        const imgUrl = await databaseManager.uploadImage(photo);
        if (imgUrl) {
          dataToUpdate.imgURL = imgUrl;
        } else {
          console.error("Error uploading image: Image URL is null.");
        }
      }

      await updateDoc(userRef, dataToUpdate);
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (user) {
          const profile = await databaseManager.fetchUserProfile(user.uid);
          const docId = await databaseManager.getUserDocumentIdByUid(user.uid);
          setUserProfile(profile);
          setUserDoc(docId);
        } else {
          const profile = await databaseManager.fetchUserProfile("baz");
          const docId = await databaseManager.getUserDocumentIdByUid("baz");
          setUserProfile(profile);
          setUserDoc(docId);
          console.log(profile);
          console.log(docId);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, [user]);

  useEffect(() => {
    // if (loading) return;
    // if (!user) return navigate("/");
    console.log("not logged in");
  }, [user, loading]);

  if (loading || !userProfile || !userDoc) {
    return <p>Loading...</p>; // Display loading state while fetching data
  }

  return (
    <div>
      <div
        style={{
          height: "100px",
          width: "100%",
          backgroundColor: "transparent",
        }}
      ></div>
      <h1>User Profile</h1>
      <p>Name: {userDoc.name ?? ""}</p>
      <p>Photo: </p>
      {/* <img src={userProfile.imgUrl ?? ""} alt="User Profile" /> */}
      <img
        src={userProfile.imgUrl ?? ""}
        alt="User Profile"
        style={{ height: "150px" }}
      />
      <h3>Completed Lessons:</h3>
      {userProfile.completedLessons &&
      userProfile.completedLessons.length > 0 ? (
        <ul>
          {userProfile.completedLessons.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ul>
      ) : (
        <p>No completed lessons.</p>
      )}

      <h3>Badges:</h3>
      {userProfile.badges && userProfile.badges.length > 0 ? (
        <ul>
          {userProfile.badges.map((badge, index) => (
            <li key={index}>{badge}</li>
          ))}
        </ul>
      ) : (
        <p>No badges earned.</p>
      )}
      <div className="mb-3">
        <label htmlFor="photo" className="form-label">
          Photo:
        </label>
        <input
          type="file"
          className="form-control"
          id="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {photo && (
          <img
            src={URL.createObjectURL(photo)}
            alt="Selected"
            className="mt-2 img-thumbnail"
            style={{ maxWidth: "100px" }}
          />
        )}
      </div>
      <div>
        <button className="btn btn-primary me-2" onClick={handleSaveChanges}>
          Confirm my choices
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
