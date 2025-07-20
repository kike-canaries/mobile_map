import React, { useState } from "react";
import styled from "styled-components";
import { Box, Button, Stack } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { TrackInfo } from "../../types/TrackInfo";

const ScrollableStack = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  overflow: auto;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const CollapsibleMenu = styled(Box)`
  transition: width 0.3s;
  background-color: #f5f5f5;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "flex-start" : "center"};
  padding: 8px;
  border-right: 1px solid #e0e0e0;
  overflow: hidden;
`;

const ToggleButton = styled(Button)`
  @media (max-width: 768px) {
    display none;
  }
  align-self: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "flex-start" : "center"};
  margin-bottom: 8px;
`;

type MenuProps = {
  trackInfoList: TrackInfo[];
  onTrackSelect: (id: string) => void;
};

const RouteList: React.FC<MenuProps> = ({ trackInfoList, onTrackSelect }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [menuFullyOpen, setMenuFullyOpen] = useState<boolean>(true);

  const handleMenuToggle = () => {
    if (menuOpen) {
      setMenuFullyOpen(false);
      setTimeout(() => setMenuOpen(false), 100); // Wait for animation to finish
    } else {
      setMenuOpen(true);
      setTimeout(() => setMenuFullyOpen(true), 100); // Wait for animation to finish
    }
  };

  return (
    <CollapsibleMenu isOpen={menuOpen}>
      <ToggleButton isOpen={menuOpen} variant="text" onClick={handleMenuToggle}>
        {menuOpen ? <Close /> : <Menu />}
      </ToggleButton>
      {menuFullyOpen && (
        <ScrollableStack>
          {trackInfoList.map((trackInfo: TrackInfo, index: number) => (
            <Button
              key={index}
              data-testid="button-track-info"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "8px", justifyContent: "center" }}
              onClick={() => onTrackSelect(trackInfo.name)}
            >
              {trackInfo.name}
            </Button>
          ))}
        </ScrollableStack>
      )}
    </CollapsibleMenu>
  );
};

export default RouteList;
