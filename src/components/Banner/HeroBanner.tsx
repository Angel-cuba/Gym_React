import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import HeroBannerImage from "../../assets/images/banner.png";

/**
 * A function component that renders a hero banner on the main page.
 * The component contains a heading, subheading, text, and a button.
 * The component takes no arguments and returns a JSX element.
 */
const HeroBanner = (): JSX.Element => {
  return (
    <Box component="section" className="hero-section">
      <Stack className="hero-copy">
        <Typography className="eyebrow">
          Fitness Club
        </Typography>
        <Typography component="h1" className="hero-title">
          Entrena con intención, sin ruido.
        </Typography>
        <Typography className="hero-text">
          Busca ejercicios, filtra por zona del cuerpo y abre rutinas visuales para moverte mejor desde el primer set.
        </Typography>
        <Stack direction="row" className="hero-actions">
          <Button className="primary-button" variant="contained" href="#exercises">
            Explorar ejercicios
          </Button>
          <Button className="secondary-button" variant="outlined" href="#search">
            Buscar rutina
          </Button>
        </Stack>
        <Stack direction="row" className="hero-stats">
          <span><strong>12+</strong> ejercicios base</span>
          <span><strong>7</strong> zonas clave</span>
          <span><strong>0</strong> distracciones</span>
        </Stack>
      </Stack>
      <Box className="hero-visual">
        <img
          src={HeroBannerImage as string}
          alt="Atleta entrenando con bandas"
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
