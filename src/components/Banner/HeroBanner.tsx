import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HeroBannerImage from "../../assets/images/banner.png";

/**
 * A function component that renders a hero banner on the main page.
 * The component contains a heading, subheading, text, and a button.
 * The component takes no arguments and returns a JSX element.
 */
const HeroBanner = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Box component="section" className="hero-section">
      <Stack className="hero-copy">
        <Typography className="eyebrow">
          {t("hero.eyebrow")}
        </Typography>
        <Typography component="h1" className="hero-title">
          {t("hero.title")}
        </Typography>
        <Typography className="hero-text">
          {t("hero.text")}
        </Typography>
        <Stack direction="row" className="hero-actions">
          <Button className="primary-button" variant="contained" href="#exercises">
            {t("hero.explore")}
          </Button>
          <Button className="secondary-button" variant="outlined" href="#search">
            {t("hero.searchRoutine")}
          </Button>
        </Stack>
        <Stack direction="row" className="hero-stats">
          <span><strong>12+</strong> {t("hero.statExercises")}</span>
          <span><strong>7</strong> {t("hero.statZones")}</span>
          <span><strong>0</strong> {t("hero.statFocus")}</span>
        </Stack>
      </Stack>
      <Box className="hero-visual">
        <img
          src={HeroBannerImage as string}
          alt={t("hero.imageAlt")}
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
