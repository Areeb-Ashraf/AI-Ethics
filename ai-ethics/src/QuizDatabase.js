import { db } from './firebase'; 
import { collection, getDocs, doc, setDoc } from "firebase/firestore"; // Import doc and setDoc

class QuizDatabase {
  // Function to get 10 random quiz questions from the ModuleOneQuizzes subcollection
  async getRandomQuizQuestions() {
    try {
      const moduleOneQuizzesCollection = collection(db, "Quizzes", "ModuleOne", "ModuleOneQuizzes");
      const quizSnapshot = await getDocs(moduleOneQuizzesCollection);
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

      return selectedQuizData;
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      throw new Error("Failed to fetch quiz data");
    }
  }

  // Optional: Function to get a specific quiz question by document ID
  async getQuizQuestionById(id) {
    try {
      const quizDocRef = doc(collection(db, "Quizzes", "ModuleOne", "ModuleOneQuizzes"), id);
      const quizDoc = await getDocs(quizDocRef);

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
  async uploadQuizScore(email, uid, score, timeTaken) {
    try {
      const scoresRef = collection(db, 'Scores');
      const moduleOneDocRef = doc(scoresRef, 'ModuleOne'); // Reference to ModuleOne document
      const moduleOneQuizScoresRef = collection(moduleOneDocRef, 'ModuleOneQuizScores');
  
      // Create a score entry object
      const scoreEntry = {
        email,
        uid,
        score,
        timeTaken,
        timestamp: new Date().toISOString(), // Optionally store the timestamp
      };
  
      // Use the user's UID as the document ID to ensure uniqueness
      const userScoreDocRef = doc(moduleOneQuizScoresRef, uid); // Reference the document using UID
  
      // Set the document (create or update)
      await setDoc(userScoreDocRef, scoreEntry); // This will create a new doc or update the existing one
  
      console.log('Quiz score uploaded successfully:', scoreEntry);
    } catch (error) {
      console.error('Error uploading quiz score:', error);
      throw new Error('Failed to upload quiz score');
    }
  }
  
}

const quizDatabase = new QuizDatabase();
export { quizDatabase };
