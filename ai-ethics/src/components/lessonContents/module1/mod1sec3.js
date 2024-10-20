// lessonContents/Module1Lesson.js
import React from 'react';
import './mod1sec3.css'
import WhyAIEthicsMatters from './mod1images/WhyAIEthicsMatters.png'

const Mod1Sec3 = () => {
    // js goes here
  return (
    <>
        <div className="mod1sec3-container">
            <h2>Why AI Ethics Matters</h2>

            <div className="txt-img-container">
                <img src={WhyAIEthicsMatters} alt="" />
            </div>
        </div>
    </>
  );
};

export default Mod1Sec3;
