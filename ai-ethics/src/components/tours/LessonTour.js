import React, { useState } from "react";
import Joyride from "react-joyride";

const LessonTour = () => {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: ".main-header",
      content:
        "This is where you’ll find the available modules for the AI Ethics course.",
    },
    {
      target: ".first-accordion",
      content: "Click here to expand a module and see the lessons within.",
    },
    {
      target: ".panel-button",
      content: "Select a section to start learning or take a quiz.",
    },
    {
      target: ".module-content-container",
      content: "This is where the lesson or quiz content will appear.",
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      styles={{
        options: {
          zIndex: 1000,
        },
      }}
    />
  );
};

export default LessonTour;
