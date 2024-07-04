import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import StatisticsDisplay from "../../components/table/StatTable";

const DashboardHome = () => {
  const [value, setValue] = React.useState(0);
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
