import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoClose, IoMusicalNote } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const PlayerContainer = styled.div(
  {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    width: "100%",
    padding: "1rem",
    position: "relative",
  },
  css`
    @media (max-width: 768px) {
      flex-direction: column;
      padding: 0.5rem;
      gap: 0.5rem;
    }
  `
);

const TopRow = styled.div(
  {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    width: "100%",
  },
  css`
    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  `
);

const BottomRow = styled.div(
  {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "0.75rem",
  },
  css`
    @media (max-width: 768px) {
      justify-content: space-between;
      width: 100%;
    }
  `
);

const SongImage = styled.img(
  {
    width: "10rem",
    height: "5rem",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
  css`
    @media (max-width: 768px) {
      width: 2rem;
      height: 2rem;
    }
  `
);


const SongInfo = styled.div(
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  css`
    @media (max-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  `
);

const SongTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
`;

const SongTitle = styled.p(
  {
    fontSize: "1rem",
    color: "#6B7280",
    fontWeight: "600",
  },
  css`
    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  `
);

const ArtistInfo = styled.p(
  {
    color: "#6B7280",
    fontWeight: "600",
  },
  css`
    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  `
);

const IconWrapper = styled(motion.i)(
  {
    color: "#6B7280",
    cursor: "pointer",
    "&:hover": {
      color: "#1E293B",
    },
  },
  css`
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  `
);

const StyledAudioPlayer = styled(AudioPlayer)(
  {
    flex: 1,
  },
  css`
    @media (max-width: 768px) {
      width: 100%;
      .rhap_container {
        box-shadow: none;
      }
    }
  `
);

const PlaylistWrapper = styled.div(
  {
    position: "absolute",
    left: "1rem",
    bottom: "6rem",
    gap: "0.5rem",
    padding: "0.5rem",
    width: "350px",
    maxWidth: "350px",
    height: "510px",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#1E293B",
  },
  css`
    @media (max-width: 768px) {
      left: 0.5rem;
      bottom: 4rem;
      width: calc(100% - 1rem);
      maxWidth: calc(100% - 1rem);
    }
  `
);

const PlaylistItem = styled(motion.div)(
  {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem",
    cursor: "pointer",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#F3F4F6",
    },
  },
  css`
    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  `
);

const SongText = styled.p(
  {
    fontSize: "1rem",
    color: "#1E293B",
    fontWeight: "600",
  },
  css`
    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  `
);

const CategoryText = styled.p(
  {
    color: "#6B7280",
    fontWeight: "600",
  },
  css`
    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  `
);

const MusicPlayer = () => {
  const allSongs = useSelector((state) => state.user.allSongs);
  const artistIndex = useSelector((state) => state.user.artistIndex);
  const albumIndex = useSelector((state) => state.user.albumIndex);
  const songIndex = useSelector((state) => state.user.songIndex);
  const searchSong = useSelector((state) => state.user.searchSong);
  const dispatch = useDispatch();
  const [isPlayList, setIsPlayList] = useState(false);
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songName, setSongName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const currentPath = location.pathname;

  const closePlayer = () => {
    dispatch({
      type: "user/setSongPlaying",
      payload: false,
    });
  };

  useEffect(() => {
    if (currentPath === "/search") {
      setImageUrl(searchSong[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songImageURL);
      setSongName(searchSong[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songName);
      setArtistName(searchSong[artistIndex]?.artistName);
      setAlbumName(searchSong[artistIndex]?.albums[albumIndex]?.albumName);
      setAudioUrl(searchSong[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songURL);
    } else {
      setImageUrl(allSongs[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songImageURL);
      setSongName(allSongs[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songName);
      setArtistName(allSongs[artistIndex]?.artistName);
      setAlbumName(allSongs[artistIndex]?.albums[albumIndex]?.albumName);
      setAudioUrl(allSongs[artistIndex]?.albums[albumIndex]?.songs[songIndex]?.songURL);
    }
  }, [allSongs, artistIndex, albumIndex, songIndex, dispatch, searchSong, currentPath]);

  return (
    <PlayerContainer>
      <TopRow>
        <SongImage src={imageUrl} alt="Song" />
        <SongInfo>
          <SongTextWrapper>
            <SongTitle>{songName?.length > 15 ? songName.slice(0, 15) : songName}</SongTitle>
            <ArtistInfo>{artistName} <span>{albumName}</span></ArtistInfo>
          </SongTextWrapper>
          <IconWrapper whileTap={{ scale: 0.8 }} onClick={() => setIsPlayList(!isPlayList)}>
            <RiPlayListFill />
          </IconWrapper>
        </SongInfo>
      </TopRow>
      <BottomRow>
        <StyledAudioPlayer
          src={audioUrl}
          onPlay={() => console.log("is playing")}
          autoPlay={false}
          showSkipControls={true}
        />
        <IoClose onClick={closePlayer} />
      </BottomRow>
      {isPlayList && <PlayListCard />}
    </PlayerContainer>
  );
};

export const PlayListCard = () => {
  const allSongs = useSelector((state) => state.user.allSongs);
  const searchSong = useSelector((state) => state.user.searchSong);
  const artistIndex = useSelector((state) => state.user.artistIndex);
  const albumIndex = useSelector((state) => state.user.albumIndex);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath !== "/search" && !allSongs) {
      dispatch({ type: "user/fetchAllSongs" });
    }
  }, [allSongs, searchSong, dispatch, currentPath]);

  const setCurrentPlaySong = (artistIndex, albumIndex, songIndex) => {
    dispatch({ type: "user/setSongIndex", payload: { songIndex } });
    dispatch({ type: "user/setAlbumIndex", payload: { albumIndex } });
    dispatch({ type: "user/setArtistIndex", payload: { artistIndex } });
    dispatch({ type: "user/setSongPlaying", payload: true });
  };

  const renderSongs = (songs, artistIdx, albumIdx) =>
    songs.map((song, songIdx) => (
      <PlaylistItem
        key={`${artistIdx}-${albumIdx}-${songIdx}`}
        initial={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: (artistIdx + albumIdx + songIdx) * 0.1 }}
        onClick={() => setCurrentPlaySong(artistIdx, albumIdx, songIdx)}
      >
        <IoMusicalNote className="text-2xl cursor-pointer" />
        <div>
          <SongText>
            {song.songName.length > 15 ? song.songName.slice(0, 15) : song.songName}
            <span>{song.albumName}</span>
          </SongText>
          <ArtistInfo>
            {song.artistName}
            <CategoryText>{song.category}</CategoryText>
          </ArtistInfo>
        </div>
      </PlaylistItem>
    ));

  return (
    <PlaylistWrapper>
      {currentPath === "/search"
        ? searchSong.length > 0 && searchSong.map((artist, artistIdx) =>
            artist.albums.map((album, albumIdx) => renderSongs(album.songs, artistIdx, albumIdx))
          )
        : allSongs.length > 0 && allSongs.map((artist, artistIdx) =>
            artist.albums.map((album, albumIdx) => renderSongs(album.songs, artistIdx, albumIdx))
          )}
    </PlaylistWrapper>
  );
};

export default MusicPlayer;
