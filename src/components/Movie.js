import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://images-na.ssl-images-amazon.com/images/I/91OOEMXqaAL._SL1500_.jpg";

export const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  return (
    <Card className="movie">
      <Card.Img className="movie-img" variant="top" width="200"
          src={poster} />
        <Card.Body>
          <Card.Title>
            {movie.Title}</Card.Title>
          <Card.Text>
            {movie.Year}
          </Card.Text>
          <Button variant="primary" type="submit" className="add-movie"
          onClick={() => this.handleClick(movie.Title, movie.Year)}>Add</Button>
        </Card.Body>
      </Card>
  );
};
// export const Movie = ({ movie }) => {
//   const poster =
//     movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
//   return (
//     <div className="movie">
//       <h2>{movie.Title}</h2>
//       <div>
//         <img
//           width="200"
//           alt={`The movie titled: ${movie.Title}`}
//           src={poster}
//         />
//       </div>
//       <p>{movie.Year}</p>
//     </div>
//   );
// };

