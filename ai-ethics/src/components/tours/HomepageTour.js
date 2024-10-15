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
      target: ".sidebar-text:nth-child(2)", // Point to "Explore"
      content: "Click here to explore the site and learn more about AI ethics.",
    },
    {
      target: ".sidebar-text:nth-child(3)", // Point to "Lessons"
      content:
        "Access all lessons in this section. You can dive deep into AI ethics topics here.",
    },
    {
      target: ".sidebar-text:nth-child(6)", // Point to "Quizzes"
      content: "Take quizzes to test your knowledge of AI ethics.",
    },
    {
      target: ".auth-buttons",
      content:
        "If you’re not signed in, you can log in or sign up here to access more features.",
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
      styles={{
        options: {
          zIndex: 1000,
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
