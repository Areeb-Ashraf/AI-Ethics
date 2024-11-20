import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import databaseManager from "../databaseManager";

async function fetchGlossary(word) {
  const glossaryWord = await databaseManager.fetchGlossary(word);
  console.log(glossaryWord);
  return glossaryWord;
}

function GlossaryTooltip({ glossaryWord }) {
  const [definition, setDefinition] = useState("Loading...");

  useEffect(() => {
    // Fetch the definition of "A.I." when the component mounts
    fetchGlossary(glossaryWord)
      .then((result) => {
        if (result && result.description) {
          setDefinition(result.description); // Safely access the description
        } else {
          setDefinition("No definition found."); // Handle case where no result is found
        }
      })
      .catch((error) => {
        setDefinition("Error loading definition."); // Handle any errors
      });
  }, []);

  return (
    <Popup
      trigger={(open) => (
        <button
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          {glossaryWord}
        </button>
      )}
      position="right center"
      closeOnDocumentClick
    >
      <span>{definition}</span>{" "}
    </Popup>
  );
}

export default GlossaryTooltip;
