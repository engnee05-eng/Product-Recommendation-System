// src/components/ProductList.jsx
import ProductCard from "./ProductCard";

export default function ProductList({ products, recommendedIds, filterMode }) {
  // In filter mode, show only recommended products
  const displayProducts = filterMode && recommendedIds.length > 0
    ? products.filter((p) => recommendedIds.includes(p.id))
    : products;

  // Sort: recommended first, then rest
  const sorted = [...displayProducts].sort((a, b) => {
    const aIdx = recommendedIds.indexOf(a.id);
    const bIdx = recommendedIds.indexOf(b.id);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  return (
    <div className="product-list">
      {sorted.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🔍</span>
          <p>No products match your filter. Try a different query.</p>
        </div>
      ) : (
        sorted.map((product) => {
          const rank = recommendedIds.indexOf(product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              isRecommended={recommendedIds.includes(product.id)}
              rank={rank >= 0 ? rank + 1 : null}
            />
          );
        })
      )}
    </div>
  );
}
