import React, { useEffect, useState } from "react";
import NavBar from "../Navbar";
import { useNavigate } from "react-router"; 

const Layout = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  useEffect(() => {
   
   
    let users = JSON.parse(localStorage.getItem("isLogin"))
    let username =JSON.parse(localStorage.getItem("userh"))
      if (!users) {
      navigate("/");
    }
    setName(username.name);

  }, []);
  return (
    <div>
      <NavBar name={name} />
      {props.children}
      <footer className="footer">Copyright</footer>
    </div>
  );
};

export default Layout;
