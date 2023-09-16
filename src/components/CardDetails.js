import { Container, Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardModal from "./CardModal";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Rating } from "@mui/material";
import LoadingDetails from "../pages/LoadingDetails";

const CardDetails = () => {
  const params = useParams();
  const [hotelInfo, setHotelInfo] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setLoading] = useState(false);
  // const { isLoading } = useQuery(["repo"], () =>
  //   axios
  //     .get(`https://hotels-api-4ltr.onrender.com/api/hotels/${params.slug}`)
  //     .then((res) => setHotelInfo(res.data))
  // );
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://hotels-api-4ltr.onrender.com/api/hotels/${params.slug}`)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setHotelInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.slug]);

  return isLoading ? (
    <LoadingDetails />
  ) : (
    <Container maxWidth="lg" sx={{ marginTop: 10, marginBottom: 10 }}>
      <Typography variant="h4" sx={{    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px"}}>{hotelInfo.name}</Typography>
      <Grid container justifyContent={"center"} spacing={2}>
        {hotelInfo.images?.map((image) => {
          return (
            <Grid item lg={4} width="100%">
              <Card width={"100%"} height={345}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={image.img}
                    alt="hotel"
                  />
                </CardActionArea>
              </Card>
              {/* <img
                src={image.img}
                alt="Hotel"
                style={{
                  width: "95%",
                  borderRadius: "5px",
                  boxShadow: "5px 5px 5px grey",
                  margin: "10px",
                  height: "200px",
                }}
              /> */}
            </Grid>
          );
        })}
        <Grid style={{padding:"20px"}}>
          <Typography>{hotelInfo.aboutThePlace}</Typography>
          <h2>What this place offers:</h2>
          <Typography>
            <ul>
              {hotelInfo.features?.map((item) => {
                return <li>{item.text}</li>;
              })}
            </ul>
          </Typography>
        </Grid>
        <div className="button">
          <Button onClick={handleOpen} style={{ textAlign: "right" }}>
            Reserve
          </Button>
        </div>
        {open && (
          <CardModal
            open={open}
            handleClose={handleClose}
            price={hotelInfo.pricePerNight}
            hotelInfo={hotelInfo}
          />
        )}
      </Grid>
    </Container>
  );
};

export default CardDetails;
