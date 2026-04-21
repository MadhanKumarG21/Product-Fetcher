import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import Checkout from "./CheckOut";

const Cart = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  totalPrice,
  viewProduct,
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="emptycart">
        <div className="emptycontainer">
          <h2>Cart is Empty</h2>
          <button
            className="continueShoping"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showCheckout ? (
        <Checkout
          cart={cart}
          totalPrice={totalPrice}
          setShowCheckout={setShowCheckout}
        />
      ) : (
        <div className="cartWrapper">
          {/* Header Section */}
          <div className="cartHeader">
            <button className="backBtn" onClick={() => navigate("/")}>
              ← Back to Products
            </button>
            <h1 className="cartTitle">My Cart</h1>
          </div>

          {/* Grid */}
          <div className="cartGrid">
            {cart.map((item) => (
              <div className="cartItem" key={item.id}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  onClick={() => viewProduct(item)}
                />

                <h3 onClick={() => viewProduct(item)}>{item.title}</h3>

                <p className="price">
                   ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Quantity */}
                <div className="quantityControl">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                {/* Remove */}
                <button
                  className="removeitem"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cartend">
             {/* Total */}
          <h2 className="cartTotal">Total: ${totalPrice.toFixed(2)}</h2>

          {/* Checkout Button */}
          <button className="checkoutBtn" onClick={() => setShowCheckout(true)}>
            Proceed to Checkout
          </button>
          </div>
         
        </div>
      )}
    </>
  );
};

export default Cart;
