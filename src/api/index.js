import axios from "axios";
const baseURL = "https://node-backend-ldyo.onrender.com/";


// api for get stat
export const getStat = async () => {
  try {
    const res = await axios.get(`${baseURL}api/song/stat`);
    return res.data;
  } catch (error) {
    return null;
  }
};
// api for getAll song
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/song/`);
    return res.data;
  } catch (error) {
    return null;
  }
};
// api for savesong
export const saveNewSong = async (data) => {
  try {
    const res =await axios.post(`${baseURL}api/song/save`, { ...data });
    return res;
  } catch (error) {
    return null;
  }
};
// api for getOneSong
export const getOneSong = async (id) => {
  try {
    const res = await axios.get(`${baseURL}api/song/${id}`);
    return res.data;
  } catch (error) {
    return null;
  }
};
// api for update song
export const updateSong = async (data, id) => {
  try {
    const res =await axios.put(`${baseURL}api/song/${id}`, { ...data });
   
    return res;

  } catch (error) {
    return null;
  }
};
// api for delete song
export const deleteSong = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/song/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};






//album





