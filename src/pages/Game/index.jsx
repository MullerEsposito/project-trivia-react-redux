import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

import Quiz from '../../components/Quiz';
import quiz from '../../mocks';
import './style.css';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      player: {},
    };
  }

  componentDidMount() {
    this.getPlayer();
  }

  getPlayer() {
    const player = JSON.parse(localStorage.getItem('player'));
    this.setState({ player });
  }

  render() {
    const { player: { gravatarEmail, name, score } } = this.state;
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

        </header>
        <main>
          <Quiz quiz={ quiz } />
        </main>
      </div>
    );
  }
}

export default Game;
