import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

// Initial rows will be empty and fetched from the API
const initialRows = [];

const flattenData = (data) => {
  const rows = [];
  data.forEach((artist) => {
    artist.albums.forEach((album) => {
      album.songs.forEach((song) => {
        rows.push({
          id: song._id,
          artistName: artist.artistName,
          albumName: album.albumName,
          songName: song.songName,
          genre: song.category,
        });
      });
    });
  });
  return rows;
};

const FullFeaturedCrudGrid = () => {
  const [rows, setRows] = useState(initialRows);
  const allSongs = useSelector((state) => state.user.allSongs);
    const dispatch=useDispatch()
    //fetch song data
    const fetchSongs = async () => {
        try {          
          const response = await axios.get('https://node-backend-ldyo.onrender.com/api/song/');
      return   flattenData(response.data)
          
        } catch (error) {
          console.error('Error fetching songs:', error);
          return [];
        }
      };
    
 const route=useNavigate()
  useEffect(() => {
    (async () => {
        
      const fetchedRows = await fetchSongs();
      setRows(fetchedRows);
    })();
  }, []);

 

  const handleEditClick = (id) => () => {
    
    route(`/dashboard/song/edit/${id}`)
  };

  

  const handleDeleteClick = (id) => async () => {
    dispatch({type:'user/deleteSong',payload:{id}})
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const columns = [
    { field: 'artistName', headerName: 'Artist Name', width: 280, editable: true },
    { field: 'albumName', headerName: 'Album Name', width: 280, editable: true },
    { field: 'songName', headerName: 'Song Name', width: 280, editable: true },
    { field: 'genre', headerName: 'Genre', width: 280, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
        {!rows && <CircularProgress/>}
        {rows &&       <DataGrid
        rows={rows}
        columns={columns}
        
        
      />}

    </Box>
  );
};

export default FullFeaturedCrudGrid;
