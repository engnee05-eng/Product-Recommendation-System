// src/components/SearchPanel.jsx
import { useState } from "react";

const EXAMPLE_CHIPS = [
  "Phone under $500",
  "Best laptop for students",
  "Noise-cancelling earbuds",
  "Budget smartwatch for fitness",
  "Gaming laptop under $1500",
  "Smart home starter kit",
];

export default function SearchPanel({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleChipClick = (chip) => {
    setQuery(chip);
    if (!isLoading) {
      onSearch(chip);
    }
  };

  return (
    <div className="search-panel">
      <div className="search-panel__header">
        <div className="ai-badge">
          <span className="ai-badge__dot" />
          Powered by Gemini AI
        </div>
        <h2 className="search-panel__title">What are you looking for?</h2>
        <p className="search-panel__subtitle">
          Describe your needs in plain language — our AI will find the perfect product for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="preference-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. "I need a phone under $400 with good camera"'
            className="search-input"
            disabled={isLoading}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear input"
            >
              ×
            </button>
          )}
        </div>

        <button
          id="get-recommendations-btn"
          type="submit"
          className={`search-btn ${isLoading ? "search-btn--loading" : ""}`}
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              Analyzing...
            </>
          ) : (
            <>
              <span>✨</span>
              Get Recommendations
            </>
          )}
        </button>
      </form>

      <div className="chips-section">
        <span className="chips-label">Try these:</span>
        <div className="chips">
          {EXAMPLE_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              className={`chip ${query === chip ? "chip--active" : ""}`}
              onClick={() => handleChipClick(chip)}
              disabled={isLoading}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
