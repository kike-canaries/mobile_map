import { LatLng, LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

export type MapProps = {
  positions: LatLngExpression[],
  center?: LatLngExpression
};

const Map: React.FC<MapProps> = ({
  positions,
  center,
}) => {
  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      scrollWheelZoom={false} 
      style={{height: "100vh", width: "100%"}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline 
        positions={positions}
      />
    </MapContainer>
  )
}

export default Map;
