import { auth, db, imagesRef } from "./firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
function calculateQuizScore(duration, accuracy) {
  return Math.min((90 / duration) * 100, 100) + accuracy;
}

class DatabaseManager {
  //   async addDoc(collectionName, data) {
  //     try {
  //       await addDoc(collection(db, collectionName), data);
  //     } catch (err) {
  //       console.error(err);
  //       alert(err.message);
  //     }
  //   }

  //   async getDocs(collectionName, field, operator, value) {
  //     try {
  //       const q = query(collection(db, collectionName), where(field, operator, value));
  //       const querySnapshot = await getDocs(q);
  //       return querySnapshot.docs.map((doc) => doc.data());
  //     } catch (err) {
  //       console.error(err);
  //       alert(err.message);
  //     }
  //   }

  async fetchScoresByQuizID(quizID) {
    const scoresRef = collection(db, "Scores");
    const q = query(scoresRef, where("quizID", "==", quizID));

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());
      return results;
    } catch (error) {
      console.error("Error fetching scores: ", error);
      throw error;
    }
  }

  async fetchScoresByUserID(userID) {
    const scoresRef = collection(db, "Scores");
    const q = query(scoresRef, where("uid", "==", userID));

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());
      return results;
    } catch (error) {
      console.error("Error fetching scores: ", error);
      throw error;
    }
  }

  // Fetches a word from the glossary
  async fetchGlossary(word) {
    try {
      const q = query(
        collection(db, "glossaryWord"),
        where("title", "==", word)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        console.error("No matching glossary word found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching glossary: ", error);
      throw error;
    }
  }

  // fetches all words from the glossary
  async fetchAllGlossary() {
    try {
      const q = query(collection(db, "glossaryWord"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => doc.data());
      } else {
        console.error("No glossary words found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching glossary: ", error);
      throw error;
    }
  }

  // Fetches a user profile from the database
  async fetchUserProfile(userID) {
    try {
      const q = query(
        collection(db, "userProfile"),
        where("userID", "==", userID)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const profile = querySnapshot.docs[0].data();
        profile["id"] = querySnapshot.docs[0].id;
        return profile;
      } else {
        console.error("No matching user found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      throw error;
    }
  }

  // Fetches a user document (not the profile!)
  async getUserDocumentIdByUid(uid) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User document not found for UID:", uid);
        return null;
      }

      // Assuming there's only one user document per UID
      const userDoc = querySnapshot.docs[0].data();
      return userDoc;
    } catch (error) {
      console.error("Error fetching user document ID:", error);
      return null;
    }
  }

  // Function to get the currently logged-in user's UID
  async getCurrentUserId() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          reject(new Error("No user logged in."));
        }
      });
    });
  }

  // // function to modify the userProfile object to include the completion of a new lesson
  // async completeLesson(userID, lessonID) {
  //   try {
  //     const userProfile = await this.fetchUserProfile(userID);
  //     const completedLessons = userProfile.completedLessons;
  //     if (!completedLessons.includes(lessonID)) {
  //       completedLessons.push(lessonID);
  //       await db.collection("userProfile").doc(userID).update({
  //         completedLessons: completedLessons,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error completing lesson: ", error);
  //     throw error;
  //   }
  // }

  // uploads an image to the firebase storage and returns the download URL
  // TODO: add a way to delete images
  async uploadImage(file) {
    const storageRef = ref(imagesRef, file.name);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!");
    } catch (error) {
      console.error(error);
    }

    // Upload completed successfully, now we can get the download URL
    return getDownloadURL(ref(imagesRef, file.name)).then((url) => {
      console.log("File available at", url);
      return url;
    });
  }

  /**
   * XP is a function of scores and completed lessons for now
   * each completed lesson (stored in user profile) is worth 50 XP
   * quiz scores take the users top score for a given quiz and then
   *    score = ((90 / duration) * 100) + accuracy
   * There is a helper function to this effect at the top of this file
   */
  async fetchXPforUser(userID) {
    try {
      const userProfile = await this.fetchUserProfile(userID);
      const scores = await this.fetchScoresByUserID(userID);

      let xp = 0;

      if (userProfile && userProfile.completedLessons) {
        const completedLessons = userProfile.completedLessons;
        xp += completedLessons.length * 50;
      }

      if (scores.length === 0) {
        return xp;
      }

      const maxScores = {};
      scores.forEach((score) => {
        let local_score = calculateQuizScore(score.duration, score.accuracy);
        if (!maxScores[score.quizID] || maxScores[score.quizID] < local_score) {
          maxScores[score.quizID] = local_score;
        }
      });

      for (const quizID in maxScores) {
        xp += maxScores[quizID];
        // console.log("Adding score: ", maxScores[quizID], " for quiz: ", quizID);
      }

      return xp;
    } catch (error) {
      console.error("Error fetching XP: ", error);
      throw error;
    }
  }

  // Fetches the leaderboard data
  // recalculates it every time someone asks for it
  // curently rather inefficient, but should be fine for now
  async fetchLeaderboardData() {
    try {
      // fetch all user objects
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => doc.data());

      // for each user, fetch scores
      const leaderboardData = [];
      for (const user of users) {
        const userProfile = await this.fetchUserProfile(user.uid);
        let name = "";
        if (!userProfile) {
          name = user.name;
        } else if (!userProfile.username) {
          name = userProfile.name;
        } else {
          name = userProfile.username;
        }
        const xp = await this.fetchXPforUser(user.uid);
        leaderboardData.push({
          name: name,
          score: xp,
        });

        // console.log("Adding user: ", user.name, " with XP: ", xp);
      }

      // sort by xp
      leaderboardData.sort((a, b) => b.score - a.score);
      return leaderboardData;
    } catch (error) {
      console.error("Error fetching leaderboard data: ", error);
      throw error;
    }
  }

  // adds a lesson to a users completed lessons list in their profile
  async addCompletedLesson(lessonID) {
    try {
      const userID = await this.getCurrentUserId();
      const q = query(
        collection(db, "userProfile"),
        where("userID", "==", userID)
      );
      const querySnapshot = await getDocs(q);
      // const docRef = doc(db, "userProfile", userID);
      let userProfile = null;
      if (querySnapshot) {
        userProfile = querySnapshot.docs[0].data();
      } else {
        console.error("User profile not found");
        return;
      }

      let completedLessons = [];

      if (!userProfile) {
        console.error("User profile not found");
        return;
      }
      if (userProfile.completedLessons) {
        completedLessons = userProfile.completedLessons;
      }

      if (!completedLessons.includes(lessonID)) {
        completedLessons.push(lessonID);
        await setDoc(
          querySnapshot.docs[0].ref,
          { completedLessons: completedLessons },
          { merge: true }
        );
      } else {
        console.log("Lesson already completed");
      }
    } catch (error) {
      console.error("Error adding completed lesson: ", error);
      throw error;
    }
  }
}

export default DatabaseManager = new DatabaseManager();
