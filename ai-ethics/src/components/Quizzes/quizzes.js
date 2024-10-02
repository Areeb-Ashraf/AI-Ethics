import React, { useState } from 'react';
import './quizzes.css'; // You will style this based on the image you shared

const quizQuestions = [
  {
    question: "As a mobile app development company integrating artificial intelligence, you recognize the importance of accountability in your AI features. What action should your company prioritize to maintain accountability when using AI in your mobile app?",
    options: [
      { text: "Train users on how to control the AI", isCorrect: false },
      { text: "Fairness", isCorrect: false },
      { text: "Accountability", isCorrect: true },
      { text: "Wrong answer", isCorrect: false }
    ]
  }
];

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState('15m 10s'); // You can enhance this with a real timer

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10); // Increase score
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>AI Security Quiz 4</h2>
        <div className="quiz-timer">{timer}</div>
        <div className="quiz-xp">85 XP</div>
      </div>
      
      {showScore ? (
        <div className="quiz-score">
          <h3>Your Score: {score}</h3>
        </div>
      ) : (
        <div className="quiz-question-section">
          <h4>Question {currentQuestion + 1}</h4>
          <p>{quizQuestions[currentQuestion].question}</p>
          <div className="quiz-options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option.isCorrect)}
                className={option.isCorrect ? 'correct-option' : ''}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
