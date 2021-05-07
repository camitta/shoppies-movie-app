export const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case 'searchRequest':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'searchSuccess':
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case 'searchError':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

// const moviesReducer = (state, action) => {
//   switch (action.type) {
//     case 'searchRequest':
//       return {
//         ...state,
//         loading: true,
//         errorMessage: null
//       };
//     case 'searchSuccess':
//       return {
//         ...state,
//         loading: false,
//         movies: action.payload
//       };
//     case 'searchError':
//       return {
//         ...state,
//         loading: false,
//         errorMessage: action.error
//       };
//     default:
//       return state;
//   }
// };

// export default moviesReducer




// import axios from 'axios'
// const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";


// const initialState = {
//   loading: true,
//   movies: [],
//   errorMessage: null
// };

// const moviesReducer = (state, action) => {
//   switch (action.type) {
//     case "SEARCH_MOVIES_REQUEST":
//       return {
//         ...state,
//         loading: true,
//         errorMessage: null
//       };
//     case "SEARCH_MOVIES_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         movies: action.payload
//       };
//     case "SEARCH_MOVIES_FAILURE":
//       return {
//         ...state,
//         loading: false,
//         errorMessage: action.error
//       };
//     default:
//       return state;
//   }
// };

// export default moviesReducer;

// // // Action Types
// // const ALL_MOVIES = 'ALL_MOVIES'
// // const ADD_MOVIE = 'ADD_MOVIE'
// // const DELETE_MOVIE = 'DELETE_MOVIE'

// // // Action Creators
// // export const allMovies = movies => ({
// //   type: ALL_MOVIES,
// //   movies
// // })

// // export const deleteMovie = movieId => ({
// //   type: 'DELETE_MOVIE',
// //   movieId
// // })

// // export const addMovie = movie => ({
// //   type: 'ADD_MOVIE',
// //   movie
// // })

// // // Fetch Thunk Creator
// // // export const fetchMovies = () => {
// // //   return async dispatch => {
// // //     try {
// // //       const {data} = await axios.get('/api/movies')
// // //       dispatch(allMovies(data))
// // //     } catch (error) {
// // //       console.log(error)
// // //     }
// // //   }
// // // }

// // export const fetchMovies = (searchTerm) => {
// //     return async dispatch => {
// //       try {
// //         const {data} = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${process.env.REACT_APP_OMDB_KEY}`)
// //         dispatch(allMovies(data))
// //       } catch (error) {
// //         dispatch(console.log(error);
// //       }
// //     }
// // }









// // // Delete Thunk Creator
// // export const removeMovie = id => {
// //   return async dispatch => {
// //     try {
// //       await axios.delete(`/api/movies/${id}`)
// //       dispatch(deleteMovie(id))
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }
// // }

// // // Add Movie
// // export const postMovie = movie => {
// //   return async dispatch => {
// //     try {
// //       const {data} = await axios.post('/api/movies', movie)
// //       dispatch(addMovie(data))
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }
// // }

// // const initialState = []

// // const moviesReducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case ALL_MOVIES:
// //       return action.movies
// //     case DELETE_MOVIE:
// //       return state.filter(movie => movie.id !== action.movieId)
// //     case ADD_MOVIE:
// //       return [...state, action.movie]
// //     default:
// //       return state
// //   }
// // }
// // export default moviesReducer
