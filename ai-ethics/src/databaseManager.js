import { auth, db, imagesRef } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  async fetchLeaderboardByQuizID(quizID) {
    const leaderboardRef = collection(db, "leaderboard");
    const q = query(leaderboardRef, where("quizID", "==", quizID));

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());
      return results;
    } catch (error) {
      console.error("Error fetching leaderboard: ", error);
      throw error;
    }
  }

  async fetchLeaderboardByUserID(userID) {
    const leaderboardRef = collection(db, "leaderboard");
    const q = query(leaderboardRef, where("userID", "==", userID));

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => doc.data());
      return results;
    } catch (error) {
      console.error("Error fetching leaderboard: ", error);
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

      // Return the first matching document's data if it exists
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data(); // return the first document's data
      } else {
        console.error("No matching glossary word found");
        return null; // or handle as you wish
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

      // Return the first matching document's data if it exists
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data(); // return the first document's data
      } else {
        console.error("No matching user found");
        return null; // or handle as you wish
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      throw error;
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

  // function to modify the userProfile object to include the completion of a new lesson
  async completeLesson(userID, lessonID) {
    try {
      const userProfile = await this.fetchUserProfile(userID);
      const completedLessons = userProfile.completedLessons;
      if (!completedLessons.includes(lessonID)) {
        completedLessons.push(lessonID);
        await db.collection("userProfile").doc(userID).update({
          completedLessons: completedLessons,
        });
      }
    } catch (error) {
      console.error("Error completing lesson: ", error);
      throw error;
    }
  }

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
}

export default DatabaseManager = new DatabaseManager();
