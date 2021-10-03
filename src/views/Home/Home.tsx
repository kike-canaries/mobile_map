import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FirebaseService from "../../services/firebase/FirebaseService";
import { TrackInfo } from "../../types/TrackInfo";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { LatLngExpression } from "leaflet";
import { SensorData } from "../../types/SensorData";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

const firebaseService = new FirebaseService();
firebaseService.initFirebaseApp();

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

export default function Home(): JSX.Element {
  const [trackInfoList, setTrackInfoList] = useState<TrackInfo[]>([]);
  const [trackPositions, setTrackPositions] = useState<SensorData[]>([]);
  const [center, setCenter] = useState<LatLngExpression>({
    lat: -0.179265,
    lng: -78.474009,
  });

  const getTrackInfo: () => Promise<void> = async () => {
    const trackInfo = await firebaseService.getTrackInfoList();

    setTrackInfoList(trackInfo);
  };

  useEffect(() => {
    void getTrackInfo();
  }, []);

  const getTrackPositions = async (id: string) => {
    const positions: SensorData[] = await firebaseService.getTrackData(id);

    // setCenter();
    setTrackPositions(positions);
  };

  return (
    <Container maxWidth="xl" data-testid="component-app">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Mobile Map
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Stack>
            {trackInfoList.map((trackInfo: TrackInfo, index: number) => (
              <Button
                key={index}
                data-testid="button-track-info"
                variant="text"
                onClick={() => {
                  void getTrackPositions(trackInfo.name);
                }}
              >
                {trackInfo.name}
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={10}>
          <Map
            data-testid="component-map"
            positions={trackPositions}
            center={center}
            zoom={13}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
