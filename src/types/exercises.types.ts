export type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  gifUrl: string;
  equipment: string;
  target: string;
  instructions?: string[];
  secondaryMuscles?: string[];
};
export interface Video {
  videoId: string;
  title: string;
  channelName: string;
  thumbnails: { url: string }[];
}
