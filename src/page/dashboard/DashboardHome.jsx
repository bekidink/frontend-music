import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TotalStat from "../../components/TotalStat";
import DetailStat from "../../components/DetailStat";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className=" flex flex-col items-center p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400">
      {icon}
      <p className="text-xl text-white font-semibold">{name}</p>
      <p className="text-xl text-white">{count}</p>
    </div>
  );
};
const DashboardHome = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const stat = useSelector((state) => state.user.stat);
  const dispatch=useDispatch()
  useEffect(() => {
    
    
    if(!stat){
      dispatch({type:'stat'})
    }
  }, [stat ,dispatch]);
  return (

<Box sx={{ width: '100%' }}>
<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Total" {...a11yProps(0)} />
    <Tab label="Songs in Every Genre" {...a11yProps(1)} />
    <Tab label="Songs of Artist" {...a11yProps(2)} />
    <Tab label="Artist Album" {...a11yProps(3)} />
    <Tab label="Album Songs" {...a11yProps(4)} />
  </Tabs>
</Box>
<CustomTabPanel value={value} index={0}>
  {!stat && <CircularProgress/>}
 {stat&& <TotalStat stat={stat}/>}
</CustomTabPanel>
<CustomTabPanel value={value} index={1}>
  {!stat && <CircularProgress/>}
 {stat&& <DetailStat stat={stat.songsByGenre}/>}
</CustomTabPanel>
<CustomTabPanel value={value} index={2}>
  {!stat && <CircularProgress/>}
  { stat && <DetailStat stat={stat.songsByArtist}/>}
</CustomTabPanel>
<CustomTabPanel value={value} index={3}>
{!stat && <CircularProgress/>}
  { stat && <DetailStat stat={stat.albumsByArtist}/>}
</CustomTabPanel>
<CustomTabPanel value={value} index={4}>
{!stat && <CircularProgress/>}
 {stat && <DetailStat stat={stat.songsInAlbum}/>}
</CustomTabPanel>
</Box>
  );
};
export default DashboardHome;
