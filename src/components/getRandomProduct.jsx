import { useEffect, useState } from "react";
import "./getRandomProduct.css";

function GetRandomProduct() {
  const [category, setCategory] = useState("mens-watches");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts(categoryValue = category) {
    setLoading(true);
    setError("");
    const page = 1;
    const limit = 10;

    const url = `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}&limit=${limit}&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=${encodeURIComponent(categoryValue)}`;
    const options = { method: "GET", headers: { accept: "application/json" } };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setProducts(data?.data?.data ?? []);
    } catch (error) {
      console.log(error);
      setError("Unable to load products right now.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    fetchProducts(category.trim() || "mens-watches");
  }

  return (
    <section className="products-page">
      <div className="products-card">
        <div className="products-header">
          <div>
            <p className="products-label">Random Products</p>
            <h1 className="products-title">
              {category.trim() || "mens-watches"}
            </h1>
            <p className="products-subtitle">
              {loading
                ? "Loading products from the API..."
                : "Products fetched successfully."}
            </p>
          </div>

          <form className="products-actions" onSubmit={handleSubmit}>
            <label className="products-input-label" htmlFor="product-category">
              Category
            </label>
            <input
              id="product-category"
              className="products-input"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="mens-watches"
            />
            <button type="submit" className="button primary">
              Search Products
            </button>
          </form>
        </div>

        {error ? <p className="products-error">{error}</p> : null}

        <div className="products-grid">
          {(loading ? Array.from({ length: 4 }) : products).map(
            (product, index) => {
              if (loading) {
                return (
                  <article
                    className="product-card product-card-skeleton"
                    key={index}
                  >
                    <div className="product-image product-image-placeholder" />
                    <div className="product-content">
                      <div className="product-line product-line-title" />
                      <div className="product-line product-line-subtitle" />
                      <div className="product-line product-line-price" />
                    </div>
                  </article>
                );
              }

              const image = product?.thumbnail || product?.images?.[0];
              const hasRenderableImage =
                image && !image.includes("cdn.dummyjson.com/product-images");

              return (
                <article className="product-card" key={product?.id ?? index}>
                  {hasRenderableImage ? (
                    <img
                      src={image}
                      alt={product?.title ?? "Product image"}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image product-image-placeholder">
                      No image
                    </div>
                  )}

                  <div className="product-content">
                    <p className="product-category">
                      {product?.category ?? "Unknown category"}
                    </p>
                    <h2 className="product-name">
                      {product?.title ?? "Untitled product"}
                    </h2>
                    <p className="product-price">
                      {typeof product?.price === "number"
                        ? `$${product.price.toFixed(2)}`
                        : "Price not available"}
                    </p>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

export default GetRandomProduct;
