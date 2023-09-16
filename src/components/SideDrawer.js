import * as React from 'react'; 
import SwipeableDrawer from '@mui/material/SwipeableDrawer'; 
import ListItem from '@mui/material/ListItem'; 
import { useNavigate } from "react-router";
import { useState,useEffect } from 'react';

export default function SwipeableTemporaryDrawer({toggleDrawer, state}) {
    const navigate = useNavigate(); 
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    
    const logout = async () => {
      try { 
        navigate("/");
        localStorage.setItem("isLogin", false)
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("userh"))  
        if(user){
            setName(user.name)
        setEmail(user.email)
        }
        
    },[])
  

  return (
    <div> 
        <React.Fragment key={"right"}> 
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            sx={{width:"300px"}}
          >
            
           <ListItem>{name}</ListItem>
           <ListItem>{email}</ListItem>
           <ListItem onClick={()=> logout()} sx={{cursor:"pointer"}}>Logout</ListItem>
          </SwipeableDrawer>
        </React.Fragment>
      
    </div>
  );
}