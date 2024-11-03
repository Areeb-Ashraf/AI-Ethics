import React, { useState, useEffect, useCallback } from 'react';
import "../styles/quiz.css";
import quizTimer from './images/quizTimer.svg';
import resultTrophy from './images/resultTrophy.svg';
import resultFinishSym from './images/resultFinishSym.svg';
import retake from './images/retake.svg';
import quizStart from './images/quizStart.svg';
import { quizDatabase } from '../QuizDatabase';
import { getAuth } from 'firebase/auth';

const Quiz = () => {
  const [startPage, setStartPage] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState({ correctAnswers: 0, totalQuestions: 0 });
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [timeTaken, setTimeTaken] = useState(0); // Stores the time taken to complete the quiz

  const fetchQuizQuestions = async () => {
    try {
      const fetchedQuestions = await quizDatabase.getRandomQuizQuestions('Introduction');
      setQuizQuestions(fetchedQuestions);
      setResults(prevResults => ({
        ...prevResults,
        totalQuestions: fetchedQuestions.length
      }));
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  const startQuiz = () => {
    setStartPage(false);
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setSelectedOptions({});
    setResults({ correctAnswers: 0, totalQuestions: quizQuestions.length });
    setTimeLeft(10 * 60); // reset timer to 10 minutes
  };

  const handleSubmit = useCallback(async () => {
    const correctAnswers = quizQuestions.reduce((total, question, index) => {
      const selectedOption = selectedOptions[index];
      return total + (question.correctAnswer === String.fromCharCode(65 + selectedOption) ? 1 : 0);
    }, 0);

    const accuracy = Math.round((correctAnswers / quizQuestions.length) * 100);
    const duration = 10 * 60 - timeLeft;
    const quizID = 'Introduction';

    setResults({ correctAnswers, totalQuestions: quizQuestions.length });
    setIsSubmitted(true);
    setTimeTaken(duration); // Store the time taken

    try {
      const auth = getAuth();
      const uid = auth.currentUser ? auth.currentUser.uid : null;

      if (uid) {
        await quizDatabase.uploadQuizScore(uid, accuracy, duration, quizID);
        console.log('Quiz score uploaded successfully.');
      } else {
        console.warn('User not logged in. Quiz score not uploaded.');
      }
    } catch (error) {
      console.error('Error uploading quiz score:', error);
    }
  }, [quizQuestions, selectedOptions, timeLeft]);

  useEffect(() => {
    if (!startPage && timeLeft > 0 && !isSubmitted) {
      const timerId = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit(); // Auto-submit if time runs out
    }
  }, [timeLeft, startPage, isSubmitted, handleSubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleRetakeQuiz = () => {
    setStartPage(true);
    fetchQuizQuestions();
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const progress = (currentQuestionIndex / quizQuestions.length) * 100;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {startPage ? (
        <div className="quiz-start-page-container">
          <div className="start-title-container">
            <img src={quizStart} alt="quizStart-img" />
            <div className="start-title">Quiz 1</div>
          </div>
          <div className="start-quiz-deets-container">
            <div className="num-of-questions">{quizQuestions.length} Questions</div>
          </div>
          <div className="start-text">Test your knowledge on AI Security!</div>
          <button onClick={startQuiz} className="start-quiz-btn">Start Quiz</button>
        </div>
      ) : isSubmitted ? (
        <div className="results-page">
          <div className="no-of-correct-ques-container">
            <img src={resultTrophy} alt="resultTrophy-img" />
            <div className="no-of-correct-ques">
              {results.correctAnswers} / {results.totalQuestions}
            </div>
          </div>
          <div className="Great-Job">Great Job!</div>
          <div className="result-text">You finished the quiz in {formatTime(timeTaken)}.</div>
          <div className="result-buttons-container">
            <div className="result-finish-btn">
              <img className='resultFinishSym-img' src={resultFinishSym} alt="resultFinishSym-img" />
              Finish Module
            </div>
            <div className="result-retake-btn" onClick={handleRetakeQuiz}>
              <img className='retake-img' src={retake} alt="retake-img" />
              Retake
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="question-container">
            <div className="quiz-progress-bar-container">
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: progress === 100 ? "green" : "#0056D1",
                  }}
                ></div>
              </div>
              <div className="quiz-progress-percentage">{Math.round(progress)}%</div>
            </div>
            <div className="question-details-container">
              <div className="question-number">Question {currentQuestionIndex + 1}</div>
              <div className="question-timer-container">
                <div className="question-timer-img">
                  <img src={quizTimer} alt="question-timer-img" />
                </div>
                <div className="question-timer">{formatTime(timeLeft)}</div>
              </div>
            </div>
            <div className="question">{currentQuestion.question}</div>
          </div>

          <div className="answers-container">
            {currentQuestion.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              return (
                <div
                  key={index}
                  className={`answer-box ${selectedOptions[currentQuestionIndex] === index ? 'selected-answer' : ''}`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="option-radio"></div>
                  <span className="answer-text">{`${optionLetter}: ${option}`}</span>
                </div>
              );
            })}

            <div className="quiz-nav-container">
              <button className="quiz-prev-btn" disabled={currentQuestionIndex === 0} onClick={handlePrevious}>
                Previous
              </button>
              <button className="quiz-next-btn" onClick={handleNext}>
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
