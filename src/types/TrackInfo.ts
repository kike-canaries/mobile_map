import { SensorData } from "./SensorData";

export type TrackInfo = {
  date: string;
  deviceId: string;
  lastLat: number;
  lastLon: number;
  lastSensorData: SensorData;
  name: string;
  size: number;
};