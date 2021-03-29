import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import fetchToken from '../../services/apiTrivia';
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
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  componentDidMount() {
    this.validateInputs();
  }

  async handleClickButton() {
    const token = await fetchToken();
    const { history } = this.props;
    const { inputName: name, inputEmail: gravatarEmail } = this.state;

    const player = {
      name, assertions: 0, score: 0, gravatarEmail,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('player', JSON.stringify(player));
    history.push('/game');
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
          onClick={ this.handleClickButton }
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
};

export default Login;
