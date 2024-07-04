import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Search } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000; /* Adjust z-index as needed */
  display: flex;
  height: 64px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #374151;
  width: 100vw;
  padding: 16px;
  margin-bottom:24px;
  @media (min-width: 768px) {
    padding: 8px 24px;
  }
`;

const NavList = styled.ul`
  display: flex;
  width: 33.33%;
  align-items: center;
  justify-content: center;
  margin-left: 28px;
`;

const NavItem = styled.li`
  margin: 0 20px;
  font-size: 1.125rem;
`;

const NavLinkStyled = styled(NavLink)`
  color: #d1d5db; /* Default color */
  &.active {
    color: #fff; /* Active color */
  }
  &:hover {
    color: #fff; /* Hover color */
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 66.66%;
`;

const InputContainer = styled.div`
  display: flex;
  width: 66.66%;
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
          <NavLinkStyled to="/" activeClassName="active" exact>
            Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled to="/dashboard/home" activeClassName="active">
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
            <Search className="w-4 h-4 me-2" />
          </SearchButton>
        </InputContainer>
      </SearchForm>
    </HeaderContainer>
  );
};

export default Header;
