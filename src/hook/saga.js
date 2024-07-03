import { all, call, put, takeLatest } from 'redux-saga/effects';
import { 
   
  setAllSongs,
  setAlertType,
  setIsSongPlaying,
  setSongIndex,
  setSong,
  setStat,
  setAlbumIndex,
  setArtistIndex,
  SetMusic,
  setSearchSong,
  SetIsSearch,
  SetSearchBy
} from './slice';
import { 
 
  getAllSongs, 
  getOneSong,
  saveNewSong,
 
  updateSong,
  deleteSong,

 
  getStat,
  searchSong
} from '../api';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';




// Saga for fetching stat


function* fetchStat() {
  try {
    const stat = yield call(getStat);
    yield put(setStat(stat));
  } catch (error) {
    yield put(setAlertType("error"));
  }
}
// Saga for fetching all songs
function* fetchAllSongsSaga() {
  try {
    const songs = yield call(getAllSongs);
    if(songs){
      yield put(setAllSongs(songs));
    }
   
  } catch (error) {
    yield put(setAlertType("error"));
  }
}

function* setSongIndexSaga(action) {
  try {
    console.log('setSongIndexSaga action:', action);
    const { songIndex } = action.payload || {};
    if (songIndex === undefined) {
      throw new Error('Payload is undefined');
    }
    console.log('setSongIndexSaga payload:', songIndex);
    yield put(setSongIndex(songIndex));
  } catch (error) {
    console.log('Error in setSongIndexSaga:', error.message);
  }
}

function* setAlbumIndexSaga(action) {
  try {
    console.log('setAlbumIndexSaga action:', action);
    const { albumIndex } = action.payload || {};
    if (albumIndex === undefined) {
      throw new Error('Payload is undefined');
    }
    console.log('setAlbumIndexSaga payload:', albumIndex);
    yield put(setAlbumIndex(albumIndex));
  } catch (error) {
    console.log('Error in setAlbumIndexSaga:', error.message);
  }
}

function* setArtistIndexSaga(action) {
  try {
    console.log('setArtistIndexSaga action:', action);
    const { artistIndex } = action.payload || {};
    if (artistIndex === undefined) {
      throw new Error('Payload is undefined');
    }
    console.log('setArtistIndexSaga payload:', artistIndex);
    yield put(setArtistIndex(artistIndex));
  } catch (error) {
    console.log('Error in setArtistIndexSaga:', error.message);
  }
}


// saga for setSongPlaying
function* setSongPlayingSaga(action) {
  try {
    // Assuming action.payload contains the song index
    yield put(setIsSongPlaying(action.payload));
  } catch (error) {
    // Handle error if needed
  }
}

function* setAlertTypeSaga(action) {
  const  alertType  = action.payload;
  try {
    yield put(setAlertType(alertType));
  } catch (error) {
    // Handle error if necessary
    console.error('Error setting alert type:', error);
  }
}
function* getSongSaga(action) {
  try {
    const {  id } = action.payload;
    // // Call the API function to update the song
    const song = yield call(getOneSong,  id);
    // // Handle the successful update
    if(song){
      yield put(setSong(song));
    }
  } catch (error) {
    // Handle errors if necessary
    // Dispatch an action to set error alert
    yield put(setAlertType('error'));
  }
}
// sag for update Song
function* updateSongSaga(action) {
  
  try {
    const {data, id ,navigate} = action.payload;
    // // Call the API function to update the song
    
    const updatedSong = yield call(updateSong,data, id,navigate);
    // // Handle the successful update

 
  } catch (error) {
    // Handle errors if necessary
    // Dispatch an action to set error alert
    console.log(error)
    yield put(setAlertType('error'));
  }
}
// 
function* deleteSongSaga(action) {
  try {
    // Extract the song ID from the action payload
    const { id } = action.payload;
    
    // Call the API to delete the song
    yield call(deleteSong, id);
    
    
    const songs = yield call(getAllSongs);
    yield put(setAllSongs(songs));
    
  } catch (error) {
    // Dispatch an action to set the alert type to error if deletion fails
    yield put(setAlertType('error'));
  }
}
 //saga for musicplayer
function* setMusicSaga(action){
  try {
    const  data  = action.payload;
    yield put(SetMusic(data))
  } catch (error) {
    
  }
}



function* saveNewSongSaga(action) {
  try {
    // Extract the data of the new song from the action payload
    const { songData,navigate } = action.payload;

    // Call the API to save the new song
   const song= yield call(saveNewSong, songData,navigate);
    
    

    // Dispatch an action to set the alert type to success
    
  } catch (error) {
    // Dispatch an action to set the alert type to error if saving fails
    yield put(setAlertType('error'));
  }
}

function* searchSongSaga(action) {
  try {
    yield put(SetIsSearch(true))
    const { query ,navigate} = action.payload;
   
   const songs= yield call(searchSong, query,navigate);
   if(songs){
    yield put(setSearchSong(songs));
    
  }
  yield put(SetIsSearch(false))
  yield put(SetSearchBy(query))
  } catch (error) {
    // Dispatch an action to set the alert type to error if saving fails
    yield put(SetIsSearch(false))
  }
}
// Other sagas for song, artist, and album CRUD operations...

export default function* userSaga() {
  yield all([
    
    
   
    // song
    takeLatest('user/fetchAllSongs', fetchAllSongsSaga),
    takeLatest('user/fetchSong',getSongSaga),
    takeLatest('user/setSongIndex', setSongIndexSaga),
    takeLatest('user/setSongPlaying', setSongPlayingSaga),
    takeLatest('user/saveNewSong', saveNewSongSaga),
    takeLatest('user/updateSong', updateSongSaga),
    takeLatest('user/deleteSong', deleteSongSaga),
    takeLatest('user/searchSong', searchSongSaga),
    takeLatest('user/setAlertType', setAlertTypeSaga),
    takeLatest('user/setAlbumIndex', setAlbumIndexSaga),
    takeLatest('user/setArtistIndex', setArtistIndexSaga),
    takeLatest('user/setMusic',setMusicSaga),
    takeLatest('stat',fetchStat)
   
   
    
    
   
    // Add other sagas here for song, artist, and album CRUD operations...
  ]);
}
