import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import quizType from '../../types';

import './style.css';

const INITIAL_STATE = {
  id: '',
  category: '',
  type: '',
  difficulty: '',
  question: '',
  correct_answer: '',
  incorrect_answers: [],
};

class Quiz extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.handleAnswerButton = this.handleAnswerButton.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleFeedbackButton = this.handleFeedbackButton.bind(this);
  }

  componentDidMount() {
    this.updateAnswer();
  }

  componentDidUpdate(props, quiz) {
    const { state } = this.state;
    const { quiz: propQuiz } = this.props;

    if (_.isEqual(quiz, state)) this.updateAnswer();
    if (!_.isEqual(props.quiz, propQuiz)) this.updateAnswer();
  }

  updateAnswer() {
    const { quiz } = this.props;

    this.setState({ ...quiz[0] });
  }

  handleFeedbackButton() {
    const { history } = this.props;

    history.push('/feedback');
  }

  handleNextButton() {
    const nextButton = document.getElementById('btn-next');
    const { timer } = this.props;

    nextButton.remove();

    this.updateAnswer();
    this.resetStyleButtons();
    timer.restart();
    this.forceUpdate();
  }

  handleAnswerButton({ target: { innerText: answer } }) {
    const { correct_answer: right } = this.state;
    const { timer, quiz } = this.props;
    const buttons = document.querySelectorAll('button');

    timer.stop();
    quiz.shift();
    this.verifiesAnswer(answer, right);
    this.renderNextButton();

    buttons.forEach((button) => {
      button.classList.add(button.innerText === right ? 'right' : 'wrong');
    });
  }

  verifiesAnswer(answer, correctAnswer) {
    const { difficulty } = this.state;
    const { score } = this.props;
    const time = document.getElementById('timer').innerText;
    const { player } = JSON.parse(localStorage.getItem('state'));

    const levels = { hard: 3, medium: 2, easy: 1 };
    const goal = 10;

    if (answer === correctAnswer) {
      const newScore = score + goal + (time * levels[difficulty]);
      player.assertions += 1;
      player.score = newScore;

      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  resetStyleButtons() {
    const buttons = document.getElementsByClassName('container-options')[0].childNodes;

    buttons.forEach((button) => {
      button.classList.remove('right', 'wrong');
    });
  }

  renderNextButton() {
    const { quiz } = this.props;
    const containerQuiz = document.getElementsByClassName('container-quiz')[0];
    const nextButton = document.createElement('button');

    if (quiz.length > 0) {
      nextButton.innerText = 'Próxima';
      nextButton.setAttribute('id', 'btn-next');
      nextButton.setAttribute('data-testid', 'btn-next');
      nextButton.setAttribute('type', 'button');
      nextButton.classList.add('btn', 'btn-success', 'btn-sm');
      nextButton.addEventListener('click', this.handleNextButton);
    } else {
      nextButton.innerText = 'Feedback';
      nextButton.setAttribute('id', 'btn-next');
      nextButton.setAttribute('data-testid', 'btn-next');
      nextButton.setAttribute('type', 'button');
      nextButton.classList.add('btn', 'btn-information', 'btn-sm');
      nextButton.addEventListener('click', this.handleFeedbackButton);
    }

    containerQuiz.appendChild(nextButton);
  }

  renderOptions() {
    const { incorrect_answers: wrongs, correct_answer: right } = this.state;
    const fiftyPercent = 0.5;

    const options = wrongs.map((wrong, idx) => (
      <button
        onClick={ this.handleAnswerButton }
        data-testid={ `wrong-answer-${idx}` }
        key={ idx }
        type="button"
      >
        {wrong}
      </button>
    ));
    options.push(
      <button
        onClick={ this.handleAnswerButton }
        data-testid="correct-answer"
        key={ options.length }
        type="button"
      >
        {right}
      </button>,
    );
    options.sort(() => Math.random() - fiftyPercent);

    return (
      <div className="container-options">
        { options }
      </div>
    );
  }

  render() {
    const { category, question } = this.state;
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
  quiz: PropTypes.arrayOf(quizType).isRequired,
  timer: PropTypes.shape(Object).isRequired,
  score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  history: PropTypes.shape(Object).isRequired,
};

export default Quiz;
