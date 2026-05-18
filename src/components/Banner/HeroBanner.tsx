import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import HeroBannerImage from "../../assets/images/banner.png";
import { WeeklySessionModal } from "../WeeklySession/WeeklySessionModal";

const HeroBanner = (): JSX.Element => {
  const [wsOpen, setWsOpen] = useState(false);

  return (
    <>
      <Box component="section" className="hero-section">
        <Stack className="hero-copy">
          <Typography className="eyebrow">Fitness Club</Typography>
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
            <Button
              className="weekly-button"
              variant="outlined"
              onClick={() => setWsOpen(true)}
            >
              <span className="weekly-button__icon">📅</span>
              Rutinas semanales
            </Button>
          </Stack>
          <Stack direction="row" className="hero-stats">
            <span><strong>12+</strong> ejercicios base</span>
            <span><strong>7</strong> zonas clave</span>
            <span><strong>5</strong> programas</span>
          </Stack>
        </Stack>
        <Box className="hero-visual">
          <img src={HeroBannerImage as string} alt="Atleta entrenando con bandas" />
        </Box>
      </Box>

      <WeeklySessionModal isOpen={wsOpen} onClose={() => setWsOpen(false)} />
    </>
  );
};

export default HeroBanner;
