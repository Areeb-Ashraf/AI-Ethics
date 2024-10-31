// lessonContents/Module1Lesson.js
import React from 'react';
import './mod1.css'

const Mod1Sec2 = () => {
    return (
      <div className="mod1sec2-content">
            <h3>What is AI Ethics</h3>
            <p>
              Ethics may appear like an esoteric concept. So, before understanding “AI ethics,” let’s first focus on what ethics means.

              In short, ethics is a subfield of philosophy that provides us with a framework for deciding what is moral and what is not. While this may sound like an abstract concept, it takes on a specific meaning in the realm of technology—AI ethics is the application of moral frameworks to the development and use of artificial intelligence.
              Imagine a biased loan approval algorithm or an opaque facial recognition system. These are examples of how AI, without ethical considerations, can lead to unfair outcomes. AI ethics tackles these concerns head-on by establishing a set of guiding principles for responsible AI development.
              These principles aim to promote fairness, accountability, transparency, and privacy throughout the AI lifecycle. Data scientists can ensure this powerful technology benefits everyone fairly and responsibly by understanding and applying AI ethics.
            </p>

            <h3>Why is AI Ethics Important?</h3>
            <p>
              AI's capabilities are shaped by the data it's trained on. This data can include historical information, code, and other elements that may reflect societal biases or prejudices. If such biases are present, the AI could replicate or even amplify them in its outputs.
              Therefore, prioritizing ethical considerations throughout AI development is crucial. Let's consider the use of AI in analyzing patient data. By identifying patterns, AI can generate valuable insights that assist healthcare professionals. This can significantly improve review times and accuracy, leading to faster diagnoses, more effective treatment plans, and, ultimately, better patient outcomes with reduced stress.
              While AI offers tremendous potential to solve complex problems, its development and use raise ethical considerations. These concerns can be broadly categorized into short-term and long-term risks. We’ll delve deeper into each of these categories in the following sections.
            </p>
        </div>
    );
  };
  
  export default Mod1Sec2;