import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu"; 
import { Link } from "react-router-dom";
import Person3Icon from '@mui/icons-material/Person3';
import { useState } from "react";
import SwipeableTemporaryDrawer from "./SideDrawer";

const NavBar = () => {
 
  const isUserLogin = localStorage.getItem("isLogin")
   
  const [state, setState] = useState({
    
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }


    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <AppBar component="nav" style={{ background: "#fff", color: "#333" }}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            //todo open menu in mobile view
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display:  "block" }}
          >
            <Link to="/"> BookStay</Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }} 
          >
           
        {!isUserLogin ? <><Link to="/register">Register</Link> | <Link to="/login">Login</Link></>: <IconButton aria-label="person3icon"   color="primary" onClick={toggleDrawer("right", true)}>
         <Person3Icon/>
         </IconButton>}
         
          </Box>
        </Toolbar>
      </AppBar>
        <SwipeableTemporaryDrawer toggleDrawer={toggleDrawer}  state={state} /> 
    </>
  );
};

export default NavBar;
