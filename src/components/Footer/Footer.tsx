import React from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { GitHub, Twitter, Public } from "@mui/icons-material";

const FooterContainer = styled(Box)`
  background-color: #1976d2;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100%;
  z-index: 1000;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: underline;
  margin: 0 4px;
  &:hover {
    color: #90caf9;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Typography variant="body2">
        <FooterLink
          href="https://github.com/orgs/kike-canaries"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub style={{ verticalAlign: "middle", marginRight: "4px" }} />
          GitHub
        </FooterLink>
        <FooterLink
          href="https://x.com/canairq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter style={{ verticalAlign: "middle", marginRight: "4px" }} />
          Twitter
        </FooterLink>
        <FooterLink
          href="https://canair.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Public style={{ verticalAlign: "middle", marginRight: "4px" }} />
          Canairio
        </FooterLink>
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
