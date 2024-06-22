import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
// import "./Cart.css";

export default function Cart({ cartItems, setCartItems, setCartNumber }) {
  let tempPrice = 0;
  // const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
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
  const ChangeQuantity = async (user_id, item_id, quantity) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/add-to-cart`, {
      user_id: user_id,
      item_id: item_id,
      quantity,
    });
    const items = await fetchCartItems(user_id);
    console.log("sakshiiiiiiii", items);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const [headerEncoded, payloadEncoded, signature] = jwtToken.split(".");
    const decodedPayload = JSON.parse(
      atob(payloadEncoded.replace(/-/g, "+").replace(/_/g, "/"))
    );

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
  console.log("abc", cartItems);

  function handleProceed() {
    navigate("/checkout");
  }

  return (
    <div className="delivery-area-container">
      <h1>Cart</h1>
      <div className="px-4 my-5">
        <div className="container py-4">
          {cartItems.length > 0 ? (
            <ul className="cart-list">
              {cartItems.map(
                (item, index) =>
                  item.quantity > 0 && (
                    <li key={index} className="cart-item">
                      <img
                        src={item.imagePath}
                        alt={item.item_name}
                        width={100}
                        height={100}
                      />
                      <div className="item-details">
                        <h3>Item Name: {item.item_name}</h3>
                        <h3>Item Price: {item.item_price}</h3>
                      </div>
                      <div className="quantity-controls">
                        <button
                          className="quantity-button"
                          onClick={async () => {
                            await ChangeQuantity(
                              item.user_id,
                              item.item_id,
                              -1
                            );
                            if (item.quantity == 1) {
                              setCartNumber((cn) => cn - 1);
                            }
                          }}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="quantity-button"
                          onClick={async () => {
                            await ChangeQuantity(item.user_id, item.item_id, 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <h4 className="item-subtotal">
                        Sub Total: $
                        {(tempPrice = item.item_price * item.quantity)}
                      </h4>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="total-price">
            Total Price: $
            {cartItems.reduce(
              (acc, item) => acc + item.item_price * item.quantity,
              0
            )}
          </div>
          <div className="button-container">
            <Button variant="contained" onClick={() => handleProceed()}>
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
