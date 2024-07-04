import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import MusicPlayer from "./components/MusicPlayer";
import { useSelector } from "react-redux";
import Dashboard from "./page/dashboard/Dashboard";
import Home from "./page/Home";
import SearchPage from "./page/SearchPage";

const AppContainer = styled.div`
  height: auto;
  min-width: 680px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MusicPlayerContainer = styled(motion.div)`
  position: fixed;
  min-width: 700px;
  height: 6rem; // Adjusted to match the original 'h-26' class
  inset: auto 0 0 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const isSongPlaying = useSelector((state) => state.user.isSongPlaying);

  return (
    <AnimatePresence mode="wait">
      <AppContainer>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
        {isSongPlaying && (
          <MusicPlayerContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MusicPlayer />
          </MusicPlayerContainer>
        )}
      </AppContainer>
    </AnimatePresence>
  );
}

export default App;