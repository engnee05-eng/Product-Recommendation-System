import { useState } from "react";

// ─── Product Data ───────────────────
const PRODUCTS = [
  // Phones 
  { id: 1, name: "Samsung Galaxy A54", category: "Phones", price: 399, rating: 4.4, tags: ["android", "camera", "battery"], description: "6.4\" AMOLED, 50MP camera, 5000mAh battery. Great mid-range Android.", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop&auto=format" },
  { id: 2, name: "iPhone 14", category: "Phones", price: 699, rating: 4.7, tags: ["ios", "apple", "premium"], description: "A15 Bionic chip, dual 12MP cameras, Ceramic Shield. Premium iOS phone.", image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=400&h=300&fit=crop&auto=format" },
  { id: 3, name: "Google Pixel 7a", category: "Phones", price: 449, rating: 4.5, tags: ["android", "google", "AI", "camera"], description: "Tensor G2 chip, 64MP Night Sight camera. Pure Android experience.", image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=300&fit=crop&auto=format" },
  { id: 4, name: "OnePlus Nord CE 3", category: "Phones", price: 299, rating: 4.2, tags: ["budget", "fast-charging", "android"], description: "Snapdragon 782G, 80W fast charging, 6.7\" AMOLED. Best budget phone.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format" },
  // Laptops 
  { id: 5, name: "MacBook Air M2", category: "Laptops", price: 1099, rating: 4.9, tags: ["apple", "lightweight", "students"], description: "Apple M2, fanless design, 18-hour battery. Best everyday laptop.", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&auto=format" },
  { id: 6, name: "Dell XPS 13", category: "Laptops", price: 899, rating: 4.6, tags: ["windows", "thin", "office"], description: "Intel Core i7, 13.4\" InfinityEdge display, 512GB SSD. Sleek Windows.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format" },
  { id: 7, name: "Lenovo IdeaPad Flex 5", category: "Laptops", price: 549, rating: 4.3, tags: ["budget", "convertible", "students"], description: "Ryzen 5, 2-in-1 convertible touchscreen. Affordable and versatile.", image: "https://m.media-amazon.com/images/I/61QU5cqY1gL._AC_UY218_.jpg" },
  { id: 8, name: "ASUS ROG Zephyrus G14", category: "Laptops", price: 1299, rating: 4.7, tags: ["gaming", "RTX", "portable"], description: "Ryzen 9 + RTX 4060, 14\" QHD. Top-tier gaming in a slim chassis.", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop&auto=format" },
  // Audio 
  { id: 9, name: "Sony WH-1000XM5", category: "Audio", price: 349, rating: 4.8, tags: ["noise-cancelling", "wireless", "work"], description: "Industry-leading ANC, 30-hour battery, crystal-clear call quality.", image: "https://m.media-amazon.com/images/I/511jgkd08sL._AC_UY218_.jpg" },
  { id: 10, name: "Apple AirPods Pro 2", category: "Audio", price: 249, rating: 4.7, tags: ["apple", "earbuds", "noise-cancelling"], description: "Adaptive Transparency, H2 chip, up to 30hr total battery with case.", image: "https://m.media-amazon.com/images/I/71BqtxvHP0L._AC_UY218_.jpg" },
  { id: 11, name: "Jabra Evolve2 55", category: "Audio", price: 429, rating: 4.5, tags: ["professional", "work", "meetings"], description: "Pro ANC headset, 8 microphones, Teams & Zoom certified.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop&auto=format" },
  { id: 12, name: "JBL Tune 510BT", category: "Audio", price: 49, rating: 4.1, tags: ["budget", "wireless", "bass"], description: "40-hour battery, PureBass sound, foldable. Great entry-level pick.", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop&auto=format" },
  // Tablets 
  { id: 13, name: "iPad Air (5th Gen)", category: "Tablets", price: 599, rating: 4.8, tags: ["apple", "drawing", "students"], description: "M1 chip, 10.9\" Liquid Retina display, Apple Pencil 2 support.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&auto=format" },
  { id: 14, name: "Samsung Galaxy Tab S8", category: "Tablets", price: 649, rating: 4.6, tags: ["android", "stylus", "samsung"], description: "Snapdragon 8 Gen 1, 11\" 120Hz display, S Pen included.", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop&auto=format" },
  { id: 15, name: "Amazon Fire HD 10", category: "Tablets", price: 149, rating: 4.0, tags: ["budget", "entertainment", "kids"], description: "10.1\" 1080p, 12-hour battery, Alexa built-in. Best budget tablet.", image: "https://m.media-amazon.com/images/I/41p3t3fq7iL._SX425_.jpg" },
  // Smart Home 
  { id: 16, name: "Amazon Echo Dot (5th Gen)", category: "Smart Home", price: 49, rating: 4.4, tags: ["alexa", "smart-speaker", "budget"], description: "Improved audio, Alexa built-in. Perfect smart home starter device.", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=300&fit=crop&auto=format" },
  { id: 17, name: "Google Nest Hub (2nd Gen)", category: "Smart Home", price: 99, rating: 4.3, tags: ["google", "smart-display", "assistant"], description: "7\" touchscreen, sleep tracking, Google Assistant built-in.", image: "https://rukminim2.flixcart.com/image/1366/1366/kylvr0w0/speaker/t/b/l/-original-imagasvdkghfmpkb.jpeg?q=90" },
  { id: 18, name: "Philips Hue Starter Kit", category: "Smart Home", price: 179, rating: 4.6, tags: ["smart-lighting", "color", "alexa"], description: "4 smart bulbs + Bridge, 16M colors, Alexa & Google compatible.", image: "https://m.media-amazon.com/images/I/41vnAhrXk9L._SX342_SY445_QL70_FMwebp_.jpg" },
  // Wearables 
  { id: 19, name: "Apple Watch Series 9", category: "Wearables", price: 399, rating: 4.8, tags: ["apple", "health", "fitness", "ECG"], description: "S9 chip, Double Tap gesture, ECG, Always-On Retina. Best smartwatch.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop&auto=format" },
  { id: 20, name: "Fitbit Charge 6", category: "Wearables", price: 159, rating: 4.2, tags: ["fitness", "budget", "health", "google"], description: "Heart rate, sleep tracking, 7-day battery, Google apps built-in.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop&auto=format" },

];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

const EXAMPLE_CHIPS = [
  "Phone under $500",
  "Best laptop for students",
  "Noise-cancelling earbuds",
  "Budget smartwatch",
  "Gaming laptop under $1500",
  "Smart home starter",
];

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;

// ─── Groq AI (Llama 3) ───────────
async function getAIRecommendations(userPreference) {
  const productSummary = PRODUCTS.map(
    (p) => `ID:${p.id} | ${p.name} | ${p.category} | $${p.price} | Rating:${p.rating} | Tags:[${p.tags.join(", ")}]`
  ).join("\n");

  const prompt = `You are a product recommendation assistant for an electronics store.

Product catalog:
${productSummary}

User preference: "${userPreference}"

Select 1-4 most relevant products. Return ONLY valid JSON in this exact format:
{"recommendedIds":[list of numeric IDs],"explanation":"2-3 sentence explanation of why these products match"}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 300,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || "{}";
  const parsed = JSON.parse(text);
  return {
    recommendedIds: parsed.recommendedIds || [],
    explanation: parsed.explanation || "",
  };
}

// ─── Star Rating ─────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < Math.floor(rating) ? "star filled" : "star"}>★</span>
      ))}
      <span className="rating-value">{rating}</span>
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────
function ProductCard({ product, isRecommended, rank }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`product-card${isRecommended ? " product-card--recommended" : ""}`}>
      {isRecommended && (
        <div className="recommendation-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Recommended · #{rank}
        </div>
      )}

      <div className="product-card__image">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-card__image-fallback">
            {product.category === "Phones" ? "📱"
              : product.category === "Laptops" ? "💻"
                : product.category === "Audio" ? "🎧"
                  : product.category === "Tablets" ? "📟"
                    : product.category === "Smart Home" ? "🏠"
                      : "⌚"}
          </div>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__tags">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="product-card__footer">
        <Stars rating={product.rating} />
        <div className="product-card__price">${product.price}</div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendedIds, setRecommendedIds] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [filterMode, setFilterMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = async (q) => {
    const pref = (q || query).trim();
    if (!pref || loading) return;
    setLoading(true);
    setError(null);
    setLastQuery(pref);
    setFilterMode(false);
    try {
      const result = await getAIRecommendations(pref);
      setRecommendedIds(result.recommendedIds);
      setExplanation(result.explanation);
      if (result.recommendedIds.length > 0) {
        setFilterMode(true);
        setActiveCategory("All");
      }
    } catch (err) {
      setError(err.message || "Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChip = (chip) => { setQuery(chip); handleSearch(chip); };
  const handleClear = () => {
    setRecommendedIds([]); setExplanation(""); setLastQuery("");
    setFilterMode(false); setError(null);
  };

  const categoryFiltered = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const displayProducts = filterMode && recommendedIds.length > 0
    ? categoryFiltered.filter((p) => recommendedIds.includes(p.id))
    : categoryFiltered;

  const sorted = [...displayProducts].sort((a, b) => {
    const ai = recommendedIds.indexOf(a.id), bi = recommendedIds.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <div className="header__inner">
          <div className="header__brand">
            <span className="header__logo">🛒</span>
            <div>
              <h1 className="header__title">Product Recommendation System</h1>
            </div>
          </div>
          <div className="header__stats">
            <span className="stat"><strong>{PRODUCTS.length}</strong> Products</span>
            <span className="stat"><strong>{CATEGORIES.length - 1}</strong> Categories</span>
          </div>
        </div>
      </header>

      <main className="main">
        {/* ── Search Panel ── */}
        <div className="search-panel">
          <div className="search-panel__header">
            <div className="ai-badge">
              <span className="ai-badge__dot" />
              AI-Powered Recommendations
            </div>
            <h2 className="search-panel__title">Find your perfect product</h2>
            <p className="search-panel__subtitle">
              Describe what you need in plain language — our AI will match you with the best options.
            </p>
          </div>

          <div className="search-form">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                id="preference-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder='e.g. "I want a phone under $500 with a great camera"'
                className="search-input"
                disabled={loading}
              />
              {query && (
                <button className="search-clear" onClick={() => setQuery("")} aria-label="Clear">×</button>
              )}
            </div>
            <button
              id="get-recommendations-btn"
              className={`search-btn${loading ? " search-btn--loading" : ""}`}
              onClick={() => handleSearch()}
              disabled={!query.trim() || loading}
            >
              {loading
                ? (<><span className="spinner" /> Analyzing...</>)
                : (<>Get Recommendations</>)}
            </button>
          </div>

          <div className="chips-section">
            <span className="chips-label">Try these:</span>
            <div className="chips">
              {EXAMPLE_CHIPS.map((chip) => (
                <button key={chip}
                  className={`chip${query === chip ? " chip--active" : ""}`}
                  onClick={() => handleChip(chip)}
                  disabled={loading}>
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="error-banner" role="alert">
            <span>⚠️ {error}</span>
            <button onClick={handleClear}>Dismiss</button>
          </div>
        )}

        {/* ── AI Result Panel ── */}
        {explanation && !loading && (
          <div className="rec-panel">
            <div className="rec-panel__inner">
              <span className="rec-panel__icon">🤖</span>
              <div className="rec-panel__content">
                <div className="rec-panel__meta">
                  <span className="rec-panel__query">"{lastQuery}"</span>
                  <span className="rec-panel__count">
                    {recommendedIds.length} match{recommendedIds.length !== 1 ? "es" : ""}
                  </span>
                </div>
                <p className="rec-panel__explanation">{explanation}</p>
              </div>
              <button id="clear-recommendations-btn" className="rec-panel__clear" onClick={handleClear} aria-label="Clear">✕</button>
            </div>
          </div>
        )}

        {/* ── Controls Bar ── */}
        <div className="controls-bar">
          <div className="category-filters">
            {CATEGORIES.map((cat) => (
              <button key={cat}
                className={`category-btn${activeCategory === cat ? " category-btn--active" : ""}`}
                onClick={() => { setActiveCategory(cat); setFilterMode(false); }}>
                {cat}
              </button>
            ))}
          </div>
          {recommendedIds.length > 0 && (
            <div className="view-toggle">
              <button className={`toggle-btn${!filterMode ? " toggle-btn--active" : ""}`}
                onClick={() => setFilterMode(false)}>
                All ({PRODUCTS.length})
              </button>
              <button className={`toggle-btn${filterMode ? " toggle-btn--active" : ""}`}
                onClick={() => { setFilterMode(true); setActiveCategory("All"); }}>
                AI Recommended ({recommendedIds.length})
              </button>
            </div>
          )}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="loading-overlay">
            <div className="loading-card">
              <div className="loading-spinner" />
              <p className="loading-text">AI is analyzing your preferences…</p>
            </div>
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && (
          <div className="product-list">
            {sorted.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state__icon">🔍</span>
                <p>No products match. Try a different query.</p>
              </div>
            ) : (
              sorted.map((product) => {
                const rank = recommendedIds.indexOf(product.id);
                return (
                  <ProductCard key={product.id} product={product}
                    isRecommended={recommendedIds.includes(product.id)}
                    rank={rank >= 0 ? rank + 1 : null} />
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
}
