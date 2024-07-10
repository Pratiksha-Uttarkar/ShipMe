import React from "react";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const OrderPage = () => {
  const { state } = useLocation();
  const { message, order_id } = state || {};
  console.log("OrderPage state:", state); // Log the state to debug

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "10px 13px 15px gray",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2>Order Confirmation</h2>
          </div>

          <p>
            Thank you for shopping with us. We'll send a confirmation when your
            item ships.
          </p>
          <div style={{ marginBottom: "20px" }}>
            <p>
              <strong>Order #{order_id || "000-0000000-0000000"}</strong>
            </p>
          </div>
          <p style={{ fontSize: "12px", color: "gray" }}>
            The payment for your invoice is processed by Shipme, Inc. P.O. Box
            81226 Seattle, Hubli 98108-1226. If you need assistance, please
            contact us.
          </p>
        </Box>
      </Container>
    </div>
  );
};

export default OrderPage;
