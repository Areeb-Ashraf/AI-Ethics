import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import Cookies from "js-cookie";

const LessonTour = () => {
  const [run, setRun] = useState(false);

  const TOUR_COOKIE_KEY = "hasViewedLessonTour";

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

  // Check if the user has viewed the tour
  useEffect(() => {
    const hasViewedTour = Cookies.get(TOUR_COOKIE_KEY); // Get the cookie
    if (!hasViewedTour) {
      setRun(true); // Run the tour if the cookie doesn't exist
    }
  }, []);

  // Handle tour completion
  const handleTourFinish = () => {
    Cookies.set(TOUR_COOKIE_KEY, "true", { expires: 365 }); // Set cookie to expire in 1 year
    setRun(false); // Stop running the tour
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      locale={{
        last: "Done",
      }}
      styles={{
        options: {
          zIndex: 1000,
          arrowColor: "#fff",
          // backgroundColor: "#333",
          overlayColor: "rgba(0, 0, 0, 0.3)",
          primaryColor: "#007bff",
          // textColor: "#fff",
        },
        buttonNext: {
          backgroundColor: "#0C06F7",
          color: "#fff",
        },
        buttonBack: {
          backgroundColor: "#0C06F7",
          color: "#fff",
        },
        buttonClose: {
          color: "#EF0307",
        },
        buttonSkip: {
          color: "#EF0307",
        },
      }}
      callback={(data) => {
        if (data.status === "finished" || data.status === "skipped") {
          handleTourFinish(); // Set the cookie when the tour finishes or is skipped
        }
      }}
    />
  );
};

export default LessonTour;
