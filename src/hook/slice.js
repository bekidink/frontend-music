import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: null,
  stat:null,
  allSongs: null,
  alertType: null,
  songIndex: 0,
  artistIndex:0,
  albumIndex:0,
  music:null,
  isSongPlaying: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setStat: (state, action) => {
      state.stat = action.payload;
    },
   
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    
    setAlertType: (state, action) => {
      state.alertType = action.payload;
    },
    setSongIndex: (state, action) => {
      state.songIndex = action.payload;
    },
    setAlbumIndex: (state, action) => {
      state.albumIndex = action.payload;
    },
  setArtistIndex:(state, action) => {
    state.artistIndex = action.payload;
  },
    setIsSongPlaying: (state, action) => {
      state.isSongPlaying = action.payload;
    },
    SetMusic: (state, action) => {
      state.music = action.payload;
    },
  },
});

export const {
  
  setAllSongs,
  
  setAlertType,
  setSongIndex,
  setIsSongPlaying,
  setStat,
  setAlbumIndex,
  SetMusic,
  setArtistIndex
} = userSlice.actions;

export default userSlice.reducer;
