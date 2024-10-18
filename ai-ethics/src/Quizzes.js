import React, { useState, useEffect, useCallback } from 'react';
import { quizDatabase } from './QuizDatabase'; // Import the QuizDatabase instance
import { auth } from './firebase'; // Import the Firebase auth instance
import './Quizzes.css'; // Import the CSS for styling

const Quizzes = () => {
  const [quizStarted, setQuizStarted] = useState(false); // Track whether quiz has started
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null); // Null before quiz is completed
  const [user, setUser] = useState(null); // Track authenticated user
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes
  const [timeFinished, setTimeFinished] = useState(null); // Track the time left when the quiz is submitted

  // Fetch random quiz questions
  const fetchQuizQuestions = async () => {
    try {
      const questions = await quizDatabase.getRandomQuizQuestions(); // Get 10 random questions
      setQuizQuestions(questions);
    } catch (error) {
      console.error('Failed to fetch quiz questions:', error);
      setQuizQuestions([]); // Ensure it's at least an empty array
    }
  };

  // Fetch quiz questions when the component mounts
  useEffect(() => {
    fetchQuizQuestions();

    // Check for the current authenticated user
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  // Map letter answers to numeric options
  const answerLetterToIndex = (letter) => {
    const map = { A: 0, B: 1, C: 2, D: 3 };
    return map[letter];
  };

  // Handle user's answer selection
  const handleAnswerSelection = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Calculate the score when the quiz is submitted
  const calculateScore = useCallback(async () => {
    let correctAnswers = 0;

    quizQuestions.forEach((question) => {
      const correctAnswerIndex = answerLetterToIndex(question.correctAnswer);
      if (userAnswers[question.id] === correctAnswerIndex) {
        correctAnswers += 1;
      }
    });

    const totalQuestions = quizQuestions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    // Capture the time left when the quiz is submitted
    setTimeFinished(timeLeft);

    // Now upload the score to Firestore
    if (user) {
      const email = user.email; // Get the user's email
      const uid = user.uid; // Get the user's UID

      try {
        await quizDatabase.uploadQuizScore(email, uid, correctAnswers, 600 - timeLeft); // Time taken
        console.log('Score uploaded successfully!');
      } catch (error) {
        console.error('Failed to upload score:', error);
      }
    } else {
      console.log('User is not authenticated, cannot upload score.');
    }

    setScore({
      correctAnswers,
      totalQuestions,
      percentage,
    });
  }, [quizQuestions, userAnswers, timeLeft, user]); // Add user to dependencies

  // Reset the quiz and fetch a new set of questions
  const resetQuiz = () => {
    setUserAnswers({});
    setScore(null);
    setQuizStarted(false); // Return to initial view
    setTimeLeft(600); // Reset the timer
    setTimeFinished(null); // Reset the finished time
    fetchQuizQuestions(); // Fetch a new set of 10 random questions
  };

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(600); // Start the 10-minute timer when the quiz starts
  };

  // Handle timer countdown
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Clean up the interval
    } else if (timeLeft === 0 && score === null) {
      calculateScore(); // Automatically submit the quiz when time runs out
    }
  }, [quizStarted, timeLeft, score, calculateScore]); // Include calculateScore in the dependency array

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate the time taken (total time - time left)
  const calculateTimeTaken = () => {
    const timeTaken = 600 - timeFinished; // 600 is the total quiz time
    return formatTime(timeTaken);
  };

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        // Initial view with start button
        <div className="quiz-start-box">
          <h1>AI Racial Bias</h1>
          {user ? (
            <button className="start-btn" onClick={startQuiz}>
              Start Quiz
            </button>
          ) : (
            <p>Please log in to access the quiz.</p>
          )}
        </div>
      ) : score === null ? (
        <div>
          <div className="timer">
            <p>Time left: {formatTime(timeLeft)}</p>
          </div>
          {quizQuestions && quizQuestions.length > 0 ? ( // Ensure quizQuestions is valid
            quizQuestions.map((question, index) => (
              <div key={question.id} className="question-block">
                <h3>
                  {index + 1}. {question.question}
                </h3>
                <div className="options">
                  {question.options && question.options.length > 0 ? ( // Ensure options array exists
                    question.options.map((option, i) => (
                      <label key={i} className="option-label">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={i}
                          checked={userAnswers[question.id] === i}
                          onChange={() => handleAnswerSelection(question.id, i)}
                        />
                        {option}
                      </label>
                    ))
                  ) : (
                    <p>No options available</p> // Handle case where options are missing
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Loading questions...</p> // Display a loading message if no questions yet
          )}
          <button className="submit-btn" onClick={calculateScore}>
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="result-block">
          <h2>Quiz Results</h2>
          <p>
            You got {score.correctAnswers} out of {score.totalQuestions} correct.
          </p>
          <p>Your score: {score.percentage.toFixed(2)}%</p>
          <p>Time taken: {calculateTimeTaken()}</p>
          <button className="reset-btn" onClick={resetQuiz}>
            Take Quiz Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
