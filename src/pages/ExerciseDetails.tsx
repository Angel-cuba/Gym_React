import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details/Details";
import Similars from "../components/Details/Similars";
import Videos from "../components/Details/Videos";
import { Exercise, Video } from "../types/exercises.types";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";
// Remove import for Video type if not needed or already defined elsewhere

const ExerciseDetails = () => {
  const { id } = useParams();

  const [exerciseDetails, setExercisesDetails] =
    React.useState<Exercise | null>(null);
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [similarsTarget, setSimilarsTarget] = React.useState<Exercise[] | null>(
    null
  );
  const [equipment, setEquipment] = React.useState<Exercise[] | null>(null);

  React.useEffect(() => {
    const exerciseDbUrl = async () => {
      const fetch = "https://exercisedb.p.rapidapi.com/exercises";
      const ytUrl = "https://youtube-search-and-download.p.rapidapi.com";

      // Fetching details
      const exerciseDetailData = await fetchData(
        `${fetch}/exercise/${id}`,
        exerciseOptions
      );
      setExercisesDetails(exerciseDetailData);

      // Fetching videos
      const exerciseYoutubeData = await fetchData(
        `${ytUrl}/search?query=${exerciseDetailData?.name}`,
        youtubeOptions
      );
      setVideos(exerciseYoutubeData.contents);

      // Fetching similars
      const similarsData = await fetchData(
        `${fetch}/target/${exerciseDetailData?.target}`,
        exerciseOptions
      );
      setSimilarsTarget(similarsData);
      //Fetching equipment
      const equipmentData = await fetchData(
        `${fetch}/equipment/${exerciseDetailData?.equipment}`,
        exerciseOptions
      );
      setEquipment(equipmentData);
    };

    exerciseDbUrl();
  }, [id]);
  return (
    <Box>
      {/* Details */}
      <Details exerciseDetails={exerciseDetails} />
      {/* Videos */}
      <Videos videos={videos} name={exerciseDetails?.name ?? ""} />
      {/* Others */}
      <Similars similarsTarget={similarsTarget} equipment={equipment} />
    </Box>
  );
};

export default ExerciseDetails;
