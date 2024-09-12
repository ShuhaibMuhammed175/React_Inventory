import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/addproduct.css";
import AuthContext from "./AuthContext";

function AddProduct() {
  const { userId } = useContext(AuthContext);
  const { authToken } = useContext(AuthContext);

  const [productID, setProductID] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [active, setActive] = useState(true);
  const [hsnCode, setHsnCode] = useState("");
  const [subvariants, setSubvariants] = useState([
    { size: "S", color: "red", stock: 0 },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubvariants = [...subvariants];
    updatedSubvariants[index][name] = value;
    setSubvariants(updatedSubvariants);
  };

  const addSubvariant = () => {
    setSubvariants([...subvariants, { size: "S", color: "red", stock: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ProductID: parseInt(productID),
      ProductCode: productCode,
      ProductName: productName,
      CreatedUser: userId,
      IsFavourite: isFavourite,
      Active: active,
      HSNCode: hsnCode,
      subvariants: subvariants,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/add-product/", newProduct, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="number"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Code:</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Is Favourite:</label>
          <input
            type="checkbox"
            checked={isFavourite}
            onChange={() => setIsFavourite(!isFavourite)}
          />
        </div>
        <div className="form-group">
          <label>Active:</label>
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive(!active)}
          />
        </div>
        <div className="form-group">
          <label>HSN Code:</label>
          <input
            type="text"
            value={hsnCode}
            onChange={(e) => setHsnCode(e.target.value)}
            required
          />
        </div>
        <div className="subvariants-container">
          <h3>Subvariants:</h3>
          {subvariants.map((subvariant, index) => (
            <div key={index} className="form-group">
              <label>Size:</label>
              <select
                name="size"
                value={subvariant.size}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
              <label>Color:</label>
              <select
                name="color"
                value={subvariant.color}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </select>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={subvariant.stock}
                onChange={(e) => handleChange(e, index)}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setSubvariants(subvariants.filter((_, i) => i !== index))
                  }
                >
                  Remove Subvariant
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSubvariant}>
            Add Subvariant
          </button>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
