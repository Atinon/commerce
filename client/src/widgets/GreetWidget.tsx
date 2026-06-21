import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export function GreetWidget() {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchRandomProduct() {
    try {
      setLoading(true);
      setError(null);

      const start = performance.now();
      const response = await fetch("/api/products");
      const products: Product[] = await response.json();
      const end = performance.now();

      if (!products || products.length === 0) {
        setError("No products found in the database.");
        setLoading(false);
        return;
      }

      const randomProduct =
        products[Math.floor(Math.random() * products.length)];
      setProduct(randomProduct);
      setDuration(Math.round(end - start));
    } catch (err) {
      setError("Request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="playground">
    <p>
        The component below is hydrated independently on
        the client while the surrounding page remains
        server-rendered. It demonstrates the progressive
        enhancement strategy to be used throughout the application.
    </p>

      <button
        className="playground-btn"
        onClick={fetchRandomProduct}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Random Product"}
      </button>

      {product && (
        <div className="product-card">
          <h4>{product.name}</h4>

          <ul>
            <li>ID: {product.id}</li>
            <li>Price: ${product.price}</li>

            {duration !== null && <li>Response Time: {duration}ms</li>}
          </ul>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </section>
  );
}
