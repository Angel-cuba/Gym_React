import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/images/Logo.png";

const Navbar = () => {
  const { t } = useTranslation();
  const { user, signOut, openLoginModal } = useAuth();

  const displayName = user?.user_metadata?.display_name
    ?? user?.email?.split("@")[0]
    ?? "Usuario";

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
        {user && (
          <li>
            <Link to="/my-routines">Mis rutinas</Link>
          </li>
        )}
      </Stack>

      <div className="navbar__auth">
        {user ? (
          <>
            <span className="navbar__user-name">{displayName}</span>
            <button className="navbar__signout" onClick={signOut}>
              Salir
            </button>
          </>
        ) : (
          <button className="navbar__login-btn" onClick={openLoginModal}>
            Entrar
          </button>
        )}
      </div>
    </Stack>
  );
};

export default Navbar;
