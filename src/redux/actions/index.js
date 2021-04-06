import { fetchQuiz } from '../../services/apiTrivia';

export const SET_TIMER = 'SET_TIMER';
export const REQUEST_QUIZ = 'REQUEST_QUIZ';
export const GET_QUIZ = 'GET_QUIZ';
export const HANDLE_ERROR_QUIZ = 'HANDLE_ERROR_QUIZ';

export const setTimerCreator = (timer) => ({
  type: SET_TIMER,
  value: timer,
});

const requestQuiz = () => ({
  type: REQUEST_QUIZ,
});

const getQuiz = (quiz) => ({
  type: GET_QUIZ,
  value: quiz,
});

const handleErrorQuiz = (error) => ({
  type: HANDLE_ERROR_QUIZ,
  value: error,
});

export const getQuizCreator = (token) => async (dispatch) => {
  try {
    dispatch(requestQuiz());
    const quiz = await fetchQuiz(token);
    dispatch(getQuiz(quiz));
  } catch (error) {
    dispatch(handleErrorQuiz(error));
  }
};
