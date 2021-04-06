import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

import './style.css';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  player: {},
};

class Feedback extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.getPlayer();
  }

  getPlayer() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setState({ player });
    this.storePlayerOnRanking(player);
  }

  storePlayerOnRanking(player) {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.push(player);
    ranking.sort(({ score: a }, { score: b }) => b - a);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { player: { gravatarEmail, name, score, assertions } } = this.state;
    const img = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    const badResult = 3;
    const feedbackMessage = assertions < badResult
      ? 'Podia ser melhor...'
      : 'Mandou bem!';
    return (
      <div className="container-feedback">
        <header>
          <p data-testid="feedback-text">
            Feedback page
          </p>
          <img data-testid="header-profile-picture" src={ img } alt="" />
          <div className="container-score">
            <span>Score:</span>
            <p data-testid="header-score">{ score }</p>
          </div>
          <p data-testid="header-player-name">{ name }</p>
        </header>
        <p data-testid="feedback-text">
          { feedbackMessage }
        </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <Link to="/login" data-testid="btn-play-again">Jogar Novamente</Link>
        <Link to="/ranking" data-testid="btn-ranking">Ranking</Link>
      </div>
    );
  }
}

export default Feedback;
