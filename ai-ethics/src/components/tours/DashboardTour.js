import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import Cookies from "js-cookie";

const DashboardTour = () => {
  const [run, setRun] = useState(false);

  const TOUR_COOKIE_KEY = "hasViewedDashboardTour";

  const steps = [
    {
      target: ".db-user-name",
      content: "Welcome!",
    },
    {
      target: ".course-prog-container",
      content:
        "This is your course progress. Track how much you've completed here!",
    },
    {
      target: ".sidebar-container",
      content:
        "This sidebar helps you navigate through the site. You can explore lessons, quizzes, and more.",
    },
    {
      target: ".sidebar-item:nth-child(2)", // Point to "Dashboard"
      content: "Go to your Dashboard to see your progress.",
    },
    {
      target: ".sidebar-item:nth-child(3)", // Point to "Modules"
      content:
        "Access all lessons in the Modules section. You can dive deep into AI ethics topics here.\n\nTake quizzes to test your knowledge of AI ethics.",
    },
    {
      target: ".sidebar-item:nth-child(4)", // Point to "leaderboard"
      content: "Here you can view the leaderboard and compete with others.",
    },
    {
      target: ".sidebar-item:nth-child(5)", // Point to "Profile"
      content:
        "You can view your account information and change your settings in the Profile tab.",
    },
    {
      target: ".statxp-contaner",
      content: "Here's your total XP. Keep collecting points as you progress!",
    },
    {
      target: ".next-milestone-container",
      content:
        "This section shows your next milestone. Keep earning XP to reach it!",
    },
    {
      target: ".recently-finished-container:first-of-type",
      content: "As you complete lessons and quizzes they will appear here.",
    },
    {
      target: ".resume-btn",
      content: "Click this button to resume to get started learning!",
    },
  ];

  // Check if the user has viewed the tour
  useEffect(() => {
    const hasViewedTour = Cookies.get(TOUR_COOKIE_KEY); // Check for cookie
    if (!hasViewedTour) {
      setRun(true); // Start the tour if the cookie doesn't exist
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
      spotlightPadding={10}
      showProgress={true}
      styles={{
        options: {
          zIndex: 1000,
          arrowColor: "#fff",
          overlayColor: "rgba(0, 0, 0, 0.3)",
          primaryColor: "#007bff",
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

export default DashboardTour;
