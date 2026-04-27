import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import productImg from "../../assets/e-commmerce_image1.png";

const Header = ({
  cart,
  searchTerm,
  setSearchTerm,
  products, //receive products
}) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);

  const onclose = () => {
    navigate("/");
  };

  // 🔍 Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) =>
        p.title.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5); // limit results

    setSuggestions(filtered);
  };

  //When user clicks suggestion
  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    setSuggestions([]);
    setSearchTerm("");
  };

  return (
    <div className="headerContainer">
      <div className="logo" onClick={onclose}>
        <img src={productImg} alt="product" />
      </div>

      <div className="SearchBar" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type="submit">🔍︎</button>

        {/*DROPDOWN */}
        {suggestions.length > 0 && (
          <div className="search-dropdown">
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="search-item"
                onClick={() => handleSelect(product)}
              >
                {product.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button className="cart" onClick={() => navigate("/cart")}>
          Cart ({cart.length})
        </button>
      </div>
    </div>
  );
};

export default Header;