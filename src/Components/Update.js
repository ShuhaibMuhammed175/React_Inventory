import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../css/update.css";
import AuthContext from "./AuthContext";

function StockManagement() {
  const [products, setProducts] = useState([]);
  let { userId, authToken } = useContext(AuthContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user-products/${userId}/`,
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        );
        setProducts(response.data);
        console.log("vhhhfgcgdgufgfhgh", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userId, authToken]);

  const handleAddStock = async () => {
    const data = {
      product: selectedProduct,
      size: selectedSize,
      color: selectedColor,
      stock: quantity,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add-to-stock/",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Stock added successfully");
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Error adding stock");
    }
  };

  const handleRemoveStock = async () => {
    const data = {
      product: selectedProduct,
      size: selectedSize,
      color: selectedColor,
      stock: quantity,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/remove-stock/",
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Stock removed successfully");
      }
    } catch (error) {
      console.error("Error removing stock:", error);
      alert("Error removing stock");
    }
  };

  return (
    <div className="stock-management-container">
      <h1>Stock Management</h1>
      <div className="form-group">
        <label>Select Product:</label>
        <select
          className="dropdown"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.ProductName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Size:</label>
        <select
          className="dropdown"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select a size</option>
          {products
            .flatMap((product) => product.subvariants.map((sub) => sub.size))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Color:</label>
        <select
          className="dropdown"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">Select a color</option>
          {products
            .flatMap((product) => product.subvariants.map((sub) => sub.color))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="buttons-container">
        <button className="button add" onClick={handleAddStock}>
          Add Stock
        </button>
        <button className="button remove" onClick={handleRemoveStock}>
          Remove Stock
        </button>
      </div>
    </div>
  );
}

export default StockManagement;
