import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Deliveryarea() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/v1/delivery-area",
        data
      );
      setData(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="delivery-area-container">
      <h1 style={{ color: "black" }}>Delivery areas Hubli</h1>
      <div className="grid-container">
        {data.map((area) => (
          <div key={area.area_id} className="grid-item">
            {area.area_name}
          </div>
        ))}
      </div>
    </div>
  );
}
