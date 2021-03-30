import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setTimerCreator } from '../../redux/actions';

import Quiz from '../../components/Quiz';
import quiz from '../../mocks';
import './style.css';

const INITIAL_STATE = {
  player: {
    name: '',
    score: '',
    gravatarEmail: '',
    assertions: '',
  },
};

class Game extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { setTimer } = this.props;

    this.getPlayer();
    setTimer(this.startTimer());
  }

  getPlayer() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setState({ player });
  }

  startTimer() {
    const periodTime = 1000;

    const timer = setInterval(() => {
      const elementTimer = document.getElementById('timer');
      const buttons = document.querySelectorAll('button');
      const time = elementTimer.innerText;

      if (time <= 1) {
        buttons.forEach((button) => { button.disabled = true; });
        clearInterval(timer);
      }
      elementTimer.innerText -= 1;
    }, periodTime);
    return timer;
  }

  render() {
    const { player: { gravatarEmail, name, score } } = this.state;
    const { timer } = this.props;
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
          <Quiz quiz={ quiz } timer={ timer } score={ score } />
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  setTimer: PropTypes.func.isRequired,
  timer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const mapStateToProps = ({ gameReducer }) => ({
  timer: gameReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  setTimer: (timer) => dispatch(setTimerCreator(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
