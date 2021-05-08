import React, {useContext} from "react";
import AppContext from '../context/appContext';
import Card from 'react-bootstrap/Card';

export const Movie = (props) => {

  const appContext = useContext(AppContext);
  const { nominees } = appContext;
  const { movie, addNominee } = props;

  let nominated = false;
  //if movie is already nominated, display with disabled button
  for (let i = 0; i < nominees.length; i++) {
    if (nominees[i].imdbID === movie.imdbID) {
      nominated = true;
    }
  }

  const DEFAULT_PLACEHOLDER_IMAGE =
  "https://images-na.ssl-images-amazon.com/images/I/91OOEMXqaAL._SL1500_.jpg";

  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  return (
    <Card className="movie">
      <Card.Img className="movie-img" variant="top" src={poster} />
        <Card.Body className="card-content">
          <Card.Title>
            {movie.Title}</Card.Title>
          <Card.Text>
            {movie.Year}
          </Card.Text>
          {nominated ? (
               <button className='btn nominate-btn-disabled'>
               <div className="nom-btn-txt">Nominated</div>
               </button>
        ) : (
          <button
            className='btn nominate-btn'
            onClick={() => addNominee(movie)}
          ><div className='nom-btn-txt'>
            Nominate
            </div>
          </button>
          )}
        </Card.Body>
      </Card>
  );
};
