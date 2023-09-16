import React from "react";
import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Pagination } from "@mui/material";
import axios from "axios";
import Cards from "./Cards";

import LoadingSkeleton from "../pages/LoadingSkeleton";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const hotelLimitPerPage = 6;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://hotels-api-4ltr.onrender.com/api/hotels")
      .then((response) => { 
        setLoading(false);
        setHotels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const startIndex = (page - 1) * hotelLimitPerPage;
  const endIndex = page * hotelLimitPerPage - 1;
  const filterHotels = hotels.slice(startIndex, endIndex + 1);
  const totalHotels = hotels.length;
  const totalPages = Math.ceil(totalHotels / hotelLimitPerPage);

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: 10, marginBottom: 10 }}>
        <Grid container spacing={2}>
          {filterHotels.length > 0
            ? filterHotels.map((hotel) => {
                return (
                  <Grid key={hotel.id} item md={4}>
                    <Cards hotel={hotel} />
                  </Grid>
                );
              })
            : "No hotels found"}
        </Grid>
        <Pagination
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
          count={totalPages}
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      </Container>
    </div>
  );
};

export default Home;
