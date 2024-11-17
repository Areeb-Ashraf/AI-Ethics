import { db, analytics } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore"; // Import doc and setDoc
import { logEvent } from "firebase/analytics";

class QuizDatabase {
  // Function to upload quiz score directly under the 'Scores' collection
  async uploadQuizScore(uid, accuracy, duration, quizID) {
    try {
      const scoresRef = collection(db, "Scores"); // Direct reference to 'Scores' collection

      // Create a unique document ID for each score
      const newScoreRef = doc(scoresRef);

      // Create a score entry object
      const scoreEntry = {
        uid, // User's UID as the identifier
        accuracy, // Percentage score
        duration, // Duration taken for the quiz
        quizID,
        timestamp: Timestamp.now(),
      };

      await setDoc(newScoreRef, scoreEntry);

      // Log Firebase Analytics event
      logEvent(analytics, "upload_quiz_score", {
        source: "uploadQuizScore",
        uid,
        quizID,
        accuracy,
        duration,
      });

      console.log("Quiz score uploaded successfully:", scoreEntry);
    } catch (error) {
      console.error("Error uploading quiz score:", error);
      throw new Error("Failed to upload quiz score");
    }
  }
}

const quizDatabase = new QuizDatabase();
export { quizDatabase };
