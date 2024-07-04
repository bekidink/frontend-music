import React from "react";
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import FullFeaturedCrudGrid from "../../components/table/Table";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 0.75rem 0;
  gap: 5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #3b82f6;
  cursor: pointer;
  &:hover {
    border-color: #6b7280;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const DashboardSongs = () => {
  return (
    <Container>
      <ButtonContainer>
        <StyledNavLink to="/dashboard/newSong">
          <IoAdd />
          New Song
        </StyledNavLink>
      </ButtonContainer>
      <FullFeaturedCrudGrid />
    </Container>
  );
};

export default DashboardSongs;
