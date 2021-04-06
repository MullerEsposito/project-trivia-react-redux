const tokenUrl = 'https://opentdb.com/api_token.php?command=request';
const quizUrl = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchToken = () => fetch(tokenUrl)
  .then((res) => res.json())
  .then((json) => json.token);

export const fetchQuiz = (token) => fetch(`${quizUrl}${token}`)
  .then((res) => res.json())
  .then((json) => json.results);
