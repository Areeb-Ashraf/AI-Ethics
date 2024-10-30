// lessonContents/Module1Lesson.js
import React from 'react';
import './mod1sec3.css'
import WhyAIEthicsMatters from './mod1images/WhyAIEthicsMatters.png'
import transparancy from './mod1images/transparancy.png'

const Mod1Sec3 = () => {
    // js goes here
  return (
    <>
        <div className="mod1sec3-container">
            <h2>Why AI Ethics Matters</h2>

            <div className="txt-img-container">
                <div>
                <p>Artificial intelligence (AI) is no longer just a buzzword or a futuristic technology; it has become an integral part of our daily lives, influencing how we communicate, work, shop, and receive medical care, among other activities. As AI systems become more deeply embedded into the fabric of society, the ethical implications of their usage have grown into a significant concern. AI's rapid advancement brings with it the potential for both great benefits and serious harm, particularly when used in areas like healthcare, law enforcement, hiring practices, and social services. This makes AI ethics crucial in shaping how this technology is developed and used.</p>
                <p>The need for ethical AI is not just theoretical—it is rooted in real-world examples of AI systems influencing life-altering decisions. From loan approvals to job screenings and even criminal sentencing, AI algorithms are increasingly playing roles that can have lasting, profound consequences on people's lives. When AI is used to make these decisions, it becomes imperative to ensure that the systems are designed and implemented in ways that are fair, transparent, accountable, safe, and respectful of privacy. Without these ethical safeguards, AI could exacerbate social inequalities, compromise individual rights, and cause harm on a global scale.</p>
                </div>
                <img src={WhyAIEthicsMatters} alt="WhyAIEthicsMatters-Flowchart" />
            </div>

            <h3>1. Transparency: Understanding AI Decision-Making</h3>
            <div className="txt-img-container">
                <img src={transparancy} alt="transparancy-img" />
                <div>
                    <p>Transparency in AI refers to the ability of a system to explain how it arrives at a decision. This is particularly important for users and stakeholders who are affected by the decisions of AI systems. The "black box" nature of many AI models, particularly deep learning algorithms, makes it difficult to understand their decision-making processes. This opacity raises concerns in sectors such as healthcare and law, where decisions need to be scrutinized and explained.</p>
                    <p>For example, if an AI system recommends a particular medical treatment or diagnosis, both the patient and the healthcare provider have a right to understand the basis for that recommendation. Lack of transparency can erode trust in AI and can even lead to dangerous outcomes if people follow decisions they don’t fully understand.</p>
                </div>
            </div>
            <p>Efforts to improve transparency include developing explainable AI (XAI), which aims to make AI systems more interpretable and understandable by humans. XAI methods could help provide insights into the features that influence decisions, thus enabling users to better comprehend the rationale behind AI-generated outcomes. This is crucial for maintaining trust in AI and ensuring that the technology is used responsibly.</p>
            
        </div>
    </>
  );
};

export default Mod1Sec3;
