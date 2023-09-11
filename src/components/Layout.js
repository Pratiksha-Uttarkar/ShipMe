import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export const Layout = () => {
  return (
    <div>
      <Grid
        container
        spacing={2}
      >
        <Grid item={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/assets/groceries.png"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/assets/pickimg.png"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/assets/meatimg.png"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/assets/fruitsimg.png"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
