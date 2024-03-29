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
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { DateRange } from "react-date-range";

const CardModal = ({ open, handleClose, price, hotelInfo }) => { 
  const [guestNumber, setGuestNumber] = React.useState(1);
   const [dates, setDates]= useState([{startDate:new Date(), endDate:new Date(), key:"selection"}])
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
        checkInDate: dates[0].startDate,
        checkOutDate: dates[0].endDate,
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
   
  };

  
  const handleSelect =(e)=>{
    console.log(e)
  }
console.log(dates)
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
       
         <DateRange className="mt-4 ph"
              ranges={dates}
              onChange={({selection}) => setDates([selection])}
              minDate={new Date()}
      />
       

        <Typography className="mt-4" style={{fontSize:"16px", fontWeight:"600", justifyContent:"space-between", display:"flex"}}>
         <p> $ {price} *{guestNumber} Nights:</p> <p> $ {price * guestNumber}</p>
        </Typography>
        <Typography className="mt-4 " style={{fontSize:"16px", fontWeight:"600", justifyContent:"space-between", display:"flex"}}>
         <p> Sub Total:</p><p > $ {price * guestNumber}</p>
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
