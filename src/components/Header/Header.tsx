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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  padding: 0 1rem;
  color: white;
  background-color: #1976d2;
  width: 100%;

  @media (min-width: 769px) {
  }
`;

const HeaderContent = styled(Box)`
  display: flex;
  background-color: rgb(134, 205, 42);
  @media (min-width: 769px) {
  }
`;

const ButtonsContainer = styled(Box)`
  display: flex;
  gap: 8px;
`;

const TrackDataName = styled(Typography)`
  @media (max-width: 768px) {
    position: absolute;
    top: 5rem;
    right: 1rem;
    z-index: 1000;
    color: #1976d2;
  }
`;

const Title = styled(Typography)`
  font-size: 1.5rem;

  @media (min-width: 769px) {
    font-size: 2rem;
  }
`;

const Header: React.FC<HeaderProps> = ({ trackData }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "CanAirIO Mobile Map Track",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback: Copy the URL to the clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch(() => {
          alert("Failed to copy the link. Please copy it manually.");
        });
    }
  };

  return (
    <HeaderContainer>
      <Title variant="h4">Mobile Map</Title>
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
          <Button variant="contained" onClick={handleShare}>
            Share
          </Button>
        </ButtonsContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
