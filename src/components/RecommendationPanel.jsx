// src/components/RecommendationPanel.jsx

export default function RecommendationPanel({ explanation, count, query, onClear }) {
  if (!explanation) return null;

  return (
    <div className="rec-panel">
      <div className="rec-panel__inner">
        <div className="rec-panel__icon">🤖</div>
        <div className="rec-panel__content">
          <div className="rec-panel__meta">
            <span className="rec-panel__query">"{query}"</span>
            <span className="rec-panel__count">
              {count > 0 ? `${count} product${count !== 1 ? "s" : ""} found` : "No matches"}
            </span>
          </div>
          <p className="rec-panel__explanation">{explanation}</p>
        </div>
        <button
          id="clear-recommendations-btn"
          className="rec-panel__clear"
          onClick={onClear}
          title="Clear recommendations"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
