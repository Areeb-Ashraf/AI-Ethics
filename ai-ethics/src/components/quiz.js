import React, { useState } from 'react';
import "../styles/quiz.css";
import quizTimer from './images/quizTimer.svg';
import quizXpBadge from './images/quizXpBadge.svg';
import resultTrophy from './images/resultTrophy.svg';
import resultXpBadge from './images/resultXpBadge.svg';
import resultFinishSym from './images/resultFinishSym.svg';
import retake from './images/retake.svg';

const quizData = [
  {
    question: "What is a crucial principle for responsible AI development?",
    options: [
      { text: "Fairness", isCorrect: true },
      { text: "Profitability", isCorrect: false },
    ],
    xp: 50
  },
  {
    question: "True or False: AI systems should prioritize transparency over security.",
    options: [
      { text: "True", isCorrect: false },
      { text: "False", isCorrect: true },
    ],
    xp: 40
  },
  {
    question: "What action best supports accountability in AI use?",
    options: [
      { text: "Ensure model complexity", isCorrect: false },
      { text: "Explain AI decisions", isCorrect: true },
      { text: "Limit AI usage", isCorrect: false },
    ],
    xp: 60
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleNext = () => setCurrentQuestion((prev) => prev + 1);
  const handlePrev = () => setCurrentQuestion((prev) => prev - 1);

  const handleSubmit = () => setIsSubmitted(true);

  const calculateResults = () => {
    let correctAnswers = 0;
    let score = 0;
    quizData.forEach((q, index) => {
      if (q.options[selectedAnswers[index]]?.isCorrect) {
        correctAnswers++;
        score += q.xp;
      }
    });
    return { totalQuestions: quizData.length, correctAnswers, score };
  };

  const { question, options, xp } = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  const results = isSubmitted ? calculateResults() : null;

  return (
    <div className="quiz-container">
      {isSubmitted ? (
        <div className="results-page">
          <div className="no-of-correct-ques-container">
            <img src={resultTrophy} alt="resultTrophy-img" />
            <div className="no-of-correct-ques">
              {results.correctAnswers} / {results.totalQuestions}
            </div>
          </div>
          <div className="results-xp-container">
            <img className='results-xp-img' src={resultXpBadge} alt="resultXpBadge-img" />
            <div className="results-xp">{results.score} XP</div>
          </div>
          <div className="Great-Job">Great Job!</div>
          <div className="result-text">You finished the quiz.</div>
          <div className="result-buttons-container">
            <div className="result-finish-btn">
                <img className='resultFinishSym-img' src={resultFinishSym} alt="resultFinishSym-img" />
                Finish Module
              </div>
            <div className="result-retake-btn">
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
              <div className="question-number">Question {currentQuestion + 1}</div>
              <div className="question-timer-container">
                <div className="question-timer-img">
                  <img src={quizTimer} alt="question-timer-img" />
                </div>
                <div className="question-timer">15m 10s</div>
              </div>
              <div className="question-xp-container">
                <div className="question-xp-img">
                  <img src={quizXpBadge} alt="question-xp-img" />
                </div>
                <div className="question-xp">{xp} XP</div>
              </div>
            </div>
            <div className="question">{question}</div>
          </div>

          <div className="answers-container">
            {options.map((option, index) => (
              <div
                key={index}
                className={`answer-box ${
                  selectedAnswers[currentQuestion] === index ? "selected-answer" : ""
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="option-radio"></div>
                <div className="answer-text">{option.text}</div>
              </div>
            ))}

            <div className="quiz-nav-container">
              {currentQuestion > 0 && (
                <div className="quiz-prev-btn" onClick={handlePrev}>
                  Previous
                </div>
              )}
              {currentQuestion < quizData.length - 1 ? (
                <div className="quiz-next-btn" onClick={handleNext}>
                  Next
                </div>
              ) : (
                <div className="quiz-next-btn" onClick={handleSubmit}>
                  Submit
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
