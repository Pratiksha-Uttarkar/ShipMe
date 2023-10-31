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
      try {
        const response = await axios.get(' http://localhost:3000/api/v1/category',data);
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
    <div style={{paddingTop:"50px"}}>
      <Grid
        container
        spacing={2}
      >
          {data.map(function(item){

            if(item.isActive){
            return  <Grid item={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imagePath}
                />
              </CardActionArea>
            </Card>
          </Grid>
            }
          })}
      
      </Grid>
    </div>
  );
};
