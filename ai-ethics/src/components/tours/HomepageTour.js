import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import Cookies from "js-cookie";

const HomepageTour = () => {
  const [run, setRun] = useState(false);

  const TOUR_COOKIE_KEY = "hasViewedHomepageTour";

  const steps = [
    {
      target: ".homepage-heading",
      content: "Welcome! This is the main heading of your homepage.",
    },
    {
      target: ".homepage-subheading",
      content: "Here we explain why understanding AI ethics is important.",
    },
    {
      target: ".benefits-container",
      content:
        "These are the key benefits of the course: interactive lessons, ethical principles, and practical guidance.",
    },
    {
      target: ".cta-button",
      content: "You can start the course here by clicking this button.",
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
      content: "view the leaderboard to compete",
    },
    {
      target: ".sidebar-item:nth-child(5)", // Point to "Profile"
      content:
        "You can view your information and change your settings in the Profile tab.",
    },
    {
      target: "#info", // Point to "help"
      content: "stop it, get some help",
    },
    {
      target: ".cta-button", // Point to "Profile"
      content: "final hook",
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
      spotlightPadding={10}
      showProgress={true}
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

export default HomepageTour;
