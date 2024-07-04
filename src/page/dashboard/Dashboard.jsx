import React from "react";
import styled from "@emotion/styled";
import { NavLink, Route, Routes } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MusicNote } from "@mui/icons-material";
import { useSelector } from "react-redux";

import Header from "../../components/Header";
import DashboardHome from "./DashboardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardNewSong from "./NewSong";

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
`;

const NavContainer = styled.div`
  width: 60%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  &.active {
    background: rgba(0, 0, 0, 0.05);
    color: #555;
  }
  &:hover {
    color: #555;
  }
`;

const ContentContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  padding: 1rem;
`;

const Dashboard = () => {
  const alertType = useSelector((state) => state.user.alertType);

  return (
    <Container>
      <Header />
      <NavContainer>
        <StyledNavLink to="/dashboard/home">
          <IoHome className="text-2xl text-textColor" />
        </StyledNavLink>
        <StyledNavLink to="/dashboard/songs">
          <MusicNote />
        </StyledNavLink>
      </NavContainer>

      <ContentContainer>
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/newSong" element={<DashboardNewSong isEdit={false} />} />
          <Route path="/song/edit/:id" element={<DashboardNewSong isEdit={true} />} />
        </Routes>
      </ContentContainer>
    </Container>
  );
};

export default Dashboard;