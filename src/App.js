import React, { useReducer, useEffect } from 'react';
import {Header, Movie, Search} from './components'

import { initialState, default as moviesReducer } from "./store/movies";
import axios from "axios";

const OMDB_URL = `https://www.omdbapi.com/?s=man&apikey=${process.env.REACT_APP_OMDB_KEY}`;

const App = () => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

    useEffect(() => {
        axios.get(OMDB_URL)
            .then(jsonResponse => {
      dispatch({
        type: 'searchSuccess',
        payload: jsonResponse.data.Search
        	});
      	});
  	}, []);

  const search = searchValue => {
    dispatch({
      type: 'searchRequest'
    });
      axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_OMDB_KEY}`)
      .then(jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
              type: 'searchSuccess',
              payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
              type: 'searchError',
              error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  // // you can add this to the onClick listener of the Header component
  // // const refreshPage = () => {
  // //   window.location.reload();
  // // };

  const { movies, errorMessage, loading } = state;

    return (
    <div className="App">
      <Header text="The Shoppies" />
      <Search search={search} />
      <p className="App-intro">Nominate your top 5 favorite movies:</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
