import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import FirebaseService from "../../services/firebase/FirebaseService";
import { TrackInfo } from "../../types/TrackInfo";
import { Box, Button } from "@mui/material";
import { SensorData } from "../../types/SensorData";
import { TrackData } from "../../types/TracksData";
import RouteList from "../../components/RouteList";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import RouteIcon from "@mui/icons-material/Route"; // Import the Route icon

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

const firebaseService = new FirebaseService();
firebaseService.initFirebaseApp();

const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: rgb(29, 27, 27); /* Light background for mobile */
`;

const ContentContainer = styled(Box)`
  display: flex;
  flex: 1;
  // height: calc(100vh - 128px); /* Subtract header and footer height */
  // margin-top: 64px; /* Header height */
  // margin-bottom: 64px; /* Footer height */

  @media (max-width: 768px) {
    flex: 1;
    flex-direction: column;
  }
`;

const MapContainer = styled(Box)`
  flex-grow: 1;
  overflow: hidden;
  width: 100%;
`;

const ToggleButton = styled(Button)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 5rem;
    right: 1rem;
    z-index: 1002;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    min-width: 0;
    padding: 0;
    background-color: #1976d2;
    color: white;

    &:hover {
      background-color: #1565c0;
    }
  }
`;

const RouteListContainer = styled(Box)`
  @media (max-width: 768px) {
    display: ${({ isVisible }: { isVisible: boolean }) =>
      isVisible ? "block" : "none"};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    overflow-y: auto;
  }
`;

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

export default function Home(): JSX.Element {
  const [trackInfoList, setTrackInfoList] = useState<TrackInfo[]>([]);
  const [trackPositions, setTrackPositions] = useState<SensorData[]>([]);
  const [trackData, setTrackData] = useState<TrackData | undefined>();
  const [isRouteListVisible, setIsRouteListVisible] = useState(false);
  const [initalRender, setInitialRender] = useState(true);

  const router = useRouter();
  const { trackId } = router.query;

  const toggleRouteListVisibility = (force?: boolean) => {
    if (force !== undefined) {
      setIsRouteListVisible(force);
      return;
    }
    setIsRouteListVisible((prev) => !prev);
  };

  const getTrackInfo: () => Promise<void> = async () => {
    const trackInfo = await firebaseService.getTrackInfoList();

    setTrackInfoList(trackInfo);
  };

  useEffect(() => {
    void getTrackInfo();
  }, []);

  const getTrackPositions = async (id: string) => {
    toggleRouteListVisibility(false);
    const newTrackData: TrackData = await firebaseService.getTrackData(id);

    setTrackData(newTrackData);
    setTrackPositions(newTrackData.data);
    void router.replace(
      {
        pathname: router.pathname, // stay on the same page
        query: { trackId: id }, // add your params
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!trackId || !initalRender) return;
    void getTrackPositions(trackId as string);
    setInitialRender(false);
  }, [trackId]);

  return (
    <PageContainer>
      <Header trackData={trackData} />
      <ToggleButton
        variant="contained"
        onClick={() => toggleRouteListVisibility()}
      >
        <RouteIcon /> {/* Use the Route icon */}
      </ToggleButton>
      <ContentContainer data-testid="component-app">
        <RouteListContainer isVisible={isRouteListVisible}>
          <RouteList
            trackInfoList={trackInfoList}
            onTrackSelect={getTrackPositions}
          />
        </RouteListContainer>

        <MapContainer>
          <Map
            data-testid="component-map"
            positions={trackPositions}
            zoom={13}
          />
        </MapContainer>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}
