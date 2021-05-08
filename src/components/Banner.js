import React, { useContext } from 'react';
import AppContext from '../context/appContext';

//banner will display once 5 nominations are reached
export const Banner = () => {
  const appContext = useContext(AppContext);
  const { nominationsComplete } = appContext;

  return (
    <React.Fragment>
      {nominationsComplete && (
        <div className='nom-complete banner'>
          <p className='banner-text'>Your results have been recorded</p>
        </div>
      )}
    </React.Fragment>
  )}
