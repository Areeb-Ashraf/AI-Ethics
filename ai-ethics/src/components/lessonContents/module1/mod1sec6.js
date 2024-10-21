// lessonContents/Module1Lesson.js
import React from 'react';
import './mod1sec6.css'

const Mod1Sec6 = () => {
    return (
      <div className="mod1sec6-content">

            <h3>Ethical AI in Environmental Sustainability</h3>
            <div className="accountability-container">
                <p>
                    Another area where AI ethics plays a critical role is environmental sustainability. AI has the potential to contribute significantly to efforts aimed at combating climate change, managing natural resources, and protecting biodiversity. AI technologies can optimize energy usage, reduce waste, and predict environmental disasters, leading to more effective interventions. For example, AI algorithms can analyze satellite imagery to monitor deforestation or track changes in air quality, providing policymakers with valuable data to make informed decisions.
                    However, ethical dilemmas arise when using AI for environmental purposes. One primary concern is the carbon footprint of AI itself. Training large-scale AI models require significant computational power, which, in turn, consumes vast amounts of energy. If not carefully managed, the environmental cost of developing and deploying AI could outweigh its benefits. It is essential to balance AI innovation with sustainability practices to ensure that the technologies we create do not exacerbate the environmental challenges we aim to solve.
                </p>
                <img src={require('./mod1images/Environmental.png')} alt="Environmental" className="environmental-img" />
            </div>
            <h3>Why is AI Ethics Important?</h3>
            <p>
              AI's capabilities are shaped by the data it's trained on. This data can include historical information, code, and other elements that may reflect societal biases or prejudices. If such biases are present, the AI could replicate or even amplify them in its outputs.
              Therefore, prioritizing ethical considerations throughout AI development is crucial. Let's consider the use of AI in analyzing patient data. By identifying patterns, AI can generate valuable insights that assist healthcare professionals. This can significantly improve review times and accuracy, leading to faster diagnoses, more effective treatment plans, and, ultimately, better patient outcomes with reduced stress.
              While AI offers tremendous potential to solve complex problems, its development and use raise ethical considerations. These concerns can be broadly categorized into short-term and long-term risks. We’ll delve deeper into each of these categories in the following sections.
            </p>
        </div>
    );
  };
  
  export default Mod1Sec6;