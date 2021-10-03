import { LatLng, polyline, layerGroup, LayerGroup } from "leaflet";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { SensorData } from "../../types/SensorData";

export type MapProps = {
  positions: SensorData[];
  center: LatLng;
  zoom: number;
};

const ChangeMapView: React.FC<MapProps> = ({ center, zoom, positions }) => {
  const pathsLayerRef = useRef<LayerGroup>(layerGroup());
  const map = useMap();
  map.setView(center, zoom);

  const getColor = (value: number) => {
    if (value <= 13) return "#187218";
    else if (value <= 35) return "#E8E372";
    else if (value <= 55) return "#ffa500";
    else if (value <= 150) return "#f00";
    else if (value <= 250) return "#950ad7";
    else return "#584949";
  };

  useEffect(() => {
    const polylines: LatLng[] = [];

    pathsLayerRef.current.clearLayers();

    positions.forEach((sensorData: SensorData, index: number) => {
      if (index < positions.length - 1) {
        const latLngPos: LatLng[] = [];
        const nextPos = index + 1;
        const initPos = new LatLng(sensorData.lat, sensorData.lon);
        const endPos = new LatLng(
          positions[nextPos].lat,
          positions[nextPos].lon
        );
        latLngPos.push(initPos);
        latLngPos.push(endPos);

        polylines.push(initPos);

        const newPolyline = polyline(latLngPos, {
          color: getColor(sensorData.P25),
        });

        pathsLayerRef.current.addLayer(newPolyline).addTo(map);
      } else {
        polylines.push(new LatLng(sensorData.lat, sensorData.lon));
      }
    });

    const multi = polyline(polylines);

    if (positions.length > 0) {
      map.fitBounds(multi.getBounds());
    }
  }, [positions]);

  return null;
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
