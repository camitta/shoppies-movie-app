import React from "react";
import { Modal, Image } from "react-bootstrap";

export const SingleMovie = props => {
 return (
   <Modal
     {...props}
     size="lg"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <Modal.Header>
       <Image fluid src={`https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`} alt={props.movie.title} />
     </Modal.Header>
     <Modal.Body>
       <Modal.Title id="contained-modal-title-vcenter">
         {props.movie.title} <span style={{fontSize: "1rem", fontStyle: "italic"}}>{new Date(props.movie.release_date).toLocaleDateString()}</span>
       </Modal.Title>
       <p>{props.movie.overview}</p>
       <p> Popularity: {props.movie.popularity} </p>
       <p> Votes: {props.movie.vote_count}</p>
     </Modal.Body>
   </Modal>
 );
};

