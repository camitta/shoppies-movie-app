import React, { useContext } from 'react';
import AppContext from '../context/appContext';
import { Nominees } from './Nominees';

export const NomineesList = () => {
  //get nominees from app state
  const appContext = useContext(AppContext);
  const { nominees, addCurrentNominees } = appContext;

  return (
    <Nominees nominees={nominees} addCurrentNominees={addCurrentNominees} />
  );
};
