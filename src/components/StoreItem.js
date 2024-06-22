import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function StoreItem({ addToCart, setCartNumber }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: storeId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/store-item?store_id=${storeId}`
      );
      setData(response.data.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchData();
    }
  }, [storeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddToCart = async (item) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const [headerEncoded, payloadEncoded, signature] = jwtToken.split(".");
      const decodedPayload = JSON.parse(
        atob(payloadEncoded.replace(/-/g, "+").replace(/_/g, "/"))
      );

      console.log("abcde", decodedPayload);
      const { userId } = decodedPayload;
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/add-to-cart`, {
        user_id: userId,
        item_id: item.item_id,
        quantity: 1,
      });
      const response = await axios.get(
        `http://localhost:5000/api/v1/cart?user_id=${userId}`
      );
      setCartNumber(response.data.data.length);
      addToCart(item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <h1 style={{ color: "black", textAlign: "center", marginBottom: "20px" }}>
        Items
      </h1>
      <div className="grid-container-item">
        {data.map((item) => (
          <div key={item.item_id} className="grid-item">
            <h2>{item.item_name}</h2>
            <img
              src={item.imagePath}
              alt={item.item_name}
              style={{ width: "100%" }}
            />
            <h3>Item Price: {item.item_price}</h3>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleAddToCart(item)}
              style={{ marginTop: "10px" }}
            >
              Add
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
