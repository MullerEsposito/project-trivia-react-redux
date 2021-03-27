import React, { Component } from 'react';

import Input from '../../components/Input';

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
    const { inputEmail, inputPassword } = this.state;

    return (
      <div className="container-login">
        <Input
          dataTestId="input-player-name"
          placeholder="Digite seu email..."
          type="email"
          name="inputEmail"
          value={ inputEmail }
          onChange={ this.handleOnChange }
        />
        <Input
          dataTestId="input-gravatar-email"
          placeholder="Digite sua senha..."
          type="password"
          name="inputPassword"
          value={ inputPassword }
          onChange={ this.handleOnChange }
        />
        <button
          id="btnPlay"
          style={ { marginTop: '15px' } }
          className="btn btn-light btn-sm"
          data-testid="btn-play"
          type="button"
          disabled
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
