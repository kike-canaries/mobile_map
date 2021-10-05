import { LatLng } from "leaflet";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { SensorData } from "../../types/SensorData";
import ChangeMapView from "../ChangeMapView";

export type MapProps = {
  positions: SensorData[];
  center: LatLng;
  zoom: number;
};

const Map: React.FC<MapProps> = ({ positions, center, zoom }) => {
  return (
    <MapContainer
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <ChangeMapView center={center} zoom={zoom} positions={positions} />
      <TileLayer
        opacity={0.4}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
