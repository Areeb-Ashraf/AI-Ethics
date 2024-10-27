import React, { useState } from 'react';
import "../styles/quiz.css";
import quizTimer from './images/quizTimer.svg';
import quizXpBadge from './images/quizXpBadge.svg';
import resultTrophy from './images/resultTrophy.svg';
import resultXpBadge from './images/resultXpBadge.svg';
import resultFinishSym from './images/resultFinishSym.svg';
import retake from './images/retake.svg';
import quizStart from './images/quizStart.svg';

/*
Notes For Backend

The JSON `quizQuestions` is how the questions must be formated for the quiz
Should the questions be in a file locally or in firebase storage? your call

This code has 3 "pages": The start page, the page that has the question and answers, and the results page



start page notes:

`start-title` is static, How do you make it dynamic?
[could just add a label in the json but Could not wrap my head around since im not sure how the data and quiz is going to be called in lesson.js]
gonna think about it later

`totalXP` is calculated dynamically but is repeated twice in the frontend, need to verify with designer and fix that

`num-of-questions` calculated dynamically

*NO Feature for `question-timer` has been implemented. Couldnt figure out what this is supposed to display, estimated time?

the start button, starts off the quiz



question and answers page notes:

`quiz-progress-bar` & `quiz-progress-percentage` dynamically displays progress 

`question-number`, `question-xp`, `question`, `answer-text` are rendered dynamically from `quizQuestions`

*NO Feature for `question-timer` has been implemented. Is it supposed to count up, count down? TBD

Also no feature implemented to randomize the questions from a question bank or reorder the answers randomly



result page notes:

`no-of-correct-ques`/ total questions are displayed dynamically

`results-xp` dynamically adds up the the score of the correct answers

`result-retake-btn` button goes to start page and user can do a reattempt

`result-finish-btn` does nothing




TO DO:

As soon as the quiz is submitted The following data should go to the database:

total no. of questions: {results.totalQuestions}
no of questions answered correctly: {results.correctAnswers}
total score: {results.score}
attept no: [how do you keep track of this?]

There has to be a way to verify & track which user is submitting the quiz 

How you want to structure this data, what more/less information you need, where you are going to put this data. Im going to leave all of this to you.

*/

const quizQuestions = [
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
  // vars to help navigate the quiz, keep track of progress, aswered questions, score
  const [startPage, setStartPage] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState({ correctAnswers: 0, totalQuestions: quizQuestions.length, score: 0 });
  
  // Calculating total number of questions and total XP
  const totalQuestions = quizQuestions.length;
  const totalXP = quizQuestions.reduce((acc, question) => acc + question.xp, 0);

  // Helper functions to navigate the quiz
  const startQuiz = () => {
    setStartPage(false);
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setSelectedOptions({});
  };

  const handleRetakeQuiz = () => {
    setStartPage(true);
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setSelectedOptions({});
    setResults({ correctAnswers: 0, totalQuestions: quizQuestions.length, score: 0 });
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    const correctAnswers = quizQuestions.reduce((total, question, index) => {
      const selectedOption = selectedOptions[index];
      return total + (question.options[selectedOption]?.isCorrect ? 1 : 0);
    }, 0);
    const score = quizQuestions.reduce((total, question, index) => {
      const selectedOption = selectedOptions[index];
      return total + (question.options[selectedOption]?.isCorrect ? question.xp : 0);
    }, 0);

    setResults({ correctAnswers, totalQuestions: quizQuestions.length, score });
    setIsSubmitted(true);
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
      {/* start page */}
      {startPage ? (
        <div className="quiz-start-page-container">
          <div className="start-title-container">
            <img src={quizStart} alt="quizStart-img" />
            <div className="start-title">Quiz 1</div>
          </div>
          <div className="timer-xp-start-container">
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
                <div className="question-xp">{totalXP} XP</div>
              </div>
          </div>
          <div className="start-quiz-deets-container">
             <div className="num-of-questions">{totalQuestions} Questions</div>
             <div className="total-XP">{totalXP} XP</div>                                                                                                                                                                                                                                                                               
          </div>
          <div className="start-text">Test your knowledge on AI Security!</div>
          <div className="start-text">You can retake it as many time as you would like.</div>
          <button onClick={startQuiz} className="start-quiz-btn">Start Quiz</button>
        </div>
      ) : isSubmitted ? (
        // results page
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
            <div className="result-retake-btn" onClick={handleRetakeQuiz}>
              <img className='retake-img' src={retake} alt="retake-img" />
              Retake
            </div>
          </div>
        </div>
      ) : (
        <>
        {/* main questions and answers page */}
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
                <div className="question-timer">15m 10s</div>
              </div>
              <div className="question-xp-container">
                <div className="question-xp-img">
                  <img src={quizXpBadge} alt="question-xp-img" />
                </div>
                <div className="question-xp">{currentQuestion.xp} XP</div>
              </div>
            </div>
            <div className="question">{currentQuestion.question}</div>
          </div>

          <div className="answers-container">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`answer-box ${selectedOptions[currentQuestionIndex] === index ? "selected-answer" : ""}`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="option-radio"></div>
                <div className="answer-text">{option.text}</div>
              </div>
            ))}

            <div className="quiz-nav-container">
              {currentQuestionIndex > 0 && (
                <div className="quiz-prev-btn" onClick={handlePrevious}>Previous</div>
              )}
              <div className="quiz-next-btn" onClick={handleNext}>
                {currentQuestionIndex === quizQuestions.length - 1 ? "Submit" : "Next"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
