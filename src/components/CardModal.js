import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Container,
  TextField,
  Typography,
  Box,
  Modal,
  Button,
} from "@mui/material";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

const CardModal = ({ open, handleClose, price, hotelInfo }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guestNumber, setGuestNumber] = React.useState(1);
  const [total, setTotal] = React.useState(
    hotelInfo.pricePerNight * guestNumber
  );
  const navigate = useNavigate();
  const handleChange = (event) => {
    setGuestNumber(event.target.value);
  }; 
  const handleReservation = () => {
    const reserveList = JSON.parse(localStorage.getItem("reserve")) || [];

    const posts = [
      {
        id: hotelInfo.id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guestNumber: guestNumber,
        total: total,
        reserveId: uuidv4(),
        name: hotelInfo.name,
        address: hotelInfo.address,
        rating: hotelInfo.rating,
      },
    ];

    const newPostList = [...reserveList, posts].reverse();

    localStorage.setItem("reserve", JSON.stringify(newPostList));
    navigate("/history");
    // Store the reservation data in Firestore
    // db.collection("reservations")
    //   .add({
    //     guestNumber,
    //     checkInDate,
    //     checkOutDate,
    //     timeStamp: auth.firestore.FieldValue.serverTimestamp(),
    //   })
    //   .then(() => {
    //     alert("Reservation successful!");
    //   })
    //   .catch((error) => {
    //     console.error("Error adding reservation: ", error);
    //   });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography className="mb-4">$ {price}/night</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Number of guest</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={guestNumber}
            label="guestNumber"
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          className="mt-4 ph"
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
        />
        <DatePicker
          className="mt-4 ph"
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
        />

        <Typography className="mt-4">
          $ {price} *{guestNumber} : $ {price * guestNumber}
        </Typography>
        <Typography className="mt-4">
          Sub Total: $ {price * guestNumber}
        </Typography>

        <Button
          className="mt-4"
          variant="contained"
          id="modal-modal-title"
          component="h2"
          onClick={() => {
            handleReservation();
          }}
        >
          Reserve
        </Button>
      </Box>
    </Modal>
  );
};

export default CardModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  outline:"none"
};
