import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckOut.css";

const Checkout = ({ cart, totalPrice, setShowCheckout,setCart }) => {
  const navigate = useNavigate();
  const fullNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const pincodeRef = useRef();
  const paymentRef = useRef();

  // Empty Check Function
  const isEmpty = (str) => {
    if (str.length === 0) return true;

    for (let i = 0; i < str.length; i++) {
      if (str[i] !== " ") {
        return false;
      }
    }
    return true;
  };

  //  Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get values
    const fullName = fullNameRef.current.value;
    const address = addressRef.current.value;
    const city = cityRef.current.value;
    const pincode = pincodeRef.current.value;
    const paymentMethod = paymentRef.current.value;

    //Manual Validation
    if (
      isEmpty(fullName) ||
      isEmpty(address) ||
      isEmpty(city) ||
      isEmpty(pincode)
    ) {
      alert("Please fill all the details");
      return;
    }

    //  Order Object
    const orderData = {
      shippingAddress: {
        fullName,
        address,
        city,
        pincode,
      },
      paymentMethod,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.quantity * item.price,
      })),
      totalPrice: totalPrice.toFixed(2),
    };

    console.log("Order Data:", orderData);
    alert("🎉 Order placed successfully!");
    navigate("/");
    setCart([]);
  };

  return (
    <div className="checkoutWrapper">
      <button onClick={() => setShowCheckout(false)} className="backBtn">
        ← Back to Cart
      </button>

      <h1 className="checkoutTitle">Checkout</h1>

      <form onSubmit={handleSubmit}>
        {/* Address */}
        <div className="section">
          <h3>Shipping Address</h3>

          <input type="text" placeholder="Full Name" ref={fullNameRef} />
          <input type="text" placeholder="Address" ref={addressRef} />
          <input type="text" placeholder="City" ref={cityRef} />
          <input type="text" placeholder="Pincode" ref={pincodeRef} />
        </div>

        {/* Payment */}
        <div className="section">
          <h3>Payment Method</h3>

          <select ref={paymentRef} defaultValue="Cash on Delivery">
            <option value="">Select Payment</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </div>

        {/* Summary */}
        <div className="section">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.id} className="summaryItem">
              <span>{item.title}</span>
              <span>
                {item.quantity} * ${item.price} = $
                {(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <h2>Total: ${totalPrice.toFixed(2)}</h2>

        <button type="submit" className="placeOrder">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
