import React from "react";
import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import { Download } from "@mui/icons-material";
import { TrackData } from "../../types/TracksData";
import { downloadTrackData } from "../../views/Home/homeUtils";

type HeaderProps = {
  trackData?: TrackData;
};

const HeaderContainer = styled(Box)`
  background-color: #1976d2;
  color: white;
  text-align: center;
  padding: 16px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 8px;
`;

const TrackDataName = styled(Typography)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const Header: React.FC<HeaderProps> = ({ trackData }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Typography variant="h4">Welcome to Mobile Map</Typography>
        {trackData && (
          <TrackDataName variant="h6">{trackData.name}</TrackDataName>
        )}
        {trackData && (
          <ButtonsContainer>
            <Button
              variant="contained"
              endIcon={<Download />}
              onClick={() => {
                void downloadTrackData(trackData);
              }}
            >
              Download
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: "Mobile Map",
                      url: window.location.href,
                    })
                    .catch(console.error);
                } else {
                  alert("Sharing is not supported on this browser.");
                }
              }}
            >
              Share
            </Button>
          </ButtonsContainer>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
