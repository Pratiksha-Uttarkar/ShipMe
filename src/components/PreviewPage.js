import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PreviewPage = () => {
  const { state } = useLocation();
  const { formData } = state || {};
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/cart?user_id=${userId}`
      );
      setCartItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setError(error);
      setLoading(false);
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

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  if (error) {
    return <div>Error fetching cart items: {error.message}</div>;
  }

  return (
    <div className="preview-page-container">
      <h2>Preview Page</h2>
      <div className="section">
        <h3>Personal Information</h3>
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lastName}</p>
        <p>Email: {formData.email}</p>
      </div>
      <div className="section">
        <h3>Address Information</h3>
        <p>Address: {formData.address}</p>
        <p>Country: {formData.country}</p>
        <p>State: {formData.state}</p>
      </div>
      <div className="section">
        <h3>Payment Information</h3>
        <p>Payment Mode: {formData.paymentMode}</p>
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
                <div>
                  <h4>Item Name: {item.item_name}</h4>
                  <p>Item Price: {item.item_price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
