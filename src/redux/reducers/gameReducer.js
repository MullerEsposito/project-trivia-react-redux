import { SET_TIMER, REQUEST_QUIZ, GET_QUIZ, HANDLE_ERROR_QUIZ } from '../actions';

const INITIAL_STATE = {
  timer: {},
  loading: false,
  quiz: [],
  error: false,
};

const gameReducer = (state = INITIAL_STATE, { type, value }) => {
  switch (type) {
  case SET_TIMER: return { ...state, timer: value };
  case REQUEST_QUIZ: return { ...state, loading: true };
  case GET_QUIZ: return { ...state, quiz: value };
  case HANDLE_ERROR_QUIZ: return { ...state, error: value };
  default: return state;
  }
};

export default gameReducer;
