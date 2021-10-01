import { SensorData } from "./SensorData";

export type TrackData = {
  data: SensorData[];
  date: string;
  deviceId: string;
  lastLat: number;
  lastLon: number;
  lastSensorData: SensorData;
  name: string;
  size: number;
};
