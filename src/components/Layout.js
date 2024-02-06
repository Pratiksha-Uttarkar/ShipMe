import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

export const Layout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    console.log("fetch data called");
    try {
      // const response = await axios.get('http://localhost:3000/api/v1/test',data);
      // console.log('response from react==========');
      // console.log(response);

      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/v1/test",
        data
      );
      setData(response.data.data);
      console.log("data", response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // const res =  fetch('http://localhost:3000/api/v1/test');
    // console.log('response from react==========');
    // console.log(res);

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div style={{ paddingTop: "50px" }}>
      <Grid container spacing={2}>
        {data.map(function (item) {
          if (item.isActive) {
            return (
              <Grid item={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      alt={item.imagePath.replace("http://localhost:3001", "")}
                      image={item.imagePath.replace(
                        "http://localhost:3001",
                        ""
                      )}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </div>
  );
};
