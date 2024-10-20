import React, { useState } from "react";
import "../styles/lessons.css";
import * as FaIcons from "react-icons/fa";
import LessonTour from "./tours/LessonTour";

// Import lesson components
import Mod1Sec2 from "./lessonContents/module1/mod1sec2";
import Mod1Sec1 from "./lessonContents/module1/mod1sec1";
import Mod1Sec3 from "./lessonContents/module1/mod1sec3";
import Mod1Sec4 from  "./lessonContents/module1/mod1sec4";
import Mod1Sec6 from "./lessonContents/module1/mod1sec6";
// import Module1Video from "./lessonContents/Module1Video";
// import Module1Quiz from "./lessonContents/Module1Quiz";
import Quiz from "./quiz";
// And so on...

// to be take from database
const moduleData = [
  {
    id: 1,
    title: "Module 1",
    sections: [
      {
        type: "Lesson",
        time: "4 min",
        icon: <FaIcons.FaBrain />,
        contentComponent: <Mod1Sec3 />,
      },
      {
        type: "Video",
        time: "10 min",
        icon: <FaIcons.FaVideo />,
      },
      {
        type: "Quiz",
        time: "5 min",
        icon: <FaIcons.FaQuestionCircle />,
        contentComponent: <Quiz />,
      },
    ],
  },
  {
    id: 2,
    title: "Module 2",
    sections: [
      {
        type: "Section 2",
        time: "6 min",
        icon: <FaIcons.FaBrain />,
        contentComponent: <Mod1Sec2 />,

      },
      {
        type: "Section 3",
        time: "6 min",
        icon: <FaIcons.FaBrain />,
        contentComponent: <Mod1Sec2 />,

      },
      {
        type: "Section 4",
        time: "6 min",
        icon: <FaIcons.FaBrain />,
        contentComponent: <Mod1Sec4 />,

      },
    ],
  },
  {
    id: 3,
    title: "Module 3",
    sections: [
      {
        type: "Video",
        time: "8 min",
        icon: <FaIcons.FaVideo />,
      },
      {
        type: "Section 5",
        time: "7 min",
        icon: <FaIcons.FaQuestionCircle />,
        contentComponent: <Mod1Sec2 />,
      },
      {
        type: "Section 6",
        time: "6 min",
        icon: <FaIcons.FaBrain />,
        contentComponent: <Mod1Sec6 />,

      },
    ],
  },
  {
    id: 4,
    title: "Module 4",
    sections: [],
  },
  {
    id: 5,
    title: "Module 5",
    sections: [
      {
        type: "Lesson",
        time: "3 min",
        icon: <FaIcons.FaBrain />,
      },
      {
        type: "Video",
        time: "12 min",
        icon: <FaIcons.FaVideo />,
      },
    ],
  },
];

const Lessons = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activePanelButton, setActivePanelButton] = useState(null);
  const [selectedLessonContent, setSelectedLessonContent] = useState(null);
  const [selectedSectionType, setSelectedSectionType] = useState("");

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handlePanelButtonClick = (moduleIndex, sectionIndex) => {
    setActivePanelButton(`${moduleIndex}-${sectionIndex}`);
    const selectedContentComponent =
      moduleData[moduleIndex].sections[sectionIndex].contentComponent;
    const selectedType = moduleData[moduleIndex].sections[sectionIndex].type;
    setSelectedLessonContent(selectedContentComponent);
    setSelectedSectionType(selectedType);
  };

  return (
    <div className="lesson-container">
      <div className="module-navigation-container">
        <div className="module-header-container">
          <div className="main-header">Modules</div>
          <div className="sub-header">AI Ethics</div>
        </div>

        {moduleData.map((module, moduleIndex) => (
          <div key={module.id}>
            <button
              className={`accordion ${
                moduleIndex === 0 ? "first-accordion" : ""
              } ${activeAccordion === moduleIndex ? "active" : ""}`}
              onClick={() => toggleAccordion(moduleIndex)}
            >
              {module.title}
            </button>
            <div
              className="panel"
              style={{
                maxHeight: activeAccordion === moduleIndex ? "300px" : "0",
              }}
            >
              {module.sections.length === 0 ? (
                <p>No sections available for this module.</p>
              ) : (
                module.sections.map((section, sectionIndex) => (
                  <button
                    key={sectionIndex}
                    className={`panel-button ${
                      activePanelButton === `${moduleIndex}-${sectionIndex}`
                        ? "active-panel-button"
                        : ""
                    }`}
                    onClick={() =>
                      handlePanelButtonClick(moduleIndex, sectionIndex)
                    }
                  >
                    <span className="panel-button-icon">{section.icon}</span>
                    <span className="panel-button-text">
                      {module.title} {section.type} <br />
                      <span className="panel-button-time">{section.time}</span>
                    </span>
                    <span className="panel-button-status">&#10003;</span>
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className="module-content-container"
        style={{
          backgroundColor:
            selectedSectionType === "Quiz" ? "#0056D121" : "whitesmoke",
        }}
      >
        {selectedLessonContent || "Select a lesson to view the content"}
      </div>

      <LessonTour />
    </div>
  );
};

export default Lessons;
