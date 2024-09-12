import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/products.css";
import AuthContext from "./AuthContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/all-products/",
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, [authToken]);

  return (
    <div className="app">
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.ProductName}</h2>
            <p>
              <strong>Code:</strong> {product.ProductCode}
            </p>
            <p>
              <strong>HSN:</strong> {product.HSNCode}
            </p>
            <p>
              <strong>Status:</strong> {product.Active ? "Active" : "Inactive"}
            </p>
            {product.ProductImage && (
              <img
                src={`http://127.0.0.1:8000${product.ProductImage}`}
                alt={product.ProductName}
              />
            )}
            <h3>Variants:</h3>
            {product.subvariants.map((variant, index) => (
              <div key={index} className="variant-info">
                <p>
                  <strong>Size:</strong> {variant.size}
                </p>
                <p>
                  <strong>Color:</strong> {variant.color}
                </p>
                <p>
                  <strong>Stock:</strong> {variant.stock}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
