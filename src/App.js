import { Route, Routes } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import MusicPlayer from "./components/MusicPlayer";
import {  useSelector } from "react-redux";
import Dashboard from "./page/dashboard/Dashboard";
import Home from "./page/Home";
import SearchPage from "./page/SearchPage";
function App() {
  
  const isSongPlaying = useSelector((state) => state.user.isSongPlaying);
  
  

  
  return (
    <AnimatePresence mode="wait">
      <div className=" h-auto min-w-[680px] bg-primary flex justify-center items-center ">
        <Routes>
          {/* <Route path="/login" element={<Login setAuth={setAuth} />} /> */}
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
