import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

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

const StyledBox = styled(Box)`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FullFeaturedCrudGrid = () => {
  const [rows, setRows] = useState(initialRows);
  const [searchQuery, setSearchQuery] = useState('');
  const allSongs = useSelector((state) => state.user.allSongs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch song data
  const fetchSongs = async () => {
    try {
      const response = await axios.get('https://node-backend-ldyo.onrender.com/api/song/');
      return flattenData(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const fetchedRows = await fetchSongs();
      setRows(fetchedRows);
    })();
  }, []);

  const handleEditClick = (id) => () => {
    navigate(`/dashboard/song/edit/${id}`);
  };

  const handleDeleteClick = (id) => async () => {
    dispatch({ type: 'user/deleteSong', payload: { id } });
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: 'artistName', headerName: 'Artist Name', width: 200, editable: true },
    { field: 'albumName', headerName: 'Album Name', width: 200, editable: true },
    { field: 'songName', headerName: 'Song Name', width: 200, editable: true },
    { field: 'genre', headerName: 'Genre', width: 200, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => [
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
      ],
    },
  ];

  // Filtered rows based on searchQuery
  const filteredRows = rows.filter(row =>
    row.songName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StyledBox>
      <TextField
        id="search-bar"
        label="Search by Song Name"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '300px' }} // Adjust width as needed
        sx={{ mb: 2 }} // Add margin bottom if desired
      />
      {!rows.length ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={searchQuery ? filteredRows : rows}
          columns={columns}
          autoHeight
          autoPageSize
        />
      )}
    </StyledBox>
  );
};

export default FullFeaturedCrudGrid;
