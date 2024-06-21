import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CategoryStore({}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: categoryId } = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category-store?category_id=${categoryId}`
      );
      setData(response.data.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="delivery-area-container">
      <h1 style={{ color: "black" }}>Stores</h1>
      <div className="grid-container">
        {data.map((store) => (
          <div>
            <h2>{store.store_name}</h2>
            <Link to={`/store/${store.store_id}`}>
              <img
                src={store.imagePath}
                alt={store.store_name}
                style={{ width: "100%" }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

{
}
