import { TrackData } from "../../types/TracksData";

export const downloadTrackData: (trackData: TrackData) => void = (
  trackData: TrackData
) => {
  if (trackData) {
    const fileName = trackData.name;
    const json = JSON.stringify(trackData);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
