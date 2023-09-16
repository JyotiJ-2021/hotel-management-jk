import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavBar from "./Navbar";
import { Container } from "@mui/material";

export default function History() {
  let reserveList = JSON.parse(localStorage.getItem("reserve")) || [];
  console.log(reserveList);
  // const fetchReservations = () => {
  //   db.collection("reservations")
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log(querySnapshot);
  //       // const reservationsData = [];
  //       // querySnapshot.forEach((doc) => {
  //       //   reservationsData.push({ id: doc.id, ...doc.data() });
  //       // });
  //       // // Update the state with the fetched data
  //       // setReservations(reservationsData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching reservations: ", error);
  //     });
  // };

  return (
    <>
      <Container sx={{ marginTop: 15 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Hotel Name</TableCell>
                <TableCell align="right">Hotel Address</TableCell>
                <TableCell align="right">Checking In</TableCell>
                <TableCell align="right">check out</TableCell>

                <TableCell align="right">Total Guest</TableCell>
                <TableCell align="right">Total Prize</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reserveList.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0].name}
                  </TableCell>
                  <TableCell align="right">{row[0].address}</TableCell>
                  <TableCell align="right">{row[0].checkInDate}</TableCell>
                  <TableCell align="right">{row[0].checkOutDate}</TableCell>
                  <TableCell align="right">{row[0].guestNumber}</TableCell>
                  <TableCell align="right">{row[0].total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
