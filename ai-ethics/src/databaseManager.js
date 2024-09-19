import { db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

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
}

export default DatabaseManager = new DatabaseManager();
