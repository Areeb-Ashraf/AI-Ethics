import React, { useState, useEffect } from 'react';
import "./styles/aiGlossary.css";
import databaseManager from "./databaseManager";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Sample AI Glossary Data (to be fetched from firebase)
const glossaryData = await databaseManager.fetchAllGlossary();

async function fetchGlossary(word) {
  const glossaryWord = await databaseManager.fetchGlossary(word);
  return glossaryWord;
}

const AIGlossary = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredTitles, setFilteredTitles] = useState(glossaryData);

  useEffect(() => {
    const results = glossaryData.filter(item =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setFilteredTitles(results);
  }, [searchTitle]);

  // Definining the tooltip, not currently present in the aiGlossary.js
  // Look to DatabaseManTester.js for function
  const Tooltip = () => {
    const [definition, setDefinition] = useState("Loading...");
  
    useEffect(() => {
      // Fetch the definition of "A.I." when the component mounts
      fetchGlossary("Chatbot").then((result) => {
        if (result && result.description) {
          setDefinition(result.description); // Safely access the description
        } else {
          setDefinition("No definition found."); // Handle case where no result is found
        }
      }).catch(error => {
        setDefinition("Error loading definition."); // Handle any errors
      });
    }, []);
  
    return (
      <Popup
        trigger={open => (
          <button className="button">A.I. Definition </button>
        )}
        position="right center"
        closeOnDocumentClick
      >
        <span>{definition}</span> {/* This will display the fetched definition */}
      </Popup>
    );
  };
    
  return (
    <div className="glossary-container">
      <h1 className="glossary-heading">AI Glossary</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="glossary-search-bar"
        placeholder="Search for a term..."
        value={searchTitle}
        onChange={e => setSearchTitle(e.target.value)}
      />

      {/* Glossary List */}
      <div className="glossary-list">
        {filteredTitles.length > 0 ? (
          filteredTitles.map((item, index) => (
            <div key={index} className="glossary-item">
              <h3 className="glossary-title">{item.title}</h3>
              <p className="glossary-description">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No terms found for "{searchTitle}"</p>
        )}
      </div>
    </div>
  );
};

export default AIGlossary;