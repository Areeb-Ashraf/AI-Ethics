// lessonContents/Module1Lesson.js
import React from 'react';
import './mod1sec4.css'

const Mod1Sec4 = () => {
    return (
      <div className="mod1sec4-content">

            <h3>2. Accountability: Who Takes Responsibility?</h3>
            <div className="accountability-container">
            <img src={require('./mod1images/Accountability.png')} alt="Accountability" className="accountability-img" />
            <p>
            Accountability is another fundamental component of AI ethics, and it addresses the question of who is responsible when an AI system causes harm. If an AI system makes an incorrect diagnosis, wrongly denies a loan, or perpetuates bias in hiring, who is to blame? Is it the developer, the organization that implemented the AI, or the AI system itself?
            In many cases, it is difficult to assign accountability due to the complexity and autonomy of AI systems. However, it is essential that developers and organizations take responsibility for the outcomes produced by their AI systems. This includes being proactive in monitoring and correcting any harmful impacts, as well as establishing clear guidelines for how AI should be used ethically.
            Moreover, governments and regulatory bodies need to establish policies that clearly define accountability in the context of AI. This might include setting standards for AI development, requiring regular audits, and enforcing penalties for harmful or unethical AI practices. Without clear accountability, organizations may be less motivated to address potential harms, leading to significant societal risks.
            </p>
          </div>

            <h3>3. Safety: Ensuring No Harm</h3>
            <p>
            AI systems must also be designed with safety in mind, ensuring that they do not cause harm to users or society. This includes physical harm, such as the potential dangers posed by autonomous vehicles, as well as more subtle forms of harm, such as emotional or psychological distress.
            For instance, AI-powered social media algorithms are designed to maximize user engagement, but they have also been linked to increased mental health issues, such as anxiety and depression, by exposing users to harmful content. AI-driven recommendations, if not carefully controlled, can lead to the spread of misinformation, which in turn can influence public opinion and behavior in dangerous ways.
            Safety must be a top priority in AI development, with developers taking steps to identify and mitigate risks before systems are deployed. This includes rigorous testing, safety certifications, and ongoing monitoring of AI systems once they are in use.
            </p>
        
            <h3>4. Privacy: Protecting Personal Data</h3>

            <div className="dataprotect-container">
              <img src={require('./mod1images/Data Protection.png')} alt="DataProtection" className="dataprotect-img" />
              <p>
              Lastly, AI ethics must address the issue of privacy. AI systems often rely on large amounts of personal data to function effectively, raising concerns about how this data is collected, stored, and used. Users must have control over their personal information, and data protection practices must be in place to prevent unauthorized access or misuse.
              Moreover, AI systems should be designed to minimize the amount of personal data they require, using techniques such as data anonymization and differential privacy. By respecting user privacy, AI systems can build trust and ensure that individuals feel safe and secure when interacting with the technology.
              </p>
            </div>
        </div>
    );
  };
  
  export default Mod1Sec4;