export const SET_TIMER = 'SET_TIMER';

export const setTimerCreator = (timer) => ({
  type: SET_TIMER,
  value: timer,
});
