import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setTimerCreator } from '../../redux/actions';

import Quiz from '../../components/Quiz';
// import quiz from '../../mocks';
import './style.css';

const INITIAL_STATE = {
  player: {
    name: '',
    score: '',
    gravatarEmail: '',
    assertions: '',
  },
  quiz: [],
};

class Game extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { setTimer } = this.props;
    const timer = this.createTimer((time) => this.timer(time));

    this.getPlayer();
    timer.start();
    setTimer(timer);
  }

  getPlayer() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setState({ player });
  }

  createTimer(createCallback) {
    const time = 30;
    const periodTime = 1000;
    let timer = setInterval(createCallback(time), periodTime);

    return ({
      start() {
        const callback = createCallback(time);
        this.stop();
        timer = setInterval(() => callback(timer), periodTime);
        return this;
      },

      stop() {
        clearInterval(timer);
        timer = null;
        return this;
      },

      restart() {
        this.stop().start();
      },
    });
  }

  timer(time) {
    return (timer) => {
      const elementTimer = document.getElementById('timer');
      const buttons = document.querySelectorAll('button');

      elementTimer.innerText = time;

      if (time <= 1) {
        buttons.forEach((button) => { button.disabled = true; });
        clearInterval(timer);
      }
      time -= 1;

      elementTimer.innerText = time;
    };
  }

  render() {
    const { player: { gravatarEmail, name, score } } = this.state;
    const { timer, history, quiz } = this.props;
    const img = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    return (
      <div className="container-game">
        <header>
          <img data-testid="header-profile-picture" src={ img } alt="" />
          <div className="container-score">
            <span>Score:</span>
            <p data-testid="header-score">{ score }</p>
          </div>
          <p data-testid="header-player-name">{ name }</p>
          <p id="timer">30</p>
        </header>
        <main>
          <Quiz
            history={ history }
            quiz={ quiz }
            timer={ timer }
            score={ score }
          />
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  setTimer: PropTypes.func.isRequired,
  timer: PropTypes.shape(Object).isRequired,
  history: PropTypes.shape(Object).isRequired,
  quiz: PropTypes.arrayOf(PropTypes.shape(Object)).isRequired,
};

const mapStateToProps = ({ gameReducer }) => ({
  timer: gameReducer.timer,
  quiz: gameReducer.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  setTimer: (timer) => dispatch(setTimerCreator(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
