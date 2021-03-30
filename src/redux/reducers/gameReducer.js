const INITIAL_STATE = {
  timer: '',
};

const gameReducer = (state = INITIAL_STATE, { type, value }) => {
  switch (type) {
  case 'SET_TIMER': return { ...state, timer: value };
  default: return state;
  }
};

export default gameReducer;
