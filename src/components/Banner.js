import React, { useContext } from 'react';
import AppContext from '../context/appContext';
import {useWindowSize} from '@react-hook/window-size'
import Confetti from 'react-confetti'

//banner will display once 5 nominations are reached
export const Banner = () => {
  const appContext = useContext(AppContext);
  const { nominationsComplete } = appContext;

  const windowSize = useWindowSize()

  return (
    <React.Fragment>
      {nominationsComplete && (
        <div className='nom-complete banner'>
          <p className='banner-text'>Now, time for some Netflix and chill!</p>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </div>
      )}
    </React.Fragment>
  )}
