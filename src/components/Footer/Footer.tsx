import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../../assets/images/Logo-1.png";

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Stack className="footer-inner">
        <img src={Logo} alt="GymLab" />
        <Typography>
          Hecho para entrenar con foco. Proyecto por Angel.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
