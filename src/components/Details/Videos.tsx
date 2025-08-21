import React from "react";
import { Box, Stack, Typography } from "@mui/material";
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
  return (
    <Box sx={{ marginTop: { lg: "200px", xs: "20px" } }} p="20px">
      <Typography variant="h4" mb="33px" align="center">
        Watch{" "}
        <span style={{ color: "#ff2625", textTransform: "capitalize" }}>
          {name}
        </span>{" "}
        exercise on YouTube
      </Typography>
      <Stack
        justifyContent="space-around"
        flexWrap={"wrap"}
        alignItems="center"
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "110px", xs: "0" } }}
      >
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
    </Box>
  );
};

export default Videos;
