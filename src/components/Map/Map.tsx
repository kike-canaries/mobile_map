import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { SensorData } from "../../types/SensorData";
import ChangeMapView from "../ChangeMapView";

export type MapProps = {
  positions: SensorData[];
  zoom: number;
};

const Map: React.FC<MapProps> = ({ positions, zoom }) => {
  return (
    <MapContainer
      zoom={zoom}
      center={[46.27, 6.06]}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <ChangeMapView positions={positions} />
      <TileLayer
        opacity={0.4}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
