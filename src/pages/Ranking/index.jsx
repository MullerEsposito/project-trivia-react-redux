import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const INITIAL_STATE = {
  ranking: [],
};

class Ranking extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  renderPlayers() {
    const { ranking } = this.state;

    return ranking.map(({ name, score, picture }, idx) => (
      <tr key={ idx }>
        <td><img src={ `${picture}` } alt="" /></td>
        <td data-testid={ `player-name-${idx}` }>{name}</td>
        <td data-testid={ `player-score-${score}` }>{score}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container-ranking">
        <p data-testid="ranking-title">
          Ranking page
        </p>
        <table>
          { this.renderPlayers() }
        </table>
        <Link data-testid="btn-go-home" to="/">Home</Link>
      </div>
    );
  }
}

export default Ranking;
