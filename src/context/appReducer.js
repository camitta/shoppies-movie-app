import {
  ADD_NOMINEE,
  ADD_CURRENT_NOMINEES,
  REMOVE_NOMINEE,
  NOMINATIONS_COMPLETE,
  GET_RESULTS,
  SEARCH_ERROR,
} from './actionTypes';

const appReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOMINEE:
      return {
        ...state,
        nominees: [action.payload, ...state.nominees],
      };
    case ADD_CURRENT_NOMINEES:
      return {
        ...state,
        nominees: action.payload,
        nominationsComplete: action.payload.length === 5,
      };
    case REMOVE_NOMINEE:
      return {
        ...state,
        nominees: state.nominees.filter(
          (nominee) => nominee.imdbID !== action.payload
        ),
        nominationsComplete: false,
      };
    case GET_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        searchError: true,
      };
    case NOMINATIONS_COMPLETE:
      return {
        ...state,
        nominationsComplete: true,
      };
    default:
      return state;
  }
};

export default appReducer;
