import React from 'react'
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

export default function Layout1() {
  return (
    <div className='layout1' style={{paddingBottom:"50px"}}>
        <h1 style={{paddingTop:"50px",paddingBottom:"50px"}}>Top Picks for you</h1>
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
                image="/assets/getbiz.png"
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
                image="/assets/bite.png"
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
                image="/assets/self.png"
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
                image="/assets/move.png"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
