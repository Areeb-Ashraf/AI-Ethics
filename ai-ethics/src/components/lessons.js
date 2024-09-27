import React, { useState } from "react";
import "../styles/lessons.css";

const Lessons = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activePanelButton, setActivePanelButton] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handlePanelButtonClick = (index) => {
    setActivePanelButton(index);
  };

  return (
    <div className="lesson-container">
      <div className="module-navigation-container">
        <div className="module-header-container">
          <div className="main-header">Modules</div>
          <div className="sub-header">AI Ethics</div>
        </div>

        <button
          className={`accordion ${activeAccordion === 1 ? "panel-active" : ""}`}
          onClick={() => toggleAccordion(1)}
          id="first-accordion"
        >
          Module 1
        </button>
        <div
          className="panel"
          style={{ maxHeight: activeAccordion === 1 ? "300px" : "0" }}
        >
          <button
            className={`panel-button ${
              activePanelButton === 1 ? "active-panel-button" : ""
            }`}
            onClick={() => handlePanelButtonClick(1)}
            id="first-panel-button"
          >
            <span className="panel-button-icon"></span>
            <span className="panel-button-text">
              Module 1 Lesson <br />
              <span className="panel-button-time">4 min</span>
            </span>
            <span className="panel-button-status">&#10003;</span>
          </button>

          <button
            className={`panel-button ${
              activePanelButton === 2 ? "active-panel-button" : ""
            }`}
            onClick={() => handlePanelButtonClick(2)}
          >
            <span className="panel-button-icon"></span>
            <span className="panel-button-text">
              Module 1 Video <br />
              <span className="panel-button-time">10 min</span>
            </span>
            <span className="panel-button-status">&#10003;</span>
          </button>

          <button
            className={`panel-button ${
              activePanelButton === 3 ? "active-panel-button" : ""
            }`}
            onClick={() => handlePanelButtonClick(3)}
          >
            <span className="panel-button-icon"></span>
            <span className="panel-button-text">
              Module 1 Quiz <br />
              <span className="panel-button-time">5 min</span>
            </span>
            <span className="panel-button-status">&#10003;</span>
          </button>
        </div>

        <button
          className={`accordion ${activeAccordion === 2 ? "active" : ""}`}
          onClick={() => toggleAccordion(2)}
        >
          Module 2
        </button>
        <div
          className="panel"
          style={{ maxHeight: activeAccordion === 2 ? "300px" : "0" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <button
          className={`accordion ${activeAccordion === 3 ? "active" : ""}`}
          onClick={() => toggleAccordion(3)}
        >
          Module 3
        </button>
        <div
          className="panel"
          style={{ maxHeight: activeAccordion === 3 ? "300px" : "0" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div className="module-content-container">
        <div className="module-content">lesson one goes here</div>
      </div>
    </div>
  );
};

export default Lessons;
