import { db, analytics } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore"; // Import doc and setDoc
import { logEvent } from "firebase/analytics";

class QuizDatabase {
  // Function to get 10 random quiz questions from any module
  async getRandomQuizQuestions(moduleName) {
    try {
      const quizCollection = collection(
        db,
        "Quizzes",
        moduleName,
        `${moduleName}Quizzes`
      );
      const quizSnapshot = await getDocs(quizCollection);
      const quizData = [];

      // Iterate through each document in the collection
      quizSnapshot.forEach((doc) => {
        quizData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // Shuffle the array of questions and select 10 random ones
      const shuffledQuizData = quizData.sort(() => 0.5 - Math.random());
      const selectedQuizData = shuffledQuizData.slice(0, 10); // Get the first 10 shuffled questions

      // Log Firebase Analytics event
      logEvent(analytics, "fetch_random_quiz_questions", {
        source: "getRandomQuizQuestions",
        moduleName,
        quizCount: selectedQuizData.length,
      });

      return selectedQuizData;
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      throw new Error("Failed to fetch quiz data");
    }
  }

  // Function to get all quizzes from all modules
  async getAllQuizzes() {
    try {
      const allQuizzes = {};
      const modules = ["Introduction", "ModuleOne"]; // Add more modules here as necessary

      // Loop through each module and get quiz questions
      for (const moduleName of modules) {
        const moduleQuizzes = await this.getRandomQuizQuestions(moduleName);
        allQuizzes[moduleName] = moduleQuizzes;
      }

      // Log Firebase Analytics event
      logEvent(analytics, "fetch_all_quizzes", {
        source: "getAllQuizzes",
        modules: modules.join(", "),
        quizCount: Object.keys(allQuizzes).length,
      });

      return allQuizzes;
    } catch (error) {
      console.error("Error fetching all quizzes:", error);
      throw new Error("Failed to fetch all quizzes");
    }
  }

  // Optional: Function to get a specific quiz question by document ID
  async getQuizQuestionById(moduleName, id) {
    try {
      const quizDocRef = doc(
        collection(db, "Quizzes", moduleName, `${moduleName}Quizzes`),
        id
      );
      const quizDoc = await getDocs(quizDocRef);

      // Log Firebase Analytics event
      logEvent(analytics, "fetch_quiz_by_id", {
        source: "getQuizQuestionById",
        moduleName,
        quizID: id,
        found: quizDoc.exists(),
      });

      if (quizDoc.exists) {
        return quizDoc.data();
      } else {
        console.log("No such quiz question exists!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching quiz question by ID:", error);
      throw new Error("Failed to fetch quiz question");
    }
  }

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
