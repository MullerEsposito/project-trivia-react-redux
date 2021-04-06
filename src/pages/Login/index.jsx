import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuizCreator } from '../../redux/actions';

import Input from '../../components/Input';

import { fetchToken } from '../../services/apiTrivia';
import logo from '../../trivia.png';
import './style.css';

const INITIAL_STATE = {
  inputEmail: '',
  inputPassword: '',
};

class Login extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  componentDidMount() {
    this.validateInputs();
    this.requestQuiz();
  }

  handlePlayButton() {
    const { history } = this.props;
    const { inputName: name, inputEmail: gravatarEmail } = this.state;
    const ranking = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking'))
      : [];
    const player = { player: {
      name, assertions: 0, score: 0, gravatarEmail,
    } };

    localStorage.setItem('state', JSON.stringify(player));
    localStorage.setItem('ranking', JSON.stringify(ranking));

    history.push('/game');
  }

  async requestQuiz() {
    const { getQuiz } = this.props;

    const token = await fetchToken();
    getQuiz(token);

    localStorage.setItem('token', token);
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.validateInputs();
  }

  validateInputs() {
    const inputs = Array.from(document.querySelectorAll('input'));
    const btnPlay = document.getElementById('btnPlay');

    const notIsValid = inputs.reduce((isEmpty, { value }) => (
      value ? isEmpty : true
    ), false);
    btnPlay.disabled = notIsValid;
  }

  render() {
    const { inputEmail, inputName } = this.state;

    return (
      <div className="container-login container">
        <img src={ logo } className="img-fluid App-logo" alt="logo" />
        <Input
          dataTestId="input-player-name"
          placeholder="Digite seu nome..."
          name="inputName"
          value={ inputName }
          onChange={ this.handleOnChange }
        />
        <Input
          dataTestId="input-gravatar-email"
          placeholder="Digite seu email..."
          type="email"
          name="inputEmail"
          value={ inputEmail }
          onChange={ this.handleOnChange }
        />
        <button
          id="btnPlay"
          style={ { marginTop: '15px' } }
          className="btn btn-light btn-sm"
          data-testid="btn-play"
          type="button"
          onClick={ this.handlePlayButton }
        >
          Jogar
        </button>
        <Link
          data-testid="btn-settings"
          to="/settings"
        >
          Configurações
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  getQuiz: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (token) => dispatch(getQuizCreator(token)),
});

export default connect(null, mapDispatchToProps)(Login);
