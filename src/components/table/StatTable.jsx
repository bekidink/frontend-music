import React from 'react';
import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';

const StatItem = ({ label, value }) => (
  <ListItem>
    <ListItemText primary={label} />
    <Typography variant="body1" color="text.secondary">{value}</Typography>
  </ListItem>
);

const StatCard = ({ title, data }) => (
  <Card elevation={3}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <List>
        {data.map((item, index) => (
          <React.Fragment key={item._id}>
            <StatItem label={item._id} value={item.count} />
            {index < data.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </Card>
);

const TotalStatsCard = ({ data }) => (
  <Card elevation={3}>
    <CardContent>
      <Typography variant="h6" gutterBottom>Total Statistics</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StatItem label="Total Songs" value={data.totalSongs} />
        </Grid>
        <Grid item xs={6}>
          <StatItem label="Total Artists" value={data.totalArtists} />
        </Grid>
        <Grid item xs={6}>
          <StatItem label="Total Albums" value={data.totalAlbums} />
        </Grid>
        <Grid item xs={6}>
          <StatItem label="Total Genres" value={data.totalGenres} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const StatisticsDisplay = ({ data }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TotalStatsCard data={data} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Songs by Genre" data={data.songsByGenre.slice(0, 5)} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Songs by Artist" data={data.songsByArtist.slice(0, 5)} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Albums by Artist" data={data.albumsByArtist.slice(0, 5)} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Songs in Album" data={data.songsInAlbum.slice(0, 5)} />
      </Grid>
    </Grid>
  );
};

export default StatisticsDisplay;