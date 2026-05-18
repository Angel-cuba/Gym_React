import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/Logo.png";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Stack component="nav" className="navbar" direction="row">
      <Link className="brand" to="/">
        <img src={Logo} alt={t("brandAlt")} />
        <span>GymLab</span>
      </Link>
      <Stack component="ul" className="nav-links" direction="row">
        <li>
          <Link to="/">{t("nav.home")}</Link>
        </li>
        <li>
          <a href="#search">{t("nav.search")}</a>
        </li>
        <li>
          <a href="#exercises">{t("nav.exercises")}</a>
        </li>
      </Stack>
    </Stack>
  );
};

export default Navbar;
