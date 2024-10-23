// lessonContents/Module1Lesson.js
import React from 'react';
import "../styles/quiz.css";

const Quiz = () => {
  return (
    <>
      <div className="quiz-container">
        <div className="question-container">
          <div className="quiz-progress-bar"><div className="quiz-progress"></div></div>
          <div className="question-number">Question 5</div>
        </div>
        <div className="answers-container"></div>
      </div>
    </>
  );
};

export default Quiz;

