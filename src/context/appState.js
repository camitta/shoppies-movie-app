import React, { useReducer } from 'react';
import axios from 'axios';
import {default as AppContext} from './appContext';
import appReducer from './appReducer';
import {
  ADD_NOMINEE,
  ADD_CURRENT_NOMINEES,
  REMOVE_NOMINEE,
  GET_RESULTS,
  SEARCH_ERROR,
  NOMINATIONS_COMPLETE,
} from './actionTypes';

export const AppState = (props) => {
  //initialize app state
  const initialState = {
    nominees: [],
    results: [],
    searchError: false,
    nominationsComplete: false,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // send API request to retrieve movie list from search parameters
  const getResults = async (searchText) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${searchText}&apikey=${process.env.REACT_APP_OMDB_KEY}`
      );
      let allGenreResults = res.data.Search;

      let results = []
      //filter to show only movies
      //only show max of 6
      if (allGenreResults) {
        results = allGenreResults.filter(result => result.Type === 'movie').slice(0, 6);
      }
      dispatch({ type: GET_RESULTS, payload: results });
    } catch (error) {
      dispatch({ type: SEARCH_ERROR });
    }
  };

  // add nominee from search result list
  const addNominee = (nominee) => {
    //set banner and scroll to top of page if 5 movies have been nominated
    if (state.nominees.length === 4) {
      window.scrollTo(0, 0);
      dispatch({ type: NOMINATIONS_COMPLETE });
    }
    if (state.nominees.length < 5) {
      //store state in local storage
      const localStorageArray = [...state.nominees, nominee];
      localStorage.setItem('nominees', JSON.stringify(localStorageArray));
      dispatch({ type: ADD_NOMINEE, payload: nominee });
    }
  };

  const addCurrentNominees = (nominees) => {
    dispatch({ type: ADD_CURRENT_NOMINEES, payload: nominees });
  };

  const removeNominee = (nominee) => {
    //store state in local storage
    const localStorageArray = state.nominees.filter(
      (nomToRemove) => nominee.imdbID !== nomToRemove.imdbID
    );
    localStorage.setItem('nominees', JSON.stringify(localStorageArray));
    dispatch({ type: REMOVE_NOMINEE, payload: nominee.imdbID });
  };

  return (
    <AppContext.Provider
      value={{
        results: state.results,
        nominees: state.nominees,
        searchError: state.searchError,
        nominationsComplete: state.nominationsComplete,
        addNominee,
        addCurrentNominees,
        removeNominee,
        getResults,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
