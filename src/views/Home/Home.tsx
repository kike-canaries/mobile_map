import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { DatabaseReference, DataSnapshot, ref, onValue } from "firebase/database";
import { database } from "../../../firebase/clientApp";
import { TrackInfo } from "../../types/TrackInfo";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { TrackData } from "../../types/TracksData";
import { LatLngExpression } from "leaflet";
import { SensorData } from "../../types/SensorData";

const Map = dynamic(
  () => import('../../components/Map'),
  {
    ssr: false
  }
)

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

export default function Home(): JSX.Element {
  const [trackInfoList, setTrackInfoList] = useState<TrackInfo[]>([]);
  const [trackPositions, setTrackPositions] = useState<LatLngExpression[]>([])
  const [mapCenter, setMapCenter] = useState<LatLngExpression>({lat: 0, lng: 0})

  useEffect(() => {
    const starCountRef: DatabaseReference = ref(database, 'tracks_info/');
    onValue(starCountRef, (snapshot: DataSnapshot) => {
      const newTrackInfoList: TrackInfo[] = []
      snapshot.forEach((child: DataSnapshot) => {
        newTrackInfoList.push(child.val())
      });

      setTrackInfoList(newTrackInfoList);
    })
  }, []);

  const getTrackData = (id: string) => {
    const starCountRef: DatabaseReference = ref(database, 'tracks_data/' + id);
    onValue(starCountRef, (snapshot: DataSnapshot) => {
      const trackData = snapshot.val() as TrackData
      
      const positions = trackData.data.map((data: SensorData): LatLngExpression => {
        const latLng: LatLngExpression = {
          lat: data.lat,
          lng: data.lon,
          alt: data.alt
        }
        return latLng;
      });
      console.warn(positions);
      setTrackPositions(positions);
      setMapCenter(positions[0])
    })
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Mobile Map
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Stack>
            {
              trackInfoList.map((trackInfo: TrackInfo, index: number) =>
                <Button
                  key={index}
                  variant="text"
                  onClick={() => {
                    getTrackData(trackInfo.name);
                  }}>
                  {trackInfo.name}
                </Button>
              )
            }
          </Stack>
        </Grid>
        <Grid item xs={10}>
          <Map 
            positions={trackPositions}
            center={mapCenter}
          />
        </Grid>
      </Grid>

    </Container>
  );
}
