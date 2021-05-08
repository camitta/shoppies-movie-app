import React, { useContext } from 'react';
import { Movie } from '../components/Movie';
import AppContext from '../context/appContext';

export const SearchResults = () => {
  const appContext = useContext(AppContext);
  const { results, addNominee } = appContext;

  return (
    <React.Fragment>
      {results.length > 0 && (
        <div id='search-result-panel' className='search-results'>
          {results.map((movie, index) => (
            <Movie movie={movie} addNominee={addNominee} key={index} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
