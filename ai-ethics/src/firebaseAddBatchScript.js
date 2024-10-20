import React, { useState } from "react";
import { db } from "./firebase";
import { writeBatch, collection, doc } from "firebase/firestore";

const AddQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addQuestions = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const batch = writeBatch(db);

      const questions = [
        {
          correctAnswer: "B",
          options: [
            "The technical capabilities of AI",
            "The application of moral frameworks to AI technologies",
            "The economic impact of AI",
            "The marketing strategies for AI products",
          ],
          question: "What does AI ethics primarily focus on?",
          questionPic: "",
          questionType: "multiple",
        },
        {
          correctAnswer: "B",
          options: ["Fairness", "Speed", "Transparency", "Accountability"],
          question:
            "Which of the following is NOT a principle emphasized in AI ethics?",
          questionPic: "",
          questionType: "multiple",
        },
        {
          correctAnswer: "C",
          options: [
            "Improved performance",
            "Increased efficiency",
            "Perpetuation of bias and discrimination",
            "Enhanced user experience",
          ],
          question:
            "What is a significant concern when AI systems are trained on biased data?",
          questionPic: "",
          questionType: "multiple",
        },
        {
          correctAnswer: "B",
          options: [
            "Enhancing the speed of AI systems",
            "Making AI decision-making processes more interpretable",
            "Reducing the computational power required by AI",
            "Improving the aesthetics of AI interfaces",
          ],
          question: "Explainable AI (XAI) is aimed at:",
          questionPic: "",
          questionType: "multiple",
        },
        {
          correctAnswer: "C",
          options: [
            "The user of the AI",
            "The AI system itself",
            "The developers and organizations behind the AI",
            "Regulatory bodies",
          ],
          question:
            "Who is typically held accountable when an AI system causes harm?",
          questionPic: "",
          questionType: "multiple",
        },
        {
          correctAnswer: "True",
          options: ["True", "False"],
          question:
            "True or False: AI ethics addresses issues such as bias, discrimination, and the protection of individual rights.",
          questionPic: "",
          questionType: "true_false",
        },
        {
          correctAnswer: "False",
          options: ["True", "False"],
          question:
            "True or False: AI systems do not require any personal data to function effectively.",
          questionPic: "",
          questionType: "true_false",
        },
        {
          correctAnswer: "True",
          options: ["True", "False"],
          question:
            "True or False: Transparency in AI decision-making is important for building trust in AI systems.",
          questionPic: "",
          questionType: "true_false",
        },
        {
          correctAnswer: "False",
          options: ["True", "False"],
          question:
            "True or False: The ethical implications of AI are only theoretical and do not have real-world applications.",
          questionPic: "",
          questionType: "true_false",
        },
        {
          correctAnswer: "True",
          options: ["True", "False"],
          question:
            "True or False: Ethical AI practices can help improve lives and contribute to the public good.",
          questionPic: "",
          questionType: "true_false",
        },
        {
          question:
            "A healthcare provider uses an AI system to determine treatment options for patients. However, the AI system has been found to favor certain demographic groups over others in its recommendations.\n\nWhat ethical principle is being violated in this scenario?",
          correctAnswer: "B",
          options: ["Privacy", "Fairness", "Safety", "Transparency"],
          questionPic: "",
          questionType: "scenario",
        },
        {
          question:
            "An AI algorithm used for hiring decisions has been criticized for excluding qualified candidates based on their gender.\n\nWhat should the organization do to align with AI ethics?",
          correctAnswer: "B",
          options: [
            "Ignore the criticism and continue using the algorithm",
            "Analyze the algorithm for bias and make necessary adjustments",
            "Replace all hiring algorithms with human judgment",
            "Increase the algorithm's speed",
          ],
          questionPic: "",
          questionType: "scenario",
        },
        {
          question:
            "A self-driving car makes a decision that results in an accident. After the incident, the car manufacturer claims that the AI system is responsible for the crash.\n\nWho should ultimately be held accountable in this situation?",
          correctAnswer: "A",
          options: [
            "The car manufacturer",
            "The AI system",
            "The driver of the car",
            "The regulatory body",
          ],
          questionPic: "",
          questionType: "scenario",
        },
        {
          question:
            "A government uses AI to monitor citizens for security purposes. However, this surveillance raises concerns about privacy violations.\n\nWhat is a key ethical consideration that needs to be addressed?",
          correctAnswer: "B",
          options: [
            "Increasing the effectiveness of surveillance",
            "Ensuring individuals have control over their personal information",
            "Expanding the scope of monitoring",
            "Reducing operational costs",
          ],
          questionPic: "",
          questionType: "scenario",
        },
        {
          question:
            "A tech company is developing a new AI-powered app that analyzes user behavior. They plan to collect extensive data without informing users.\n\nWhat ethical principle is being disregarded?",
          correctAnswer: "C",
          options: ["Accountability", "Safety", "Transparency", "Fairness"],
          questionPic: "",
          questionType: "scenario",
        },
      ];

      questions.forEach((question) => {
        const questionRef = doc(
          collection(db, "Quizzes", "Introduction", "IntroductionQuizzes")
        );
        batch.set(questionRef, question);
      });

      await batch.commit();
      setSuccess(true);
      console.log("Questions added successfully!");
    } catch (error) {
      setError("Error adding questions: " + error.message);
      console.error("Error adding questions: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Questions</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Questions added successfully!</p>
      )}
      <button onClick={addQuestions} disabled={loading}>
        {loading ? "Adding..." : "Add Questions"}
      </button>
    </div>
  );
};

export default AddQuestions;
