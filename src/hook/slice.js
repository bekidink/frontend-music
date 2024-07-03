import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: null,
  stat:null,
  allSongs: null,
  song:null,
  alertType: null,
  songIndex: 0,
  artistIndex:1,
  albumIndex:0,
  music:null,
  isSongPlaying: false,
  searchSong:null,
  isSearch:false,
  searchBy:null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setStat: (state, action) => {
      state.stat = action.payload;
    },
    setSearchSong: (state, action) => {
      state.searchSong = action.payload;
    },
    setAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    setSong:(state,action)=>{
state.song=action.payload;
    },
    setAlertType: (state, action) => {
      state.alertType = action.payload;
    },
    setSongIndex: (state, action) => {
      console.log('Reducer setSongIndex called with payload:', action.payload);
      state.songIndex = action.payload;
    },
    setAlbumIndex: (state, action) => {
      console.log('Reducer setAlbumIndex called with payload:', action.payload);
      state.albumIndex = action.payload;
    },
    setArtistIndex: (state, action) => {
      console.log('Reducer setArtistIndex called with payload:', action.payload);
      state.artistIndex = action.payload;
    },
    setIsSongPlaying: (state, action) => {
      state.isSongPlaying = action.payload;
    },
    SetMusic: (state, action) => {
      state.music = action.payload;
    },
    SetIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    SetSearchBy:(state,action)=>{
      state.searchBy=action.payload
    }
  },
});

export const {
  
  setAllSongs,
  setSong,
  setAlertType,
  setSongIndex,
  setIsSongPlaying,
  setStat,
  setAlbumIndex,
  SetMusic,
  setArtistIndex,
  setSearchSong,
  SetIsSearch,
  SetSearchBy
} = userSlice.actions;

export default userSlice.reducer;
