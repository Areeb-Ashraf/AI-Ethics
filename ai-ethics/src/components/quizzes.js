import React, { useState } from 'react';
import '../styles/quizzes.css'

// Sample quiz data - you can replace this with your actual quiz data
const quizQuestions = [
  {
    moduleTitle: "Module 1 Quiz",
    questions: [
      {
        question: "What is AI?",
        options: [
          { text: "Artificial Intelligence", isCorrect: true },
          { text: "Automated Intelligence", isCorrect: false },
          { text: "Accurate Intelligence", isCorrect: false }
        ]
      },
      {
        question: "Which of the following is a key aspect of AI Ethics?",
        options: [
          { text: "Accountability", isCorrect: true },
          { text: "Speed", isCorrect: false }
        ]
      }
    ]
  },
  {
    moduleTitle: "Module 2 Quiz",
    questions: [
      {
        question: "What is the importance of AI ethics?",
        options: [
          { text: "Ensuring accountability", isCorrect: true },
          { text: "Making AI faster", isCorrect: false }
        ]
      }
    ]
  }
];

const Quizzes = ({ selectedModule }) => {
  // Always declare hooks at the top of the component
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // Check if the selected module is valid
  if (selectedModule === null || selectedModule === undefined || !quizQuestions[selectedModule]) {
    return <div className="quiz-error">Please select a valid module to view the quiz.</div>;
  }

  const currentQuiz = quizQuestions[selectedModule]; // This will dynamically load the quiz for the selected module

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < currentQuiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{currentQuiz.moduleTitle}</h2>
      </div>
      
      {showScore ? (
        <div className="quiz-score-section">
          <h3>Your Score: {score} out of {currentQuiz.questions.length}</h3>
        </div>
      ) : (
        <div className="quiz-content">
          <h4>Question {currentQuestion + 1}</h4>
          <p>{currentQuiz.questions[currentQuestion].question}</p>
          <div className="quiz-options">
            {currentQuiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option.isCorrect)}
                className="quiz-option"
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