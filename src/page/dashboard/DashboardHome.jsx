import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TotalStat from "../../components/TotalStat";
import DetailStat from "../../components/DetailStat";
import StatisticsTable from "../../components/table/StatTable";
import StatisticsDisplay from "../../components/table/StatTable";
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

<div className="App">
  {!stat && <CircularProgress/>}
      {stat&& <StatisticsDisplay data={stat} />}
    </div>
  );
};
export default DashboardHome;
