import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const baseURL = "https://node-backend-ldyo.onrender.com/";
// const baseURL='http://127.0.0.1:8000/'

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
export const saveNewSong = async (data,navigate) => {
  try {
    const res =await axios.post(`${baseURL}api/song/save`, { ...data });
    if(res.status===200){
      toast.success("Song Added SuccessFully")
      navigate('/dashboard/songs')
    }
    return res;
  } catch (error) {
    return null;
  }
};
export const searchSong = async (query,navigate) => {
  try {
    const res = await axios.get(`${baseURL}api/song/search`,{
      params: { query }
    });
    if(res.status===200){
      navigate('/search')
    }
    return res.data;
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
export const updateSong = async (data, id,navigate) => {
  
  try {
    const res =await axios.put(`${baseURL}api/song/${id}`, { ...data });
   
    if(res.status===200){
  toast.success("Song Updated SuccessFully")
  navigate('/dashboard/songs')
    }
   
    return res;

  } catch (error) {
    toast.error(error.response.data.message)
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





