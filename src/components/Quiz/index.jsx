import React, { Component } from 'react';
import quizType from '../../types';

import './style.css';

class Quiz extends Component {
  renderOptions() {
    const { quiz: { incorrect_answers: wrongs, correct_answer: right } } = this.props;
    const fiftyPercent = 0.5;

    const options = wrongs.map((wrong, idx) => (
      <button data-testid={ `wrong-answer-${idx}` } key={ idx } type="button">
        {wrong}
      </button>
    ));
    options.push(
      <button key={ options.length } data-testid="correct-answer" type="button">
        {right}
      </button>,
    );
    options.sort(() => Math.random() - fiftyPercent);

    return options;
  }

  render() {
    const { quiz: { category, question } } = this.props;

    return (
      <div className="container-quiz">
        <p data-testid="question-category">{`Categoria ${category}`}</p>
        <p data-testid="question-text">{`Question: ${question}`}</p>
        { this.renderOptions() }
      </div>
    );
  }
}

Quiz.propTypes = {
  quiz: quizType.isRequired,
};

export default Quiz;
