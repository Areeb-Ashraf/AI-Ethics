import React, { useState } from "react";
import "../styles/lessons.css";
import * as FaIcons from "react-icons/fa";
import LessonTour from "./tours/LessonTour";

// Intro
import IntroSec1 from "./lessonContents/module1/introsec1";
import IntroSec2 from "./lessonContents/module1/introsec2";
import IntroSec3 from "./lessonContents/module1/introsec3";
import IntroSec4 from "./lessonContents/module1/introsec4";
import IntroSec5 from "./lessonContents/module1/Introsec5";
import IntroSec6 from "./lessonContents/module1/introsec6";
import IntroSec7 from "./lessonContents/module1/introsec7";

//Mod1
import Mod1Sec1 from "./lessonContents/realModule1/mod1sec1";
import Mod1Sec2 from "./lessonContents/realModule1/mod1sec2";
import Mod1Sec3 from "./lessonContents/realModule1/mod1sec3"
import Mod1Sec4 from "./lessonContents/realModule1/mod1sec4"
import Mod1Sec5 from "./lessonContents/realModule1/mod1sec5"
import Mod1Sec6 from "./lessonContents/realModule1/mod1sec6"
import Mod1Sec7 from "./lessonContents/realModule1/mod1sec7"
import Mod1Sec8 from "./lessonContents/realModule1/mod1sec8"

//Mod2
import Mod2Sec1 from "./lessonContents/module2/mod2sec1";

//Mod3
import Mod3Sec1 from "./lessonContents/module3/mod3sec1";
import Mod3Sec2 from "./lessonContents/module3/mod3sec2";
import Mod3Sec3 from "./lessonContents/module3/mod3sec3";
import Mod3Sec4 from "./lessonContents/module3/mod3sec4";
import Mod3Sec5 from "./lessonContents/module3/mod3sec5";

//Mod4
import Mod4Sec1 from "./lessonContents/module4/mod4sec1";
import Mod4Sec2 from "./lessonContents/module4/mod4sec2";
import Mod4Sec3 from "./lessonContents/module4/mod4sec3";
import Mod4Sec4 from "./lessonContents/module4/mod4sec4";
import Mod4Sec5 from "./lessonContents/module4/mod4sec5";
import Mod4Sec6 from "./lessonContents/module4/mod4sec6";

//Mod5
import Mod5Sec1 from "./lessonContents/module5/mod5sec1";


//Mod6
import Mod6Sec1 from "./lessonContents/module6/mod6sec1";
import Mod6Sec2 from "./lessonContents/module6/mod6sec2";
import Mod6Sec3 from "./lessonContents/module6/mod6sec3";

//Mod7
import Mod7Sec1 from "./lessonContents/module7/mod7sec1";

//Mod8
import Mod8Sec1 from "./lessonContents/module8/mod8sec1";

// import Mod2Sec1 from "./lessonContents/module2/mod2sec1";
import Quiz from "./quiz";

// Module data with different section types (Lesson, Quiz, Video)
const moduleData = [
  {
    id: 0,
    title: "Introduction",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <IntroSec1 /> },
      { type: "Lesson", contentComponent: <IntroSec2 /> },
      { type: "Lesson", contentComponent: <IntroSec3 /> },
      { type: "Lesson", contentComponent: <IntroSec4 /> },
      { type: "Lesson", contentComponent: <IntroSec5 /> },
      { type: "Lesson", contentComponent: <IntroSec6 /> },
      { type: "Lesson", contentComponent: <IntroSec7 /> },
      { type: "Quiz", contentComponent: <Quiz /> },
    ],
  },
  {
    id: 1,
    title: "Module 1", // module 1
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod1Sec1 /> },
      { type: "Lesson", contentComponent: <Mod1Sec2 /> },
      { type: "Lesson", contentComponent: <Mod1Sec3 /> },
      { type: "Lesson", contentComponent: <Mod1Sec4 /> },
      { type: "Lesson", contentComponent: <Mod1Sec5 /> },
      { type: "Lesson", contentComponent: <Mod1Sec6 /> },
      { type: "Lesson", contentComponent: <Mod1Sec7 /> },
      { type: "Lesson", contentComponent: <Mod1Sec8 /> },

    ],
  },
  {
    id: 2,
    title: "Module 2",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod2Sec1 /> },
    ],
  },
  {
    id: 3,
    title: "Module 3",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod3Sec1 /> },
      { type: "Lesson", contentComponent: <Mod3Sec2 /> },
      { type: "Lesson", contentComponent: <Mod3Sec3 /> },
      { type: "Lesson", contentComponent: <Mod3Sec4 /> },
      { type: "Lesson", contentComponent: <Mod3Sec5 /> },
    ],
  },
  {
    id: 4,
    title: "Module 4",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod4Sec1 /> },
      { type: "Lesson", contentComponent: <Mod4Sec2 /> },
      { type: "Lesson", contentComponent: <Mod4Sec3 /> },
      { type: "Lesson", contentComponent: <Mod4Sec4 /> },
      { type: "Lesson", contentComponent: <Mod4Sec5 /> },
      { type: "Lesson", contentComponent: <Mod4Sec6 /> },

    ],
  },
  {
    id: 5,
    title: "Module 5",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod5Sec1 /> },
    ],
  },
  {
    id: 6,
    title: "Module 6",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod6Sec1 /> },
      { type: "Lesson", contentComponent: <Mod6Sec2 /> },
      { type: "Lesson", contentComponent: <Mod6Sec3 /> },
    ],
  },
  {
    id: 7,
    title: "Module 7",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod7Sec1 /> },
    ],
  },
  {
    id: 8,
    title: "Module 8",
    time: "20min",
    sections: [
      { type: "Lesson", contentComponent: <Mod8Sec1 /> },
    ],
  },

];


