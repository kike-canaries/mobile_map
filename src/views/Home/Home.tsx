import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import FirebaseService from "../../services/firebase/FirebaseService";
import { TrackInfo } from "../../types/TrackInfo";
import { Box } from "@mui/material";
import { SensorData } from "../../types/SensorData";
import { TrackData } from "../../types/TracksData";
import RouteList from "../../components/RouteList";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

const firebaseService = new FirebaseService();
firebaseService.initFirebaseApp();

const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 128px); /* Subtract header and footer height */
  margin-top: 64px; /* Header height */
  margin-bottom: 64px; /* Footer height */
`;

const MapContainer = styled(Box)`
  flex-grow: 1;
  overflow: hidden;
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
    <>
      <Header trackData={trackData} />
      <ContentContainer data-testid="component-app">
        <RouteList
          trackInfoList={trackInfoList}
          onTrackSelect={getTrackPositions}
        />
        <MapContainer>
          <Map
            data-testid="component-map"
            positions={trackPositions}
            zoom={13}
          />
        </MapContainer>
      </ContentContainer>
      <Footer />
    </>
  );
}
