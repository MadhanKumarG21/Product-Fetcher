import React from "react";
import "./Category.css";

const Category = ({
  setCategory,
  setRating,
  setPriceSort,
  setBrand,
  products
}) => {

  //Remove undefined/null + ensure uniqueness
  const uniqueCategories = [
    ...new Set(products.map((p) => p.category).filter(Boolean))
  ];

  const uniqueBrands = [
    ...new Set(products.map((p) => p.brand).filter(Boolean))
  ];

  return (
    <div className="CategoryContainer">

      {/* CATEGORY FILTER */}
      <h3>Category</h3>
      <select
        aria-label="Category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All</option>
        {uniqueCategories.map((cat) => (
          <option key={`cat-${cat}`} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* BRAND FILTER */}
      <h3>Brand</h3>
      <select
        aria-label="Brand"
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="">All</option>
        {uniqueBrands.map((brand) => (
          <option key={`brand-${brand}`} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      {/* RATING FILTER */}
      <h3>Rating</h3>
      <select
        aria-label="Rating"
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value="0">All</option>
        <option value="4">4 & above</option>
        <option value="3">3 & above</option>
        <option value="2">2 & above</option>
      </select>

      {/* PRICE SORT */}
      <h3>Price</h3>
      <select
        aria-label="Price sort"
        onChange={(e) => setPriceSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="low-high">Low → High</option>
        <option value="high-low">High → Low</option>
      </select>

    </div>
  );
};

export default Category;