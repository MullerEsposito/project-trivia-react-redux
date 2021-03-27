const tokenUrl = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = () => fetch(tokenUrl)
  .then((res) => res.json())
  .then((json) => json.token);

export default fetchToken;
