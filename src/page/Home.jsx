import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import Header from "../components/Header";
import SongsContainer from "../components/HomeContainer";

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
`;

const SongsGrid = styled.div`
  width: 100vw;
  margin-top: 1.25rem;
  margin-left: 5rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  align-items: center;
  justify-content: space-evenly;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Home component to render the header and song lists
const Home = () => {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.user.allSongs);
  const searchSong = useSelector((state) => state.user.searchSong);
  const isSearch = useSelector((state) => state.user.isSearch);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!allSongs) {
      setIsLoading(true);
      dispatch({ type: 'user/fetchAllSongs' });
    } else {
      setIsLoading(false);
    }
  }, [allSongs, dispatch]);

  return (
    <Container>
      <Header />
      <SongsGrid>
        {!allSongs && (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        )}
        
        {allSongs && allSongs.map((artist, i) =>
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
};

export default Home;