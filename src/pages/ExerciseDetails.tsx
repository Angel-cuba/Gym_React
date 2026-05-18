import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details/Details";
import Similars from "../components/Details/Similars";
import Videos from "../components/Details/Videos";
import { Exercise, Video } from "../types/exercises.types";
import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";
import {
  fallbackExercises,
  getFallbackExerciseById,
} from "../data/fallbackExercises";

type YoutubeSearchResponse = {
  contents?: Video[];
};

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

      const exerciseDetailData = await fetchData<Exercise>(
        `${fetch}/exercise/${id}`,
        exerciseOptions
      );
      const safeExercise = exerciseDetailData ?? getFallbackExerciseById(id);
      setExercisesDetails(safeExercise);

      if (!safeExercise) {
        setVideos([]);
        setSimilarsTarget(fallbackExercises);
        setEquipment(fallbackExercises);
        return;
      }

      const exerciseYoutubeData = await fetchData<YoutubeSearchResponse>(
        `${ytUrl}/search?query=${safeExercise.name}`,
        youtubeOptions
      );
      setVideos(exerciseYoutubeData?.contents ?? []);

      const similarsData = await fetchData<Exercise[]>(
        `${fetch}/target/${safeExercise.target}`,
        exerciseOptions
      );
      setSimilarsTarget(
        similarsData?.length
          ? similarsData
          : fallbackExercises.filter((exercise) => exercise.target === safeExercise.target)
      );

      const equipmentData = await fetchData<Exercise[]>(
        `${fetch}/equipment/${safeExercise.equipment}`,
        exerciseOptions
      );
      setEquipment(
        equipmentData?.length
          ? equipmentData
          : fallbackExercises.filter(
              (exercise) => exercise.equipment === safeExercise.equipment
            )
      );
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
