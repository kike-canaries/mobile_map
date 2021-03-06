import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import FirebaseService from "../../services/firebase/FirebaseService";
import { TrackInfo } from "../../types/TrackInfo";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { SensorData } from "../../types/SensorData";
import { Download } from "@mui/icons-material";
import { TrackData } from "../../types/TracksData";
import { downloadTrackData } from "./homeUtils";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

const firebaseService = new FirebaseService();
firebaseService.initFirebaseApp();

const ScrollableStack = styled(Stack)`
  height: 90vh;
  overflow: auto;
`;

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

export default function Home(): JSX.Element {
  const [trackInfoList, setTrackInfoList] = useState<TrackInfo[]>([]);
  const [trackPositions, setTrackPositions] = useState<SensorData[]>([]);
  const [trackData, setTrackData] = useState<TrackData | undefined>();

  const getTrackInfo: () => Promise<void> = async () => {
    const trackInfo = await firebaseService.getTrackInfoList();

    setTrackInfoList(trackInfo);
  };

  useEffect(() => {
    void getTrackInfo();
  }, []);

  const getTrackPositions = async (id: string) => {
    const newTrackData: TrackData = await firebaseService.getTrackData(id);

    setTrackData(newTrackData);
    setTrackPositions(newTrackData.data);
  };

  return (
    <Container maxWidth="xl" data-testid="component-app">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Mobile Map
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {trackData && (
            <Box
              display="flex"
              flexDirection="row"
              gap={3}
              justifyContent="center"
            >
              <Typography variant="body1" component="h2" gutterBottom>
                {trackData.name}
              </Typography>
              <Button
                variant="contained"
                endIcon={<Download />}
                onClick={() => {
                  void downloadTrackData(trackData);
                }}
              >
                Download
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={2}>
          <ScrollableStack>
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
          </ScrollableStack>
        </Grid>
        <Grid item xs={10}>
          <Map
            data-testid="component-map"
            positions={trackPositions}
            zoom={13}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
