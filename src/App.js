import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import styled from '@emotion/styled';
import { useSelector } from "react-redux";
import MusicPlayer from "./components/MusicPlayer";
import Dashboard from "./page/dashboard/Dashboard";
import Home from "./page/Home";
import SearchPage from "./page/SearchPage";

const AppContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MusicPlayerContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 6rem; // Adjusted to match the original 'h-26' class
  bottom: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensure it stays above other content
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
