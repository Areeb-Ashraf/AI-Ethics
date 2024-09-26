import React, { useState, useEffect } from 'react';
import "./styles/aiGlossary.css";
import databaseManager from "./databaseManager";

// Sample AI Glossary Data (to be fetched from firebase)
const glossaryData = [
  { term: "Artificial Intelligence (AI)", definition: "The simulation of human intelligence in machines that are designed to think and act like humans." },
  { term: "Machine Learning (ML)", definition: "A subset of AI that allows systems to learn from data, identify patterns, and make decisions with minimal human intervention." },
  { term: "Neural Network", definition: "A series of algorithms that attempt to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates." },
  { term: "Natural Language Processing (NLP)", definition: "A field of AI that enables machines to understand, interpret, and respond to human language." },
  { term: "Deep Learning", definition: "A subset of machine learning that uses neural networks with many layers to analyze various factors of data." },
  { term: "Supervised Learning", definition: "A type of machine learning where the model is trained on labeled data." },
  { term: "Unsupervised Learning", definition: "A type of machine learning where the model identifies patterns in data without labeled examples." },
  { term: "Reinforcement Learning", definition: "A type of learning where an agent learns to achieve a goal in an uncertain, potentially complex environment." },
  { term: "Overfitting", definition: "A modeling error that occurs when a function is too closely fitted to a limited set of data points." },
  { term: "Bias", definition: "A systematic error introduced into machine learning models due to prejudiced data or flawed assumptions." }
];

const AIGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState(glossaryData);

  useEffect(() => {
    const results = glossaryData.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTerms(results);
  }, [searchTerm]);

  return (
    <div className="glossary-container">
      <h1 className="glossary-heading">AI Glossary</h1>

      {/* Search Bar */}
      <input 
        type="text" 
        className="glossary-search-bar" 
        placeholder="Search for a term..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {/* Glossary List */}
      <div className="glossary-list">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, index) => (
            <div key={index} className="glossary-item">
              <h3 className="glossary-term">{item.term}</h3>
              <p className="glossary-definition">{item.definition}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No terms found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default AIGlossary;