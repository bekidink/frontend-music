import React from 'react';
import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import styled from '@emotion/styled';
import { space, layout, typography, color } from 'styled-system';

const StyledCard = styled(Card)(
  space,
  layout,
  typography,
  color,
  {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }
);

const StyledCardContent = styled(CardContent)(
  space,
  layout,
  typography,
  color,
);

const StyledTypography = styled(Typography)(
  space,
  layout,
  typography,
  color,
);

const StyledList = styled(List)(
  space,
  layout,
  typography,
  color,
);

const StyledListItem = styled(ListItem)(
  space,
  layout,
  typography,
  color,
);

const StyledDivider = styled(Divider)(
  space,
  layout,
  typography,
  color,
);

const StatItem = ({ label, value }) => (
  <StyledListItem p={2}>
    <ListItemText primary={label} />
    <StyledTypography variant="body1" color="text.secondary">{value}</StyledTypography>
  </StyledListItem>
);

const StatCard = ({ title, data }) => (
  <StyledCard p={3} my={2}>
    <StyledCardContent>
      <StyledTypography variant="h6" gutterBottom>{title}</StyledTypography>
      <StyledList>
        {data.map((item, index) => (
          <React.Fragment key={item._id}>
            <StatItem label={item._id} value={item.count} />
            {index < data.length - 1 && <StyledDivider />}
          </React.Fragment>
        ))}
      </StyledList>
    </StyledCardContent>
  </StyledCard>
);

const TotalStatsCard = ({ data }) => (
  <StyledCard p={3} mt={3}>
    <StyledCardContent>
      <StyledTypography variant="h6" gutterBottom>Total Statistics</StyledTypography>
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
    </StyledCardContent>
  </StyledCard>
);

const StatisticsDisplay = ({ data }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TotalStatsCard data={data} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Songs by Genre" data={data.songsByGenre} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Songs by Artist" data={data.songsByArtist} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Albums by Artist" data={data.albumsByArtist} />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatCard title="Songs in Album" data={data.songsInAlbum} />
      </Grid>
    </Grid>
  );
};

export default StatisticsDisplay;
