import React, { useState, useContext } from 'react';
import AppContext from '../context/appContext';
import { Container } from "react-bootstrap";

export const Search = () => {
  const appContext = useContext(AppContext);
  const { getResults } = appContext;

  const [searchText, setSearchText] = useState('');

  const resetInputField = () => {
    setSearchText("");
  };

  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getResults(searchText);
    resetInputField();
  };

  return (
  <Container className="search-container">
       <p className="app-intro">Nominate your top 5 favorite movies:</p>
      <form className="search" onSubmit={onSubmit}>
        <input
          value={searchText}
          onChange={onChange}
          type="text"
          placeholder='movie title...'
          className="search-text"
        />
        <input onClick={() => getResults(searchText)} type="submit" value="Search" />
      </form>
</Container>
  );
};
