// lessonContents/Module1Lesson.js
import React from 'react';
import "../styles/quiz.css";
import quizTimer from './images/quizTimer.svg'
import quizXpBadge from './images/quizXpBadge.svg'

const Quiz = () => {
  return (
    <>
      <div className="quiz-container">
        <div className="question-container">
          <div className="quiz-progress-bar-container">
            <div className="quiz-progress-bar"><div className="quiz-progress"></div></div>
            <div className="quiz-progress-percentage">80%</div>
          </div>
          <div className="question-details-container">
            <div className="question-number">Question 5</div>
            <div className="question-timer-container">
              <div className="question-timer-img"><img src={quizTimer} alt="question-timer-img" /></div>
              <div className="question-timer">15m 10s</div>
            </div>
            <div className="question-xp-container">
              <div className="question-xp-img"><img src={quizXpBadge} alt="question-xp-img" /></div>
              <div className="question-xp">85XP</div>
            </div>
          </div>
          
          <div className="question">As a mobile app development company integrating artificial intelligence, you recognize the importance of accountability in your AI features. Users rely on the app for critical decisions, and any missteps could have serious consequences. To ensure users feel confident in your AI's decisions, you must choose a strategy that enhances transparency and trust. </div>

          <div className="question">What action should your company prioritize to maintain accountability when using AI in your mobile app?</div>
          
        </div>
        <div className="answers-container">
          <div className="answer-box">
            <div className="option-radio"></div>
            <div className='answer-text'>Train users on how to control the AI</div>
          </div>
          <div className="answer-box">
            <div className="option-radio"></div>
            <div className='answer-text'>Offer detailed explanations for AI decisions and outcomes</div>
          </div>
          <div className="answer-box">
            <div className="option-radio"></div>
            <div className='answer-text'>Minimize the use of AI in app features</div>
          </div>
          <div className="answer-box">
            <div className="option-radio"></div>
            <div className='answer-text'>Increase the complexity of the AI model</div>
          </div>

          <div className="quiz-nav-container">
            <div className="quiz-prev-btn">Previous</div>
            <div className="quiz-next-btn">Next</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;

