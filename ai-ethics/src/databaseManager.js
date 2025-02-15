import { auth, db, imagesRef, analytics } from "./firebase";
import { logEvent } from "firebase/analytics";
import { query, collection, getDocs, where, doc, setDoc, limit } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { moduleData } from "./components/lessons";
import { glossaryWords } from "./constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function calculateQuizScore(duration, accuracy) {
  return Math.round(Math.min((90 / duration) * 100, 100) + accuracy);
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
    try {
      logEvent(analytics, "fetch_scores_by_quiz_id_start", { quizID });
      const scoresRef = collection(db, "Scores");
      const q = query(scoresRef, where("quizID", "==", quizID));

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());

      logEvent(analytics, "fetch_scores_by_quiz_id_success", {
        quizID,
        resultCount: results.length,
      });
      return results;
    } catch (error) {
      console.error("Error fetching scores: ", error);
      logEvent(analytics, "fetch_scores_by_quiz_id_error", {
        quizID,
        error: error.message,
      });
      throw error;
    }
  }

  async fetchScoresByUserID(userID) {
    try {
      logEvent(analytics, "fetch_scores_by_user_id_start", { userID });
      const scoresRef = collection(db, "Scores");
      const q = query(scoresRef, where("uid", "==", userID));

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());

      logEvent(analytics, "fetch_scores_by_user_id_success", {
        userID,
        resultCount: results.length,
      });
      return results;
    } catch (error) {
      console.error("Error fetching scores: ", error);
      logEvent(analytics, "fetch_scores_by_user_id_error", {
        userID,
        error: error.message,
      });
      throw error;
    }
  }

  // Fetches a word from the glossary
  async fetchGlossary(word) {
    return glossaryWords.find((glossaryWord) => glossaryWord.title === word);
    // try {
    //   logEvent(analytics, "fetch_glossary_start", { word });
    //   const q = query(
    //     collection(db, "glossaryWord"),
    //     where("title", "==", word)
    //   );
    //   const querySnapshot = await getDocs(q);

    //   if (!querySnapshot.empty) {
    //     logEvent(analytics, "fetch_glossary_success", {
    //       word,
    //       resultCount: querySnapshot.docs.length,
    //     });
    //     return querySnapshot.docs[0].data();
    //   } else {
    //     console.error("No matching glossary word found");
    //     logEvent(analytics, "fetch_glossary_not_found", { word });
    //     return null;
    //   }
    // } catch (error) {
    //   console.error("Error fetching glossary: ", error);
    //   logEvent(analytics, "fetch_glossary_error", {
    //     word,
    //     error: error.message,
    //   });
    //   throw error;
    // }
  }

  // fetches all words from the glossary
  async fetchAllGlossary() {
    return glossaryWords;
    // try {
    //   logEvent(analytics, "fetch_all_glossary_start");
    //   const q = query(collection(db, "glossaryWord"));
    //   const querySnapshot = await getDocs(q);

    //   if (!querySnapshot.empty) {
    //     logEvent(analytics, "fetch_all_glossary_success", {
    //       resultCount: querySnapshot.docs.length,
    //     });
    //     return querySnapshot.docs.map((doc) => doc.data());
    //   } else {
    //     console.error("No glossary words found");
    //     logEvent(analytics, "fetch_all_glossary_not_found");
    //     return null;
    //   }
    // } catch (error) {
    //   console.error("Error fetching glossary: ", error);
    //   logEvent(analytics, "fetch_all_glossary_error", { error: error.message });
    //   throw error;
    // }
  }

  // Fetches a user profile from the database
  async fetchUserProfile(userID) {
    try {
      logEvent(analytics, "fetch_user_profile_start", { userID });
      const q = query(collection(db, "userProfile"), where("userID", "==", userID), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const profile = querySnapshot.docs[0].data();
        profile["id"] = querySnapshot.docs[0].id;
        logEvent(analytics, "fetch_user_profile_success", {
          userID,
          resultCount: 1,
        });
        return profile;
      } else {
        console.error("No matching user found");
        logEvent(analytics, "fetch_user_profile_not_found", { userID });
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      logEvent(analytics, "fetch_user_profile_error", {
        userID,
        error: error.message,
      });
      throw error;
    }
  }

  // Fetches a user document (not the profile!)
  async getUserDocumentIdByUid(uid) {
    try {
      logEvent(analytics, "get_user_document_by_uid_start", { uid });
      const q = query(collection(db, "users"), where("uid", "==", uid), limit(1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User document not found for UID:", uid);
        logEvent(analytics, "get_user_document_by_uid_not_found", { uid });
        return null;
      }

      const userDoc = querySnapshot.docs[0].data();
      logEvent(analytics, "get_user_document_by_uid_success", { uid });
      return userDoc;
    } catch (error) {
      console.error("Error fetching user document ID:", error);
      logEvent(analytics, "get_user_document_by_uid_error", {
        uid,
        error: error.message,
      });
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

  // uploads an image to the firebase storage and returns the download URL
  // TODO: add a way to delete images, if the user changes their image
  async uploadImage(file) {
    try {
      logEvent(analytics, "upload_image_start", { fileName: file.name });
      const storageRef = ref(imagesRef, file.name);
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!");

      logEvent(analytics, "upload_image_success", { fileName: file.name });
      const url = await getDownloadURL(ref(imagesRef, file.name));
      logEvent(analytics, "upload_image_url_fetched", {
        fileName: file.name,
        url,
      });
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      logEvent(analytics, "upload_image_error", {
        fileName: file.name,
        error: error.message,
      });
    }
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
      logEvent(analytics, "fetchXPforUser_start", { userID });

      const userProfile = await this.fetchUserProfile(userID);
      const scores = await this.fetchScoresByUserID(userID);

      let xp = 0;

      if (userProfile && userProfile.completedLessons) {
        const completedLessons = userProfile.completedLessons;
        xp += completedLessons.length * 50;
        if (completedLessons.length >= 3) xp += 50;
        if (completedLessons.length >= 5) xp += 50;
        if (completedLessons.length >= 9) xp += 50;
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
      }

      logEvent(analytics, "fetchXPforUser_end", { userID, xp });
      return xp;
    } catch (error) {
      console.error("Error fetching XP: ", error);
      throw error;
    }
  }

  // adds a lesson to a users completed lessons list in their profile
  async addCompletedLesson(lessonID) {
    const Alert = withReactContent(Swal);

    try {
      const userID = await this.getCurrentUserId();
      const q = query(collection(db, "userProfile"), where("userID", "==", userID), limit(1));
      const querySnapshot = await getDocs(q);

      let userProfile = null;
      if (querySnapshot) {
        userProfile = querySnapshot.docs[0].data();
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
        Alert.fire({
          title: `Lesson ${lessonID} Completed!`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#0056D1",
        });
      } else {
        console.log("Lesson already completed");
      }

      logEvent(analytics, "addCompletedLesson_success", { userID, lessonID });
    } catch (error) {
      logEvent(analytics, "addCompletedLesson_failed");
      console.error("Error adding completed lesson: ", error);
      throw error;
    }
  }

  // returns all of a users completed lessons from user profile
  async fetchCompletedLessonsByUser(userID) {
    try {
      const userProfile = await this.fetchUserProfile(userID);
      logEvent(analytics, "fetchCompletedLessonsByUser_start");

      if (userProfile && userProfile.completedLessons) {
        logEvent(analytics, "fetchCompletedLessonsByUser", {
          userID,
          lessonCount: userProfile.completedLessons.length,
        });
        return userProfile.completedLessons;
      } else {
        return [];
      }
    } catch (error) {
      logEvent(analytics, "fetchCompletedLessonsByUser_failed");
      console.error("Error fetching completed lessons: ", error);
      throw error;
    }
  }

  async updateLessonProgress(newProgress) {
    throw new Error("databaseManager.updateLessonProgress is deprecated!");
    // try {
    //   const userID = await this.getCurrentUserId();
    //   const q = query(
    //     collection(db, "lessonProgress"),
    //     where("userID", "==", userID)
    //   );
    //   const querySnapshot = await getDocs(q);

    //   let completed = querySnapshot.empty
    //     ? []
    //     : querySnapshot.docs[0].data().completed || [];

    //   if (!completed.includes(newProgress)) {
    //     completed.push(newProgress);

    //     // Update the database with the new completed section
    //     if (!querySnapshot.empty) {
    //       await setDoc(
    //         querySnapshot.docs[0].ref,
    //         { completed: completed },
    //         { merge: true }
    //       );
    //       console.log("check 0");
    //     } else {
    //       await setDoc(doc(db, "lessonProgress", userID), {
    //         userID: userID,
    //         completed: completed,
    //       });
    //       console.log("Lesson progress document created");
    //     }

    //     console.log("check 1");
    //     // Check if a module is completed
    //     for (const module of moduleData) {
    //       console.log("module", module);

    //       const moduleSections = module.sections
    //         .filter((section) => section.secID)
    //         .map((section) => section.secID);

    //       console.log("sections", moduleSections);

    //       const isModuleComplete = moduleSections.every((secID) =>
    //         completed.includes(secID)
    //       );

    //       if (isModuleComplete) {
    //         this.addCompletedLesson(module.title);
    //         console.log(`Module completed: ${module.title}`);
    //       }
    //     }
    //   } else {
    //     console.log("Section already completed");
    //   }
    // } catch (error) {
    //   console.error("Error updating lesson progress: ", error);
    //   throw error;
    // }
  }

  async getLessonProgress() {
    throw new Error("databaseManager.getLessonProgress is deprecated!");
    // try {
    //   const userID = await this.getCurrentUserId();
    //   const q = query(
    //     collection(db, "lessonProgress"),
    //     where("userID", "==", userID)
    //   );
    //   const querySnapshot = await getDocs(q);
    //   if (!querySnapshot.empty) {
    //     return querySnapshot.docs[0].data().completed;
    //   } else {
    //     return new Set();
    //   }
    // } catch (error) {
    //   console.error("Error fetching lesson progress: ", error);
    //   throw error;
    // }
  }

  // fetches the users completed lessons and quizzes
  async fetchUsersProgress() {
    let uniqueCompletedItems = new Set();

    try {
      const userID = await this.getCurrentUserId();
      const [lessons, scores] = await Promise.all([
        this.fetchCompletedLessonsByUser(userID),
        this.fetchScoresByUserID(userID),
      ]);

      lessons.forEach((lesson) => uniqueCompletedItems.add(lesson));
      scores.forEach((score) => uniqueCompletedItems.add(score.quizID));

      logEvent(analytics, "fetchUsersProgress", {
        userID,
        progressCount: uniqueCompletedItems.size,
      });
    } catch (error) {
      console.error("Error fetching user progress: ", error);
      throw error;
    }

    return Array.from(uniqueCompletedItems);
  }

  //   // Fetches the leaderboard data
  // // recalculates it every time someone asks for it
  // // curently rather inefficient, but should be fine for now
  // async fetchLeaderboardData() {
  //   try {
  //     logEvent(analytics, "fetchLeaderboardData_start");

  //     const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     const users = querySnapshot.docs.map((doc) => doc.data());

  //     const leaderboardData = [];
  //     for (const user of users) {
  //       const userProfile = await this.fetchUserProfile(user.uid);
  //       let name = "";
  //       if (!userProfile) {
  //         name = user.name;
  //       } else if (!userProfile.username) {
  //         name = userProfile.name;
  //       } else {
  //         name = userProfile.username;
  //       }
  //       const xp = await this.fetchXPforUser(user.uid);
  //       leaderboardData.push({
  //         name: name,
  //         score: xp,
  //         img: userProfile ? userProfile.imgURL : null,
  //       });
  //     }

  //     leaderboardData.sort((a, b) => b.score - a.score);

  //     logEvent(analytics, "fetchLeaderboardData_end", {
  //       leaderboardCount: leaderboardData.length,
  //     });
  //     return leaderboardData;
  //   } catch (error) {
  //     logEvent(analytics, "fetchLeaderboardData_failed");
  //     console.error("Error fetching leaderboard data: ", error);
  //     throw error;
  //   }
  // }

  async fetchLeaderboardData() {
    try {
      logEvent(analytics, "fetchLeaderboardData_start");

      // Fetch all users, profiles, and scores in parallel
      const [userSnapshot, userProfilesSnapshot, scoresSnapshot] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "userProfile")),
        getDocs(collection(db, "Scores")),
      ]);

      // Map user profiles and scores by user ID
      const userProfiles = userProfilesSnapshot.docs.reduce((acc, doc) => {
        acc[doc.data().userID] = doc.data();
        return acc;
      }, {});

      const scoresByUserID = scoresSnapshot.docs.reduce((acc, doc) => {
        const scoreData = doc.data();
        if (!acc[scoreData.uid]) {
          acc[scoreData.uid] = [];
        }
        acc[scoreData.uid].push(scoreData);
        return acc;
      }, {});

      // Process each user to build leaderboard data
      const leaderboardData = userSnapshot.docs.map((userDoc) => {
        const user = userDoc.data();
        const userProfile = userProfiles[user.uid] || null;

        const name = userProfile?.username || userProfile?.name || user.name;
        const xp = this.calculateXP(userProfile, scoresByUserID[user.uid] || []);

        return {
          name,
          score: xp,
          img: userProfile ? userProfile.imgURL : null,
        };
      });

      // Sort leaderboard data by score
      leaderboardData.sort((a, b) => b.score - a.score);

      logEvent(analytics, "fetchLeaderboardData_end", {
        leaderboardCount: leaderboardData.length,
      });

      return leaderboardData;
    } catch (error) {
      logEvent(analytics, "fetchLeaderboardData_failed");
      console.error("Error fetching leaderboard data: ", error);
      throw error;
    }
  }

  // Helper function to calculate XP based on user profile and scores
  calculateXP(userProfile, scores) {
    let xp = 0;

    if (userProfile?.completedLessons) {
      xp += userProfile.completedLessons.length * 50;
      if (userProfile.completedLessons.length >= 3) xp += 50;
      if (userProfile.completedLessons.length >= 5) xp += 50;
      if (userProfile.completedLessons.length >= 9) xp += 50;
    }

    const maxScores = {};
    scores.forEach((score) => {
      const local_score = calculateQuizScore(score.duration, score.accuracy);
      if (!maxScores[score.quizID] || maxScores[score.quizID] < local_score) {
        maxScores[score.quizID] = local_score;
      }
    });

    for (const quizID in maxScores) {
      xp += maxScores[quizID];
    }

    return xp;
  }

  // async addBadgeToUser(userID, badge, profileRef) {
  //   logEvent(analytics, "adding_badge_start", { userID });

  //   if

  // }
}

export default DatabaseManager = new DatabaseManager();
