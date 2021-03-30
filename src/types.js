import PropTypes from 'prop-types';

const quizType = PropTypes.shape({
  category: PropTypes.string,
  type: PropTypes.string,
  difficulty: PropTypes.string,
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
});

export default quizType;
