import React, { Component } from 'react';
import PropTypes from 'prop-types';

import quizType from '../../types';

import './style.css';

class Quiz extends Component {
  constructor() {
    super();

    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleClickButton({ target: { innerText: answer } }) {
    const { quiz: { correct_answer: right }, timer } = this.props;
    const buttons = document.querySelectorAll('button');

    clearInterval(timer);
    this.verifiesAnswer(answer, right);

    buttons.forEach((button) => {
      button.classList.add(button.innerText === right ? 'right' : 'wrong');
    });
  }

  verifiesAnswer(answer, correctAnswer) {
    const { quiz: { difficulty }, score } = this.props;
    const time = document.getElementById('timer').innerText;
    const { player } = JSON.parse(localStorage.getItem('state'));

    const levels = { hard: 3, medium: 2, easy: 1 };
    const goal = 10;

    if (answer === correctAnswer) {
      const newScore = score + goal + (time * levels[difficulty]);
      player.score = newScore;

      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  renderOptions() {
    const { quiz: { incorrect_answers: wrongs, correct_answer: right } } = this.props;
    const fiftyPercent = 0.5;

    const options = wrongs.map((wrong, idx) => (
      <button
        onClick={ this.handleClickButton }
        data-testid={ `wrong-answer-${idx}` }
        key={ idx }
        type="button"
      >
        {wrong}
      </button>
    ));
    options.push(
      <button
        onClick={ this.handleClickButton }
        data-testid="correct-answer"
        key={ options.length }
        type="button"
      >
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
  timer: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Quiz;
