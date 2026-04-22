import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import productImg from "../../assets/e-commmerce_image1.png";
const Header = ({
  cart,
  searchTerm,
  setSearchTerm,
}) => {
  const navigate = useNavigate();

  const onclose = () => {
    navigate("/");
  };
  return (
    <div className="headerContainer">
      <div className="logo" onClick={onclose}>
       <img src={productImg} alt="product" />
      </div>
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍︎</button>
      </div>
      <div>
        <button className="cart" onClick={() => navigate("/cart")}>Cart ({cart.length})</button>
      </div>
    </div>
  );
};

export default Header;
