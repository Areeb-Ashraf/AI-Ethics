import React, { useState } from 'react';
import "../styles/quiz.css";
import quizTimer from './images/quizTimer.svg';
import quizXpBadge from './images/quizXpBadge.svg';

const questions = [
  {
    question: "What is a key concern in AI Ethics related to data privacy?",
    options: ["Data anonymization", "Increased transparency", "Both of the above"],
    xp: 50
  },
  {
    question: "True or False: Bias in AI algorithms only occurs due to biased data.",
    options: ["True", "False"],
    xp: 30
  },
  {
    question: "Which of the following is essential for ensuring accountability in AI development?",
    options: ["Model explainability", "Continuous monitoring", "Strict data policies", "All of the above"],
    xp: 70
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progressPercentage = Math.round(((currentQuestion + 1) / questions.length) * 100);
  
  return (
    <>
      <div className="quiz-container"> 
        <div className="question-container">
          <div className="quiz-progress-bar-container">
            <div className="quiz-progress-bar">
              <div 
                className="quiz-progress" 
                style={{
                  width: `${progressPercentage}%`,
                  backgroundColor: progressPercentage === 100 ? 'green' : '#0056D1'
                }}
              ></div>
            </div>
            <div className="quiz-progress-percentage">{progressPercentage}%</div>
          </div>

          <div className="question-details-container">
            <div className="question-number">Question {currentQuestion + 1}</div>
            <div className="question-timer-container">
              <div className="question-timer-img"><img src={quizTimer} alt="question-timer-img" /></div>
              <div className="question-timer">15m 10s</div>
            </div>
            <div className="question-xp-container">
              <div className="question-xp-img"><img src={quizXpBadge} alt="question-xp-img" /></div>
              <div className="question-xp">{questions[currentQuestion].xp}XP</div>
            </div> 
          </div>
          
          <div className="question">{questions[currentQuestion].question}</div>  
        </div>

        <div className="answers-container">
          {questions[currentQuestion].options.map((option, index) => (
            <div className="answer-box" key={index}>
              <div className="option-radio"></div>
              <div className="answer-text">{option}</div>
            </div>
          ))}
          
          <div className="quiz-nav-container">
            <div 
              className="quiz-prev-btn" 
              onClick={handlePrev}
              style={{ visibility: currentQuestion === 0 ? 'hidden' : 'visible' }}
            >
              Previous
            </div>
            <div 
              className="quiz-next-btn" 
              onClick={handleNext}
              style={{ visibility: currentQuestion === questions.length - 1 ? 'hidden' : 'visible' }}
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
