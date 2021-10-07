import { LatLng, polyline, layerGroup, LayerGroup } from "leaflet";
import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { SensorData } from "../../types/SensorData";

export type ChangeMapViewProps = {
  positions: SensorData[];
};

const ChangeMapView: React.FC<ChangeMapViewProps> = ({ positions }) => {
  const pathsLayerRef = useRef<LayerGroup>(layerGroup());
  const map = useMap();

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

export default ChangeMapView;