// Helper function to return icon and label based on type
const getSectionIconAndLabel = (type) => {
  switch (type) {
    case "Lesson":
      return { icon: <FaIcons.FaBrain />, label: "Lesson" };
    case "Quiz":
      return { icon: <FaIcons.FaQuestionCircle />, label: "Quiz" };
    case "Video":
      return { icon: <FaIcons.FaVideo />, label: "Video" };
    default:
      return { icon: <FaIcons.FaBook />, label: "Content" }; // Default icon/label if type is unknown
  }
};

const Lessons = () => {
  const [currentSection, setCurrentSection] = useState({ moduleIndex: 0, sectionIndex: 0 });
  const [isLessonStarted, setIsLessonStarted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleNextClick = () => {
    const { moduleIndex, sectionIndex } = currentSection;
    const module = moduleData[moduleIndex];

    if (sectionIndex < module.sections.length - 1) {
      setCurrentSection({ moduleIndex, sectionIndex: sectionIndex + 1 });
    } else if (moduleIndex < moduleData.length - 1) {
      // Move to the first section of the next module
      setCurrentSection({ moduleIndex: moduleIndex + 1, sectionIndex: 0 });
      setActiveAccordion(moduleIndex + 1); // Expand the next module
    }
  };

  const handlePrevClick = () => {
    const { moduleIndex, sectionIndex } = currentSection;

    if (sectionIndex > 0) {
      setCurrentSection({ moduleIndex, sectionIndex: sectionIndex - 1 });
    } else if (moduleIndex > 0) {
      // Move to the last section of the previous module
      const prevModule = moduleData[moduleIndex - 1];
      setCurrentSection({ moduleIndex: moduleIndex - 1, sectionIndex: prevModule.sections.length - 1 });
      setActiveAccordion(moduleIndex - 1); // Expand the previous module
    }
  };

  const renderPanelButtons = (module, moduleIndex) => {
    const uniqueSectionTypes = [...new Set(module.sections.map((section) => section.type))];
    
    return uniqueSectionTypes.map((type) => {
      const { icon, label } = getSectionIconAndLabel(type);
  
      // Check if the current section type matches to apply active styling
      const isActiveType = currentSection.moduleIndex === moduleIndex &&
                           module.sections[currentSection.sectionIndex].type === type;
  
      return (
        <button
          key={type}
          className={`panel-button ${isActiveType ? "active-panel-button" : ""}`}
          onClick={() => {
            // Find the first index of the section matching the type (Lesson or Quiz)
            const sectionIndex = module.sections.findIndex(section => section.type === type);
            // Set the current section based on the found index
            if (sectionIndex !== -1) {
              setCurrentSection({ moduleIndex, sectionIndex });
              setIsLessonStarted(true);
            }
          }}
        >
          <span className="panel-button-icon">{icon}</span>
          <span className="panel-button-text">
            {label === "Quiz" ? `${module.title}: Quiz` : module.title}<br />
            <span className="panel-button-time">{module.time}</span>
          </span>
          <span className="panel-button-status">&#10003;</span>
        </button>
      );
    });
  };   

  const { moduleIndex, sectionIndex } = currentSection;
  const module = moduleData[moduleIndex];
  const section = module.sections[sectionIndex];
  const isLastSectionInModule = sectionIndex === module.sections.length - 1;

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
              className={`accordion ${moduleIndex === 0 ? "first-accordion" : ""} ${activeAccordion === moduleIndex ? "panel-active" : ""}`}
              onClick={() => setActiveAccordion(activeAccordion === moduleIndex ? null : moduleIndex)}
            >
              Module {module.id}
            </button>
            <div className="panel" style={{ maxHeight: activeAccordion === moduleIndex ? "300px" : "0" }}>
              {renderPanelButtons(module, moduleIndex)}
            </div>
          </div>
        ))}
      </div>

      <div className="module-content-container">
        {isLessonStarted && module ? (
          <>
            <div className="buttons-div" 
             style={{
              background: currentSection && module.sections[currentSection.sectionIndex].type === "Quiz" ? "#0056D121" : "transparent",
            }}>
              <button
                id="prev-button"
                className="module-navigation-buttons"
                onClick={handlePrevClick}
                disabled={moduleIndex === 0 && sectionIndex === 0}
              >
                &lt; Prev
              </button>
              <div className="module-title">{module.title}</div>
              <button
                id="next-button"
                className="module-navigation-buttons"
                onClick={handleNextClick}
                disabled={moduleIndex === moduleData.length - 1 && isLastSectionInModule}
              >
                {isLastSectionInModule ? "Next Module" : "Next"} &gt;
              </button>
            </div>
            <div className="inner-module-container" 
            style={{
                    background: currentSection && module.sections[currentSection.sectionIndex].type === "Quiz" ? "#0056D121" : "transparent",
                  }}
        >{section.contentComponent}</div>
          </>
        ) : (
          <div>Select a lesson to begin</div>
        )}
      </div>

      <LessonTour />
    </div>
  );
};

export default Lessons;