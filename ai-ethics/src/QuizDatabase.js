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

  // Function to upload quiz score directly under the 'Scores' collection
  async uploadQuizScore(uid, accuracy, duration) {
    try {
      const scoresRef = collection(db, 'Scores'); // Direct reference to 'Scores' collection

      // Create a unique document ID for each score
      const newScoreRef = doc(scoresRef); 
      
      // Create a score entry object
      const scoreEntry = {
        uid, // User's UID as the identifier
        accuracy, // Percentage score
        duration, // Duration taken for the quiz
        timestamp: new Date().toISOString() // Store the timestamp
      };

      await setDoc(newScoreRef, scoreEntry);

      console.log('Quiz score uploaded successfully:', scoreEntry);
    } catch (error) {
      console.error('Error uploading quiz score:', error);
      throw new Error('Failed to upload quiz score');
    }
  }
}

const quizDatabase = new QuizDatabase();
export { quizDatabase };
