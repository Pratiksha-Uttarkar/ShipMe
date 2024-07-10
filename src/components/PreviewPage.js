import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PreviewPage = ({ setCartNumber }) => {
  const { state } = useLocation();
  const { formData } = state || {};
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/cart?user_id=${userId}`
      );
      console.log("----------------", response.data.data);
      setCartItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setError(error);
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      setError(new Error("User not authenticated"));
      return;
    }

    const [headerEncoded, payloadEncoded, signature] = jwtToken.split(".");
    const decodedPayload = JSON.parse(
      atob(payloadEncoded.replace(/-/g, "+").replace(/_/g, "/"))
    );
    const { userId } = decodedPayload;

    const orderData = {
      userId,
      address: formData.address,
      paymentMode: formData.paymentMode,
      country: formData.country,
      state: formData.state,
      firstName: formData.firstName,
      lastName: formData.lastName,
      cartItems: cartItems.map((item) => ({
        itemId: item.item_id,
        itemPrice: item.item_price,
        quantity: item.quantity,
        storeId: item.store_id,
        item_name: item.item_name,
        item_price: item.item_price,
        quantity: item.quantity,
        imagePath: item.imagePath,
      })),
    };
    console.log("JJJJJJJJJJJJJJJJJJJ", orderData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/order",
        orderData,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      setCartNumber(0);
      console.log("Order Response:", response.data);
      if (response.data.success) {
        navigate("/orderpage", {
          state: {
            message: response.data.data.message,
            order_id: response.data.data.order_id,
          },
        });
      } else {
        setError(new Error(response.data.error));
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      const [headerEncoded, payloadEncoded, signature] = jwtToken.split(".");
      const decodedPayload = JSON.parse(
        atob(payloadEncoded.replace(/-/g, "+").replace(/_/g, "/"))
      );
      const { userId } = decodedPayload;

      fetchCartItems(userId);
    } else {
      setError(new Error("User not authenticated"));
      setLoading(false);
    }
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.item_price * item.quantity,
      0
    );
  };
  if (loading) {
    return <div>Loading cart items...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="preview-page-container" style={{ textAlign: "left" }}>
      <h2>Preview Page</h2>
      <div className="section">
        <h3>Delivery Address</h3>
        <p>
          {formData.firstName} {formData.lastName}
        </p>
        <p> {formData.email}</p>

        <p>
          {formData.address}, {formData.country}
        </p>

        <p> {formData.state}</p>
      </div>

      <div className="section cart-items">
        <h3>Cart Items</h3>
        {cartItems.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img
                  src={item.imagePath}
                  alt={item.item_name}
                  width={100}
                  height={100}
                />
                <div style={{ flexGrow: 1 }}>
                  <h4>{item.item_name}</h4>
                  <p> {item.quantity}</p>
                </div>
                <p style={{ marginLeft: "auto" }}>
                  ₹{item.item_price * item.quantity}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div style={{ textAlign: "right" }}>
          Total Price: ₹{calculateTotalPrice()}
        </div>
      </div>

      <div className="section">
        <h3>Payment Information</h3>
        <p> {formData.paymentMode}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default PreviewPage;
