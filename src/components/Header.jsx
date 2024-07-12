import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #374151;
  padding: 8px 16px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    height: 64px;
    padding: 0 24px;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  margin: 8px 0;

  @media (min-width: 768px) {
    margin: 0;
  }
`;

const NavItem = styled.li`
  margin: 0 10px;
  font-size: 1rem;

  @media (min-width: 768px) {
    margin: 0 20px;
    font-size: 1.125rem;
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: #d1d5db;
  &.active {
    color: #fff;
  }
  &:hover {
    color: #fff;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-top: 8px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  color: #111827;
  font-size: 0.875rem;
  border-radius: 8px;
  padding: 10px 16px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25);
  }
  &::placeholder {
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
    &::placeholder {
      color: #9ca3af;
    }
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25);
    }
  }
`;

const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 10px 12px;
  margin-left: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background-color: #3b82f6;
  border-radius: 8px;
  border: 1px solid #3b82f6;

  &:hover {
    background-color: #2563eb;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25);
  }

  @media (prefers-color-scheme: dark) {
    background-color: #2563eb;
    border-color: #2563eb;

    &:hover {
      background-color: #1d4ed8;
    }
    &:focus {
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleSearch = (data) => {
    const { query } = data;
    dispatch({ type: 'user/searchSong', payload: { query, navigate } });
  };

  return (
    <HeaderContainer>
      <NavList>
        <NavItem>
          <NavLinkStyled to="/" exact>
            Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/dashboard/home">
            Dashboard
          </NavLinkStyled>
        </NavItem>
      </NavList>
      <SearchForm onSubmit={handleSubmit(handleSearch)}>
        <InputContainer>
          <SearchInput
            {...register("query")}
            type="text"
            placeholder="Search by Song, Artist, and Genre"
            required
          />
          <SearchButton type="submit">
            <Search />
          </SearchButton>
        </InputContainer>
      </SearchForm>
    </HeaderContainer>
  );
};

export default Header;
