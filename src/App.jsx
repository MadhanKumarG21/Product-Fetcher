import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Productlist from "./Components/ProductList/Productlist";
import Header from "./Components/Header/Header";
import ProductView from "./Components/ProductList/ProductView";
import Cart from "./Components/ProductList/Cart";
import Category from "./Components/ProductList/Category/Category";
import "./App.css";
import Footer from "./Components/Footer/Footer";

const ProductDetailRoute = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  if (!product) return <div style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>Product Not Found</div>;
  return <ProductView selectedProduct={product} addToCart={addToCart} />;
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [rating, setRating] = useState(0);
  const [priceSort, setPriceSort] = useState("");
  const [Brand, setBrand] = useState("");

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    FetchProducts();
  }, []);

  //  Pass the function and the product as parameters
  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  //Add to cart
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
//Increase quantity of product in cart
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCart(updatedCart);
  };
// Decrease quantity of product in cart
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };
//Remove product from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };
//Total price of product
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  
let filteredProducts = products.filter((product) => {
  const searchMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
  const categoryMatch = category === "all" || product.category === category;
  const ratingMatch =product.rating >= rating;
  const brandMatch = Brand === "" || product.brand === Brand;
  return searchMatch && categoryMatch && ratingMatch && brandMatch;
});
if (priceSort === "low-high") {
  filteredProducts = [...filteredProducts].sort(
    (a, b) => a.price - b.price
  );
}
if (priceSort === "high-low") {
  filteredProducts = [...filteredProducts].sort(
    (a, b) => b.price - a.price
  );
}
  // useEffect(() => {
  //   console.log(cart);
  // }, [cart]);

  return (
    <>
      <Header
        cart={cart}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>Loading products...</div>
      ) : (
        <Routes>
          <Route path="/" element={
            <div className="mainContainer">
              <aside>
                <Category
                  products={products}
                  setCategory={setCategory}
                  setRating={setRating}
                  setPriceSort={setPriceSort}
                  setBrand={setBrand}
                />
              </aside>
              <Productlist
                products={filteredProducts}
                viewProductData={handleViewProduct}
                addToCart={addToCart}
              />
            </div>
          } />
          <Route path="/cart" element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
              totalPrice={totalPrice}
              viewProduct={handleViewProduct}
            />
          } />
          <Route path="/product/:id" element={
            <ProductDetailRoute products={products} addToCart={addToCart} />
          } />
        </Routes>
      )}
      <Footer/>
    </>
  );
};

export default App;
