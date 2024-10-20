// lessonContents/Module1Lesson.js
import React from 'react';
import "../styles/quiz.css";

const Quiz = () => {
  return (
    <>
        <div className="progress-bar">
            <div className="progress"></div>
        </div> 
        <div className="question-container">
            <div className="question-number">Question 1</div>
            <div className="question-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, earum! Omnis temporibus explicabo consectetur corrupti dignissimos recusandae necessitatibus distinctio assumenda maiores ut odit, qui blanditiis magnam iusto, repudiandae aliquid cupiditate architecto. Voluptate debitis consequuntur totam id sequi dolores aliquam laudantium, nemo repellat at quibusdam repudiandae possimus ullam minus odio quam maiores doloribus, corporis libero a dolor quod aliquid quaerat. Vitae ducimus illo itaque eaque molestias, alias possimus quo voluptates sapiente dolorem expedita accusamus! Nisi error quo temporibus dolores ipsum vitae possimus animi facere soluta, rem id consequatur reiciendis ad cumque deserunt quod adipisci architecto necessitatibus consectetur accusantium laboriosam! Incidunt, perferendis.</div>
        </div>
        <div className="options-container">
            <div className="option"><span className='option-radio'></span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, pariatur?</div>
            <div className="option"><span className='option-radio2'></span></div>
            <div className="option"></div>
            <div className="option"></div>
        </div>
    </>
  );
};

export default Quiz;
