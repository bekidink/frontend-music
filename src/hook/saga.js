import { all, call, put, takeLatest } from 'redux-saga/effects';
import { 
   
  setAllSongs,
  setAlertType,
  setIsSongPlaying,
  setSongIndex,
  
  setStat,
  setAlbumIndex,
  setArtistIndex,
  SetMusic
} from './slice';
import { 
 
  getAllSongs, 
  
  saveNewSong,
 
  updateSong,
  deleteSong,

 
  getStat
} from '../api';
import { toast } from 'react-toastify';




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

// Saga for set songIndex


function* setSongIndexSaga(action) {
  try {
    // Assuming action.payload contains the song index
    yield put(setSongIndex(action.payload));
  } catch (error) {
    // Handle error if needed
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
// sag for update Song
function* updateSongSaga(action) {
  try {
    const { data, id } = action.payload;
    // // Call the API function to update the song
    const updatedSong = yield call(updateSong, data, id);
    // // Handle the successful update
    
  } catch (error) {
    // Handle errors if necessary
    // Dispatch an action to set error alert
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
    const { data } = action.payload;

    // Call the API to save the new song
   const song= yield call(saveNewSong, data);
    
    

    // Dispatch an action to set the alert type to success
    
  } catch (error) {
    // Dispatch an action to set the alert type to error if saving fails
    yield put(setAlertType('error'));
  }
}
// Other sagas for song, artist, and album CRUD operations...

export default function* userSaga() {
  yield all([
    
    
   
    // song
    takeLatest('user/fetchAllSongs', fetchAllSongsSaga),
    takeLatest('user/setSongIndex', setSongIndexSaga),
    takeLatest('user/setSongPlaying', setSongPlayingSaga),
    takeLatest('user/saveNewSong', saveNewSongSaga),
    takeLatest('user/updateSong', updateSongSaga),
    takeLatest('user/deleteSong', deleteSongSaga),

    takeLatest('user/setAlertType', setAlertTypeSaga),
    takeLatest('user/setMusic',setMusicSaga),
   
    
    takeLatest('stat',fetchStat)
   
   
    
    
   
    // Add other sagas here for song, artist, and album CRUD operations...
  ]);
}
