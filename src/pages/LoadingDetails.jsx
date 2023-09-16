import React from "react";
import { Grid, Skeleton, Container } from "@mui/material";
const LoadingDetails = () => {
  return (
    <div>
      
      <Skeleton
        animation="move"
        variant="rectangular"
        width={"100%"}
        height={60}
      />
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Grid maxWidth={"lg"}>
          <Grid container spacing={2} marginTop={3}>
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              return (
                <Grid key={index} item md={4}>
                  <Skeleton
                    animation="move"
                    variant="rectangular"
                    width={"100%"}
                    height={200}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoadingDetails;
