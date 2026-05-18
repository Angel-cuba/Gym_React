import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../../assets/images/Logo.png";

const Navbar = () => {
  return (
    <Stack component="nav" className="navbar" direction="row">
      <Link className="brand" to="/">
        <img src={Logo} alt="Fitness Club" />
        <span>GymLab</span>
      </Link>
      <Stack component="ul" className="nav-links" direction="row">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <a href="#search">Buscar</a>
        </li>
        <li>
          <a href="#exercises">Ejercicios</a>
        </li>
      </Stack>
    </Stack>
  );
};

export default Navbar;
