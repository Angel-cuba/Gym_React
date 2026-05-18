import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/Logo-1.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box component="footer" className="footer">
      <Stack className="footer-inner">
        <img src={Logo} alt="GymLab" />
        <Typography>
          {t("footer")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
