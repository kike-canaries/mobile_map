import { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";

export type MapProps = {
  positions: LatLngExpression[];
  center: LatLngExpression;
  zoom: number;
};

export type ChangeMapViewProps = {
  zoom: number;
  center: LatLngExpression;
};

const ChangeMapView: React.FC<ChangeMapViewProps> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Map: React.FC<MapProps> = ({ positions, center, zoom }) => {
  return (
    <MapContainer
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <ChangeMapView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} />
    </MapContainer>
  );
};

export default Map;
