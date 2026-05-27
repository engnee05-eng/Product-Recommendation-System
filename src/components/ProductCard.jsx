// src/components/ProductCard.jsx

export default function ProductCard({ product, isRecommended, rank }) {
  const stars = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));

  return (
    <div
      id={`product-${product.id}`}
      className={`product-card ${isRecommended ? "product-card--recommended" : ""}`}
    >
      {isRecommended && (
        <div className="recommendation-badge">
          <span className="recommendation-badge__rank">#{rank}</span>
          <span className="recommendation-badge__label">AI Pick</span>
        </div>
      )}

      <div className="product-card__emoji">{product.emoji}</div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__tags">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="product-card__footer">
        <div className="product-card__rating">
          <span className="stars">{stars}</span>
          <span className="rating-value">{product.rating}</span>
        </div>
        <div className="product-card__price">${product.price}</div>
      </div>
    </div>
  );
}
