import React from "react";
import "./ProductList.css";

const Productlist = ({ products, viewProductData, addToCart }) => {
  //star
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push("★");
      } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
        stars.push("⯨"); // half star
      } else {
        stars.push("☆");
      }
    }
    return stars.join("");
  };

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>
          Try adjusting your search or filters to find what you're looking for!
        </p>
      </div>
    );
  }

  return (
    <div className="ProductContainer">
      {products.map((product) => (
        <div
          key={product.id}
          className="productCard"
          onClick={() => viewProductData(product)} //  Passes individual product dfetail.
        >
          <div className="imageproduct">
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <h2>{product.title}</h2>
          <div className="categoryRating">
            <p>{product.category}</p>
            <p className="star">
              {renderStars(product.rating)} <span>({product.rating})</span>
            </p>
          </div>
          <p>${product.price}</p>
          <button
            className="addtocart"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Productlist;
