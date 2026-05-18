import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Video } from "../../types/exercises.types";

/**
 * A component that renders a list of videos related to the given exercise
 *
 * @param {{ videos: Video[], name: string }} props
 * @returns {JSX.Element}
 */

const Videos = ({
  videos,
  name,
}: {
  videos: Video[];
  name: string;
}): JSX.Element => {
  const { t } = useTranslation();
  const exerciseName = name || t("videos.fallbackName");

  return (
    <Box component="section" className="video-section">
      <Typography className="section-title" align="center">
        {t("videos.title", { name: exerciseName })}
      </Typography>
      {!videos?.length ? (
        <Typography className="empty-state" textAlign="center">
          {t("videos.empty")}
        </Typography>
      ) : (
        <Stack className="video-grid">
          {videos?.slice(0, 6).map((video: Video, index: number) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={video.thumbnails[0].url} alt={video.title} />
            <Box>
              <Typography variant="h6" color="#000000">
                {video.title}
              </Typography>
              <Typography variant="h6" color="#34080885">
                {video.channelName}
              </Typography>
            </Box>
          </a>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Videos;
