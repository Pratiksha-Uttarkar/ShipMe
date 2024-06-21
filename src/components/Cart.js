import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abc = useParams();
  console.log(abc);
  //   console.log("Extracted userId from params:", userId);

  const fetchCartItems = async (userId) => {
    try {
      console.log(`Fetching cart items for user ID: ${userId}`);
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

    // Split the token into header, payload, and signature
    const [headerEncoded, payloadEncoded, signature] = jwtToken.split(".");

    // Decode the payload (second part)
    const decodedPayload = JSON.parse(
      atob(payloadEncoded.replace(/-/g, "+").replace(/_/g, "/"))
    );

    // Example usage
    console.log("pqrsttt", decodedPayload);
    const { userId } = decodedPayload;
    console.log("sakshi12345", userId);
    fetchCartItems(userId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log("akshay", cartItems);
  return (
    <div className="delivery-area-container">
      <h1 style={{ color: "black" }}>Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img
                src={item.imagePath}
                alt={item.item_name}
                width={100}
                height={100}
              />
              <div>
                <h3>Item Name: {item.item_name}</h3>
              </div>
              <div>
                <h3>Item Price: {item.item_price}</h3>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
