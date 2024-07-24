import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ChevronRight, Home } from "@mui/icons-material";
import styled from "@emotion/styled";

import Header from "../components/Header";
import SongsContainer from "../components/HomeContainer";
import Loader from "../components/Loader";
import EmptyMusic from "../components/Empty";

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NavWrapper = styled.nav`
  display: flex;
  margin-bottom: 2rem;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  margin-top: 1.25rem;
`;

const NavList = styled.ol`
  display: inline-flex;
  align-items: center;
  > * + * {
    margin-left: 0.25rem;
  }
  @media (min-width: 768px) {
    > * + * {
      margin-left: 0.5rem;
    }
  }
`;

const NavItem = styled.li`
  display: inline-flex;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  &:hover {
    color: #2563eb;
  }
`;

const NavText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  &:hover {
    color: #2563eb;
  }
`;

const ChevronIcon = styled(ChevronRight)`
  width: 0.75rem;
  height: 0.75rem;
  color: #9ca3af;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
`;

const SongsGrid = styled.div`
  width: 100vw;
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  align-items: center;
  justify-content: space-evenly;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export default function SearchPage() {
  const searchBy = useSelector((state) => state.user.searchBy);
  const searchSong = useSelector((state) => state.user.searchSong);
  const isSearch = useSelector((state) => state.user.isSearch);
  const [isLoading] = useState(false);

  return (
    <Container>
      <Header />
      <NavWrapper aria-label="Breadcrumb">
        <NavList>
          <NavItem>
            <StyledNavLink to="/">
              <Home />
              Home
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <ChevronIcon />
              <NavText>Search Result</NavText>
            </div>
          </NavItem>
          {searchBy && (
            <NavItem>
              <div css={{ display: 'flex', alignItems: 'center' }}>
                <ChevronIcon />
                <NavText>{searchBy}</NavText>
              </div>
            </NavItem>
          )}
        </NavList>
      </NavWrapper>
      {isSearch && (
          <Loader/>
        )}
      <SongsGrid>
       
        {!isSearch && searchBy && searchSong?.length===0 && (
          <>
          <div className="text-center">No Search Found For {searchBy}</div>
          <EmptyMusic/>
          </>
          
        )}
        {!isSearch && searchSong && searchSong.map((artist, i) =>
          artist.albums.map((album, index) => (
            <SongsContainer
              key={index}
              data={album}
              artistIndex={i}
              artistName={artist.artistName}
              albumIndex={index}
            />
          ))
        )}
      </SongsGrid>
    </Container>
  );
}